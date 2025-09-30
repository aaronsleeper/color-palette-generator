# OKLCH Color Palette Generator - Complete Specification

## Overview

The OKLCH Color Palette Generator is a React-based web application that creates systematic color palettes using the OKLCH (Oklch) color space. It provides interactive controls for generating multiple color families with precise variations, export capabilities, and a modern responsive interface.

## Application Architecture

### Technology Stack

- **Frontend Framework**: React 18.2.0 with TypeScript support
- **Build Tool**: Vite 4.4.5 with React plugin
- **Styling**: CSS Custom Properties with Tailwind CSS CDN
- **Color Processing**: Culori 4.0.2 library for color space conversions
- **Color Naming**: color-name 2.0.2 for automatic color naming
- **Icons**: Lucide React 0.263.1
- **Development Server**: Vite dev server on port 3000

### Project Structure

```
palette-maker/
├── index.html                 # Main HTML entry point
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── src/
│   ├── main.tsx              # React application entry point
│   ├── ColorPaletteGenerator.tsx  # Main application component
│   ├── styles.css            # Global styles and CSS custom properties
│   ├── vite-env.d.ts         # TypeScript environment definitions
│   ├── hooks/
│   │   └── useColorPalette.js # Custom React hooks for state management
│   ├── components/
│   │   ├── LayoutComponents.jsx      # Layout wrapper components
│   │   ├── SidebarComponents.jsx     # Left sidebar controls
│   │   ├── MainContentComponents.jsx # Center color display area
│   │   └── RightPanelComponents.jsx  # Right panel family controls
│   └── utils/
│       └── colorUtils.js     # Color processing and utility functions
```

## Core Functionality

### 1. Color Space Implementation

- **Primary Color Space**: OKLCH (Oklch)
  - L (Lightness): 0-100%
  - C (Chroma): 0-150 (displayed as 0-100% where 100% = 150)
  - H (Hue): 0-360°
- **Color Conversion**: Uses Culori library for accurate color space conversions
- **CSS Output**: Generates modern CSS with `oklch()` function support

### 2. Color Family Management

- **Multiple Families**: Support for 1-21 color families simultaneously
- **Base Color Generation**: Random base colors with controlled ranges:
  - Lightness: 40-60%
  - Chroma: 5-15% (7.5-22.5 of 150)
  - Hue: Full 360° range
- **Family Naming**: Automatic color naming using color-name library with fallback to hue-based names
- **Custom Naming**: User can override automatic names with custom family names

### 3. Color Variation System

- **Steps Configuration**:
  - Steps toward Min: 0-21 variations
  - Steps toward Max: 0-21 variations
- **Transform Controls**: Global transformations applied to all families
  - Lightness: -100 to +100%
  - Chroma: -100 to +100%
  - Hue: -360° to +360°
- **Interpolation Curves**: 6 different easing functions:
  - Linear: `t`
  - Quadratic: `t²`
  - Cubic: `t³`
  - Sinusoidal: `0.5 - 0.5 * cos(t * π)`
  - Exponential: `2^(10*(t-1))`
  - Smooth Step: `t² * (3 - 2t)`

### 4. Interactive Controls

#### Global Controls (Left Sidebar)

- **Family Count**: Number input (1-21) with validation
- **Steps Controls**: Number inputs for min/max variations (0-21)
- **Transform Controls**: Range sliders and number inputs for L, C, H transformations
- **Curve Selection**: Dropdown for interpolation curve type
- **Align Buttons**: Synchronize L, C, or H values across all families
- **Export Section**: Format selection and CSS generation

#### Individual Family Controls (Right Panel)

- **Family Name**: Text input with reset button
- **Base Color Controls**: Range sliders and number inputs for L, C, H
- **Real-time Updates**: All changes reflect immediately in the color display

#### Color Display (Center)

- **Family Selection**: Click to select families for editing
- **Swatch Display**: Visual representation of color variations
- **Tooltips**: Color names and CSS values on hover

### 5. Input Validation System

- **Range Validation**: All numeric inputs have min/max constraints
- **Error Display**: Real-time error messages for invalid inputs
- **Auto-correction**: Values are clamped to valid ranges
- **Focus Behavior**: Input focus selects all text for easy replacement

### 6. Export Capabilities

- **CSS Variables**: Generated CSS custom properties
- **Multiple Formats**: OKLCH, Hex, HSL, RGB (currently only OKLCH implemented)
- **Copy to Clipboard**: One-click copying with user feedback
- **Naming Convention**: `--{familyName}-{index}` format

## User Interface Design

### Layout Structure

- **Three-Panel Layout**:
  - Left Sidebar (320px): Global controls and export
  - Center Main Content: Color family display
  - Right Panel (320px): Individual family controls
- **Responsive Design**: Stacks vertically on mobile devices
- **Fixed Heights**: Full viewport height with scrollable content areas

### Visual Design System

- **Color Scheme**: Light theme with gray-based neutrals
- **Typography**: System fonts with monospace for code
- **Spacing**: Consistent spacing scale using CSS custom properties
- **Interactive Elements**: Hover states, focus indicators, and selection highlights
- **Visual Hierarchy**: Clear distinction between different control types

### Component Architecture

- **Layout Components**: Wrapper components for three-panel layout
- **Form Components**: Reusable input components with validation
- **Display Components**: Color swatch and family display components
- **Control Components**: Specialized controls for different data types

## State Management

### Custom React Hooks

1. **useGlobalControls**: Manages global application settings
2. **useColorFamilies**: Manages color family data and operations
3. **useInputValidation**: Handles input validation and error states

### State Structure

```javascript
// Global Controls State
{
  familyCount: number,
  stepsMin: number,
  stepsMax: number,
  transformMin: { l: number, c: number, h: number },
  transformMax: { l: number, c: number, h: number },
  curveType: string,
  exportFormat: string
}

// Color Family State
{
  families: Array<{
    base: { l: number, c: number, h: number },
    name: string,
    customName: boolean
  }>,
  selectedFamily: number | null
}

// Input Validation State
{
  inputErrors: Record<string, string>
}
```

## Color Processing Algorithms

### 1. Random Base Generation

```javascript
generateRandomBase() {
  return {
    l: 40 + Math.random() * 20,  // 40-60% lightness
    c: 7.5 + Math.random() * 15, // 5-15% chroma
    h: Math.random() * 360       // full hue range
  };
}
```

### 2. Swatch Generation Algorithm

1. Calculate min and max colors using base + transforms
2. Apply clamping to ensure values stay within OKLCH bounds
3. Use selected curve function for interpolation
4. Generate swatches toward min, base color, and toward max
5. Handle hue interpolation with shortest path calculation

### 3. Color Naming Algorithm

1. Convert OKLCH to RGB using Culori
2. Find closest named color using Euclidean distance in RGB space
3. Fallback to hue-based naming if conversion fails

### 4. Channel Alignment Algorithms

- **Lightness/Chroma**: Align all families to first family's value
- **Hue**: Distribute hues evenly across 360° spectrum

## Browser Compatibility

### Supported Browsers

- Chrome 111+ (OKLCH support)
- Firefox 113+ (OKLCH support)
- Safari 15.4+ (OKLCH support)

### Graceful Degradation

- Application works in older browsers with limited OKLCH support
- CSS output includes fallback considerations
- Error handling for unsupported color operations

## Performance Considerations

### Optimization Strategies

- **Efficient Re-renders**: React hooks minimize unnecessary re-renders
- **Debounced Updates**: Color calculations are performed on-demand
- **Memory Management**: Proper cleanup of event listeners and effects
- **Lazy Loading**: Components load only when needed

### Scalability

- **Family Limit**: Maximum 21 families to maintain performance
- **Variation Limit**: Maximum 21 variations per family
- **Efficient Algorithms**: O(n) complexity for most operations

## Development Workflow

### Available Scripts

- `npm run dev`: Start development server (port 3000)
- `npm run build`: Build for production
- `npm run preview`: Preview production build

### Development Features

- **Hot Module Replacement**: Instant updates during development
- **TypeScript Support**: Type checking and IntelliSense
- **ESLint Integration**: Code quality and consistency
- **Auto-formatting**: Consistent code style

## Security Considerations

### Input Sanitization

- All user inputs are validated and sanitized
- Numeric inputs are clamped to safe ranges
- Text inputs are properly escaped

### XSS Prevention

- No innerHTML usage with user content
- Proper React escaping of all user inputs
- Safe clipboard operations

## Accessibility Features

### Keyboard Navigation

- Tab navigation through all interactive elements
- Enter key support for form submission
- Escape key for canceling operations

### Visual Accessibility

- High contrast color combinations
- Clear visual hierarchy
- Focus indicators for keyboard navigation
- Descriptive labels for all form controls

### Screen Reader Support

- Semantic HTML structure
- Proper ARIA labels where needed
- Descriptive alt text and titles

## Future Enhancement Opportunities

### Planned Features

1. **Additional Export Formats**: Hex, HSL, RGB implementations
2. **Color Harmony Tools**: Complementary, triadic, analogous color suggestions
3. **Palette Presets**: Save and load favorite palette configurations
4. **Advanced Curves**: Custom bezier curve editor
5. **Color Blindness Simulation**: Preview palettes for different vision types
6. **Collaboration Features**: Share palettes via URL or export

### Technical Improvements

1. **State Persistence**: Local storage for user preferences
2. **Undo/Redo System**: History management for color changes
3. **Performance Optimization**: Web Workers for heavy color calculations
4. **Progressive Web App**: Offline capability and app-like experience

## Deployment Requirements

### Build Process

1. Run `npm install` to install dependencies
2. Run `npm run build` to create production build
3. Deploy `dist/` folder to web server

### Server Requirements

- Static file hosting
- HTTPS recommended for clipboard API
- Modern browser support for OKLCH

### Environment Variables

- No environment-specific configuration required
- All settings are client-side

## Testing Strategy

### Manual Testing Areas

1. **Input Validation**: Test all numeric inputs with edge cases
2. **Color Generation**: Verify color calculations and display
3. **Export Functionality**: Test CSS generation and clipboard operations
4. **Responsive Design**: Test on various screen sizes
5. **Browser Compatibility**: Test OKLCH support across browsers

### Automated Testing Opportunities

1. **Unit Tests**: Color utility functions and algorithms
2. **Integration Tests**: Component interaction and state management
3. **Visual Regression Tests**: Color output consistency
4. **Performance Tests**: Large palette generation

This specification provides a complete blueprint for rebuilding the OKLCH Color Palette Generator application, covering all technical aspects, user interactions, and implementation details necessary for full reconstruction.
