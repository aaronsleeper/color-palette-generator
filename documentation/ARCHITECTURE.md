# Architecture Overview

## Application Structure

The Vue Color Palette Generator is built with Vue 3 using the Composition API, providing a clean and reactive architecture for managing complex color state and transformations.

## Component Hierarchy

```
App.vue
├── GlobalControls.vue (Left Sidebar)
│   ├── ChannelControl.vue (for families count)
│   ├── ChannelControl.vue (for variations)
│   └── TransformControls.vue
│       └── ChannelControl.vue (per channel)
├── MainContent.vue
│   └── HueFamily.vue (one per family)
│       ├── Swatch.vue (base color)
│       ├── Swatch.vue (variations to min)
│       └── Swatch.vue (variations to max)
│       └── ValueTable.vue (shown on focus)
└── ColorEditor.vue (Right Panel - shown when family focused)
    └── ColorControl.vue
        └── ChannelControl.vue (per channel)
```

## State Management Strategy

### Global State (useColorState.js)

Centralized reactive state using Vue 3 Composition API:

```javascript
{
  colorSpace: {
    name: 'OKLCH',
    channels: [
      { label: 'Lightness', abbr: 'L', min: 0, max: 100 },
      { label: 'Chroma', abbr: 'C', min: 0, max: 150 },
      { label: 'Hue', abbr: 'H', min: 0, max: 360 }
    ]
  },
  families: 1, // 1-21
  variations: {
    toMin: 1, // 1-21
    toMax: 1  // 1-21
  },
  transform: {
    toMin: { L: 0, C: 0, H: 0 }, // percentages/degrees
    toMax: { L: 0, C: 0, H: 0 },
    curve: 'linear' // easing function
  },
  hueFamilies: [
    {
      id: 1,
      label: 'Auto-generated or custom',
      nameOverride: null, // if set, don't auto-update label
      base: [0.7, 0.15, 240], // OKLCH values
      swatches: [] // generated from base
    }
  ],
  focusedFamilyId: null
}
```

### State Flow

1. **User changes global transform** → All families recalculate swatches
2. **User changes family count** → Add/remove families, regenerate all
3. **User changes variations count** → Regenerate all swatches
4. **User edits base color** → Regenerate that family's swatches, update label if not overridden
5. **User focuses family** → Show color editor in right panel

## Color Space: OKLCH

OKLCH (Oklch) is a perceptually uniform color space:
- **L (Lightness)**: 0-100% - perceived brightness
- **C (Chroma)**: 0-150 - saturation/intensity (displayed as 0-100%)
- **H (Hue)**: 0-360° - color wheel position

All calculations happen in OKLCH space using Chroma.js, ensuring perceptually uniform transformations.

## Key Design Decisions

1. **Reactive State**: Using Vue's reactive system for automatic UI updates
2. **Composition API**: Better code organization and reusability
3. **Pure CSS**: No CSS-in-JS, leveraging CSS Grid and Custom Properties
4. **Single Source of Truth**: Global state manages all color data
5. **Computed Swatches**: Swatches generated from base colors, not stored separately
6. **Debounced Updates**: Performance optimization for rapid changes

## File Structure

```
src/
├── main.js              # Entry point
├── App.vue              # Root component with layout
├── components/          # Vue components
│   ├── ChannelControl.vue
│   ├── ColorControl.vue
│   ├── ColorEditor.vue
│   ├── GlobalControls.vue
│   ├── HueFamily.vue
│   ├── Swatch.vue
│   └── ExportPanel.vue
├── composables/         # Reusable composition functions
│   └── useColorState.js
├── utils/               # Pure functions
│   ├── colorUtils.js
│   └── colorEngine.js
└── styles/              # CSS files
    ├── main.css
    ├── layout.css
    ├── components.css
    └── controls.css
```

## Data Flow Example

**Editing a base color:**

1. User clicks swatch → `HueFamily` emits `focus` event
2. `App.vue` sets `focusedFamilyId` in state
3. `ColorEditor` receives focused family data
4. User adjusts channel control → emits `update` event
5. State updates base color → computed swatches regenerate
6. UI updates reactively showing new colors
7. If name not overridden, label updates via Chroma.js naming

