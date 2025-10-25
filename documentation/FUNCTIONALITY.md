# Core Functionality

This document describes the core business logic and functions of the application.

## Global Variables

### Color Space
```javascript
{
  name: 'OKLCH',
  channels: [
    { label: 'Lightness', abbr: 'L', min: 0, max: 100 },
    { label: 'Chroma', abbr: 'C', min: 0, max: 150 },
    { label: 'Hue', abbr: 'H', min: 0, max: 360 }
  ]
}
```

Default color space is OKLCH, but structure supports switching color spaces in the future.

### Families Count
- Default: 1
- Range: 1-21
- Controls number of hue families generated

### Variations
```javascript
{
  toMin: 1,  // Swatches toward minimum direction
  toMax: 1   // Swatches toward maximum direction
}
```
- Each range: 1-21
- Total swatches per family: `toMin + 1 + toMax`

### Transform
```javascript
{
  toMin: {
    L: 0,  // Percentage of L range
    C: 0,  // Percentage of C range
    H: 0   // Degrees for hue
  },
  toMax: {
    L: 0,
    C: 0,
    H: 0
  },
  curve: 'linear'  // Easing function
}
```

Transform values represent the change from base color to the min/max targets:
- Stored as percentage of channel range (except hue which is degrees)
- E.g., L: +40 means increase lightness by 40% of its range
- Applied using easing curves for smooth transitions

### Hue Family
```javascript
{
  id: Number,
  label: String,           // Display name
  nameOverride: Boolean,   // If true, don't auto-update label
  base: [Number, Number, Number],  // OKLCH values [L, C, H]
  swatches: []            // Computed array of colors
}
```

## Core Functions

### Edit Hue Family

**Trigger**: User focuses a hue family by clicking a swatch

**Behavior**:
1. Show color channel controls in right panel
2. Controls edit the family's base color
3. Update colors reactively on any value change
4. Generate swatches from updated base color

**Implementation**:
- Use `ColorControl` component in `ColorEditor`
- Bind to family's base color
- Watch for changes and update state
- Triggers swatch regeneration

### Update Colors

**Trigger**: Any property that affects colors changes

**Properties that trigger updates**:
- Global transform settings
- Number of families
- Variations count
- Base color of any family

**Behavior**:
1. Recalculate all affected colors
2. Regenerate swatches using new transforms
3. Update family names if:
   - Base color changed AND
   - Name has not been overridden by user
4. Preserve name overrides

**Implementation**:
- Use Vue watchers on global state
- Call `generateSwatches()` for each family
- Use Chroma.js to generate family name
- Check `nameOverride` flag before updating label

### Generate Swatches

**Input**: Base color, variations count, transform, easing curve

**Output**: Array of OKLCH color values

**Algorithm**:
1. Calculate target colors:
   - `minColor = base + transform.toMin`
   - `maxColor = base + transform.toMax`
2. For each variation toward min:
   - Apply easing curve: `t = ease(i / toMin)`
   - Interpolate: `chroma.mix(base, minColor, t, 'oklch')`
3. Add base color
4. For each variation toward max:
   - Apply easing curve: `t = ease(i / toMax)`
   - Interpolate: `chroma.mix(base, maxColor, t, 'oklch')`

**Edge Cases**:
- Handle hue wrapping (0° = 360°)
- Clamp to valid OKLCH gamut
- Handle out-of-gamut colors gracefully

### Export Functions

#### Copy CSS

**Input**: Array of hue families

**Output**: CSS custom properties string

**Algorithm**:
1. For each family:
   - Sanitize family label (lowercase, replace spaces with hyphens)
   - For each swatch:
     - Generate CSS color value: `oklch(L% C H)`
     - Output: `--[family-name]-[index]: oklch(...);`
2. Return concatenated string

**Example Output**:
```css
--azure-blue-1: oklch(50% 15 240);
--azure-blue-2: oklch(60% 15 240);
--azure-blue-3: oklch(70% 15 240);
```

#### Copy SVG

**Input**: Array of hue families

**Output**: SVG string

**Algorithm**:
1. Calculate dimensions:
   - Width: `swatchSize * maxSwatchesPerFamily`
   - Height: `swatchSize * families.length`
2. For each family:
   - For each swatch:
     - Create `<rect>` element
     - Position: `x = swatchIndex * swatchSize`
     - Position: `y = familyIndex * swatchSize`
     - Size: `24px × 24px`
     - Fill: Color value
3. Return SVG string

**Example Output**:
```xml
<svg width="48" height="24">
  <rect x="0" y="0" width="24" height="24" fill="oklch(50% 15 240)"/>
  <rect x="24" y="0" width="24" height="24" fill="oklch(70% 15 240)"/>
</svg>
```

### Automatic Family Naming

**Purpose**: Generate meaningful names for hue families from their base colors

**Library**: Chroma.js color naming

**Algorithm**:
1. Convert base color to RGB hex
2. Use `chroma('#hex').name()` to get nearest color name
3. If name is exact match (not hex), use it
4. If color is unnamed, generate descriptive name from OKLCH values
5. Format: Capitalize first letter, preserve spaces

**Override Behavior**:
- If `nameOverride` is true, don't update label
- When user edits label manually, set `nameOverride = true`
- When user clears override, set `nameOverride = false` and regenerate name

### Easing Functions

Easing functions determine how color transitions progress between base and target.

**Implementation**:
```javascript
function linear(t) { return t; }
function cubic(t) { return t * t * t; }
function quint(t) { return t * t * t * t * t; }
function sine(t) { return 1 - Math.cos(t * Math.PI / 2); }
function quad(t) { return t * t; }
function quart(t) { return t * t * t * t; }
```

**Usage**:
- Apply easing in swatch generation
- Smooth transitions create perceptually pleasing gradients
- Linear provides uniform steps
- Cubic/quint provide gradual acceleration
- Sine provides smooth S-curve

## State Update Flow

1. **User Action** → Component emits event
2. **State Update** → Composables update reactive state
3. **Watchers Trigger** → Dependent values recalculate
4. **UI Update** → Vue reactivity updates DOM
5. **Browser Render** → Display updated colors

## Performance Considerations

- **Debouncing**: Debounce rapid value changes (e.g., slider drag)
- **Computed Swatches**: Generate swatches lazily, not stored separately
- **Memoization**: Cache color calculations where possible
- **Batch Updates**: Batch multiple color updates into single render cycle

