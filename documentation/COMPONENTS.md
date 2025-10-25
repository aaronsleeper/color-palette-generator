# Component Specifications

This document details the specifications for each component as outlined in the user requirements.

## ChannelControl Component

### Purpose
Synchronized input and slider pair for numeric value control.

### Props
```javascript
{
  modelValue: Number,      // Current value
  min: Number,             // Minimum allowed value
  max: Number,             // Maximum allowed value
  step: Number,            // Step increment (default: 0.001)
  label: String,           // Display label
  abbr: String            // Abbreviation for display
}
```

### Events
```javascript
{
  'update:modelValue': (value: Number) => void
}
```

### Behavior

#### Input Field
- Type: `number` with stepper controls (`<input type="number">`)
- On focus: Select entire value (`.select()`)
- Display: Round to 3 decimal places for calculated values
- User input: Preserve exact decimal places (don't override)
- Validation: Clamp to min/max on blur
- Storage: Can have arbitrary decimal places

#### Slider
- Type: Range input (`<input type="range">`)
- Min: Channel range minimum
- Max: Channel range maximum
- Synchronization: Always matches input value
- Clamping: Thumb cannot leave track bounds (centered at min/max if out of range)

### Implementation Notes
- Use `v-model` for two-way binding
- Watch both input and slider for changes
- Apply clamping logic in computed properties or watchers
- Preserve exact user-entered values in internal state

## ColorControl Component

### Purpose
Container that renders channel controls for each channel of the current color space.

### Props
```javascript
{
  color: Array,           // Array of channel values [L, C, H]
  colorSpace: Object      // { name, channels: [{label, abbr, min, max}] }
}
```

### Events
```javascript
{
  'update:color': (newColor: Array) => void
}
```

### Behavior
- Dynamically render `ChannelControl` for each channel in color space
- Pass channel metadata (label, abbreviation, min, max) to each control
- Emit updates when any channel changes
- Return new color array with updated values

## Swatch Component

### Purpose
Visual representation of a single color.

### Props
```javascript
{
  color: String,          // CSS color value (e.g., 'oklch(70% 15 240)')
  index: Number           // Optional: for identification
}
```

### Slots
- Default: Optional content overlay

### CSS Requirements
```css
.swatch {
  block-size: 100%;        /* Relative to parent */
  inline-size: 1fr;        /* Flexible grid layout */
  background-color: var(--color);
}
```

### Behavior
- Click to select/focus parent family
- Visual feedback on hover

## HueFamily Component

### Purpose
Display a group of related swatches derived from a base color using global transform values.

### Props
```javascript
{
  family: Object,         // { id, label, nameOverride, base, swatches }
  variations: Object,      // { toMin, toMax }
  focused: Boolean        // Is this family currently focused?
}
```

### Events
```javascript
{
  'focus': (familyId: Number) => void,
  'update-label': (familyId: Number, label: String) => void
}
```

### Behavior

#### Swatch Display
- Grid layout: `variations.toMin` swatches → base swatch → `variations.toMax` swatches
- Swatches flow horizontally
- Each swatch clickable to focus the family

#### Focus State
When family has focus:
- Show channel values table below swatches
- Table structure:
  - First column: Channel labels (L, C, H)
  - Each subsequent column: Swatch values without labels
  - Rows: Each channel
  - Columns: Each swatch

#### Label Editing
- Editable label (text input)
- When user overrides label, set `nameOverride` flag
- Allow clearing override to re-enable auto-naming

### CSS Layout
```css
.hue-family {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
}

.value-table {
  display: grid;
  grid-template-columns: auto repeat(var(--swatch-count), 1fr);
}
```

## GlobalControls Component

### Purpose
Left sidebar interface for global application settings.

### Props
```javascript
{
  families: Number,       // Number of families (1-21)
  variations: Object,      // { toMin, toMax }
  transform: Object,      // { toMin, toMax, curve }
  colorSpace: Object      // Color space definition
}
```

### Events
```javascript
{
  'update:families': (count: Number) => void,
  'update:variations': (variations: Object) => void,
  'update:transform': (transform: Object) => void
}
```

### Sections

#### 1. Basic Settings
- Families count control (1-21)
- Variations to-min control (1-21)
- Variations to-max control (1-21)

#### 2. Transform Controls
- Two sections: "To Min" and "To Max"
- For each section:
  - Channel adjustments (L, C, H)
  - Value as percentage of channel range or degrees
  - Easing curve selector (dropdown)

#### 3. Easing Curves
Available options:
- `linear`: Constant rate of change
- `cubic`: Cubic curve (t³)
- `quint`: Quintic curve (t⁵)
- `sine`: Sine wave curve
- `quad`: Quadratic curve (t²)
- `quart`: Quartic curve (t⁴)

## ExportPanel Component

### Purpose
Generate and copy CSS or SVG representations of color palettes.

### Props
```javascript
{
  families: Array         // Array of hue family objects
}
```

### Export Functions

#### CSS Export
Generate CSS custom properties:
```css
--family-name-1: oklch(70% 15 240);
--family-name-2: oklch(70% 15 250);
/* ... */
```

Rules:
- Use family's label as base name
- Sanitize label for CSS (lowercase, replace spaces with hyphens)
- Number swatches starting at 1
- Format: `--[family-name]-[swatch-number]`

#### SVG Export
Generate SVG with:
- Each family as a row
- Each swatch as a 24px × 24px square
- Squares arranged horizontally
- No spacing (squares touch)
- Background color for each square

### Copy Functionality
- Button to copy CSS to clipboard
- Button to copy SVG to clipboard
- Visual feedback on successful copy
- Display preview of generated code

## ColorEditor Component

### Purpose
Right panel that appears when a hue family is focused, allowing editing of the base color.

### Props
```javascript
{
  family: Object,         // Focused family object
  colorSpace: Object      // Color space definition
}
```

### Events
```javascript
{
  'update-family': (familyId: Number, updates: Object) => void,
  'close': () => void
}
```

### Behavior
- Only visible when a family is focused
- Renders `ColorControl` component
- Provides "Done" or "Close" button
- Emits updates to parent component
- Can toggle name override on/off

