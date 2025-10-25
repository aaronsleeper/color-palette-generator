# Color Palette Generator

A Vue 3-based color palette generator using OKLCH color space and Chroma.js for precise color manipulation and export.

## Features

- **OKLCH Color Space**: Perceptually uniform color transformations
- **Multiple Hue Families**: Generate 1-21 color families simultaneously
- **Customizable Variations**: Create variations in both directions from base color
- **Transform Controls**: Apply global transformations to create systematic palettes
- **Easing Functions**: Multiple curve options for color transitions
- **Export Options**: Copy CSS variables or SVG representations
- **Automatic Naming**: Generate color names using Chroma.js

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aaronsleeper/color-palette-generator.git
cd color-palette-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Technology Stack

- **Vue 3**: Composition API for reactive components
- **Vite**: Fast build tool and dev server
- **Chroma.js**: Color manipulation and transformations
- **Plain CSS**: Modern CSS with Grid and Custom Properties

## Documentation

See the `documentation/` folder for detailed specifications:
- `ARCHITECTURE.md` - Application structure and state management
- `COMPONENTS.md` - Component specifications
- `FUNCTIONALITY.md` - Core functions and business logic
- `COLOR_MATH.md` - Color mathematics and transformations
- `DEVELOPMENT_WORKFLOW.md` - Development guidelines
- `CONTEXT7_RESOURCES.md` - Documentation resources

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## License

MIT

