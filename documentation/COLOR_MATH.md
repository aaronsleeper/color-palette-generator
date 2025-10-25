# Color Mathematics

This document explains the mathematical operations used for color transformations and easing functions.

## OKLCH Color Space

OKLCH is a perceptually uniform color space:

- **L (Lightness)**: 0-100% - Perceived brightness
- **C (Chroma)**: 0-150 - Saturation/intensity (displayed as 0-100% where 100% = 150)
- **H (Hue)**: 0-360° - Angular position on color wheel

### Why OKLCH?

- **Perceptual Uniformity**: Equal numerical changes produce equal perceived changes
- **Better Color Relationships**: More predictable color mixing and harmony
- **Wide Gamut**: Access to more vibrant colors than sRGB
- **Modern CSS Support**: Native browser support with fallbacks

## Channel Operations

### Clamping Values

When a user enters a value outside the channel range:

```javascript
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
```

Example: User enters L = 120, channel max = 100 → return 100

### Percentage Calculations

Transform values are stored as percentages of channel range:

```javascript
// Convert percentage to absolute value
function percentageToAbsolute(percentage, channelRange) {
  return (percentage / 100) * channelRange;
}

// Example: L channel, percentage = +40, range = 100
// Result: +40 absolute units
```

### User Input Preservation

The input stores the exact user-entered value with arbitrary decimal places:

```javascript
let internalValue = 123.456789;  // User input
let displayValue = parseFloat(internalValue.toFixed(3));  // Display: 123.457
```

## Color Transformations

### Applying Transforms

Transform represents the change from base color to target:

```javascript
function applyTransform(baseColor, transform) {
  return [
    baseColor[0] + (transform.L / 100) * L_RANGE,  // Lightness
    baseColor[1] + (transform.C / 100) * C_RANGE,  // Chroma
    baseColor[2] + transform.H                      // Hue (degrees)
  ];
}
```

### Calculating Target Colors

```javascript
// Min target color
const minColor = applyTransform(baseColor, transform.toMin);

// Max target color
const maxColor = applyTransform(baseColor, transform.toMax);
```

## Easing Functions

Easing functions control the rate of change in color transitions.

### Linear
Uniform rate of change:
```javascript
function linear(t) {
  return t;
}
```

### Cubic
Gradual acceleration:
```javascript
function cubic(t) {
  return t * t * t;
}
```

### Quintic
Strong acceleration:
```javascript
function quint(t) {
  return t * t * t * t * t;
}
```

### Sine
Smooth S-curve:
```javascript
function sine(t) {
  return 1 - Math.cos(t * Math.PI / 2);
}
```

### Quadratic
```javascript
function quad(t) {
  return t * t;
}
```

### Quartic
```javascript
function quart(t) {
  return t * t * t * t;
}
```

## Color Interpolation

### Generating Swatches

For variations toward min:
```javascript
for (let i = 1; i <= variations.toMin; i++) {
  const t = easing(i / variations.toMin);
  const swatch = chroma.mix(baseColor, minColor, t, 'oklch');
  swatches.push(swatch);
}
```

For variations toward max:
```javascript
for (let i = 1; i <= variations.toMax; i++) {
  const t = easing(i / variations.toMax);
  const swatch = chroma.mix(baseColor, maxColor, t, 'oklch');
  swatches.push(swatch);
}
```

## Hue Wrapping

Hue is circular (0° = 360°), so interpolation must handle wrapping:

```javascript
function interpolateHue(h1, h2, t) {
  const diff = h2 - h1;
  
  // Take shorter arc
  if (Math.abs(diff) > 180) {
    if (diff > 0) {
      return h1 + (diff - 360) * t;
    } else {
      return h1 + (diff + 360) * t;
    }
  }
  
  return h1 + diff * t;
}
```

## Gamut Handling

### Checking Gamut

Some OKLCH colors may be outside displayable gamut:

```javascript
function isInGamut(color) {
  try {
    const rgb = chroma(color).rgb();
    return rgb.every(c => c >= 0 && c <= 255);
  } catch {
    return false;
  }
}
```

### Clipping to Gamut

When color is out of gamut, find nearest displayable color:

```javascript
function clipToGamut(color) {
  return chroma(color).clipped ? chroma(color).rgb() : color;
}
```

## Example: Full Swatch Generation

Given:
- Base color: `[70, 15, 240]` (OKLCH)
- Transform to min: `{ L: -40, C: -8, H: +10 }`
- Transform to max: `{ L: +20, C: +4, H: -5 }`
- Variations: `{ toMin: 2, toMax: 2 }`
- Curve: `cubic`

Calculations:

1. **Min target**: `[70-40, 15-8, 240+10]` = `[30, 7, 250]`
2. **Max target**: `[70+20, 15+4, 240-5]` = `[90, 19, 235]`
3. **Swatch toward min #1**: 
   - t = cubic(1/2) = 0.125
   - Mix base and min with t = 0.125
4. **Swatch toward min #2**:
   - t = cubic(2/2) = 1.0
   - Result: min target
5. **Base swatch**: `[70, 15, 240]`
6. **Swatch toward max #1**:
   - t = cubic(1/2) = 0.125
   - Mix base and max with t = 0.125
7. **Swatch toward max #2**:
   - t = cubic(2/2) = 1.0
   - Result: max target

Final array: `[swatch-min-1, swatch-min-2, base, swatch-max-1, swatch-max-2]`

## CSS Color Format

When exporting to CSS, format OKLCH values:

```javascript
function formatOKLCH(L, C, H) {
  return `oklch(${L}% ${C} ${H})`;
}
```

Example: `oklch(70% 15 240)`

Note: Lightness uses percentage, Chroma and Hue use absolute values per CSS spec.

