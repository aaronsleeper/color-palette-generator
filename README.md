# Color Palette Generator

A powerful, interactive color palette generator that creates harmonious color families using the OKLCH color space. Generate professional color palettes with precise control over lightness, chroma, and hue variations.

## Features

* **OKLCH Color Space**: Uses the perceptually uniform OKLCH color space for better color relationships
* **Multiple Color Families**: Generate 1-21 different color families simultaneously
* **Customizable Variations**: Create 3-42 color variations per family
* **Interactive Controls**: Real-time sliders and numeric inputs for precise color adjustment
* **Transform Controls**: Apply global transformations to create systematic color variations
* **Easing Functions**: Choose from multiple easing curves for color transitions
* **Export Options**: Generate CSS variables and SVG exports
* **Responsive Design**: Clean, modern interface that works on all screen sizes

## What It Does

This tool helps designers and developers create systematic color palettes by:

1. **Generating Base Colors**: Creates random base colors or lets you manually adjust them
2. **Creating Variations**: Automatically generates lighter and darker variations of each base color
3. **Applying Transforms**: Uses mathematical transformations to create consistent color relationships
4. **Exporting Results**: Provides CSS variables and SVG exports for immediate use in projects

## Getting Started

### Prerequisites

* Node.js (version 14 or higher)
* npm or yarn package manager

### Installation

1. Clone or download this repository
2. Navigate to the project directory:  
   `cd "Palette Maker"`
3. Install dependencies:  
   `npm install`
4. Start the development server:  
   `npm run dev`
5. Open your browser and navigate to `http://localhost:5173`

## Controls Guide

### Global Controls (Left Sidebar)

#### Basic Settings

* **Families**: Number of color families to generate (1-21)
* **Variations**: Number of color variations per family (3-42)
* **Display Mode**: Toggle between swatches and gradient views

#### Synchronize Controls

* **L (Lightness)**: Synchronize lightness values across all families
* **C (Chroma)**: Synchronize chroma values across all families
* **H (Hue)**: Distribute hues evenly across the color wheel

#### Transform Controls

**Transform Min/Max**: Control how colors vary from the base color

* **Lightness**: Adjust lightness variation (-100 to +100)
* **Chroma**: Adjust chroma variation (-50 to +50)
* **Hue**: Adjust hue rotation (-180° to +180°)
* **Easing**: Choose how the variation progresses:  
   * `linear`: Constant rate of change  
   * `ease`: Slow start, fast middle, slow end  
   * `ease-in`: Slow start, fast end  
   * `ease-out`: Fast start, slow end  
   * `ease-in-out`: Slow start and end, fast middle  
   * `sine`: Smooth sine wave curve  
   * `quart`: Fourth power curve  
   * `custom`: Custom bezier curve editor

### Color Family Controls

#### Individual Family Settings

* **Family Name**: Edit the name of each color family
* **Base Color Button**: Click to expand color editing controls
* **Color Sliders**: When expanded, adjust:  
   * **Lightness (L)**: 0-100% lightness  
   * **Chroma (C)**: 0-100% chroma (saturation)  
   * **Hue (H)**: 0-360° hue rotation

#### Input Behavior

* **Click to Select**: Clicking any numeric input selects all text for easy replacement
* **Type Multi-Digit Numbers**: Type "39" to set chroma to 39% - no more "3.01" issues!
* **Enter to Apply**: Press Enter or click away to apply changes
* **Min/Max Validation**: Values are automatically clamped to valid ranges

### Export Options

#### CSS Variables

* Automatically generated CSS custom properties
* Copy to clipboard with the copy button
* Ready to paste into your stylesheets

#### SVG Export

* Download as SVG file
* Copy SVG code to clipboard
* Perfect for design tools and documentation

## Color Space: OKLCH

This tool uses the OKLCH color space, which provides:

* **Perceptual Uniformity**: Equal changes in values create equal visual changes
* **Better Color Relationships**: More predictable color mixing and harmony
* **Wide Gamut Support**: Access to more vibrant colors than sRGB
* **Future-Proof**: Modern CSS support with fallbacks

### OKLCH Values Explained

* **L (Lightness)**: 0-1 (0% to 100% lightness)
* **C (Chroma)**: 0-0.37 (0% to 100% saturation, with 0.37 being the maximum for most hues)
* **H (Hue)**: 0-360 (degrees around the color wheel)

## Tips for Best Results

1. **Start with Base Colors**: Adjust the base color of each family to your desired hue and saturation
2. **Use Transform Controls**: Apply systematic variations rather than manually adjusting each color
3. **Experiment with Easing**: Different easing functions create different visual effects
4. **Synchronize When Needed**: Use the sync buttons to create consistent relationships
5. **Export Early and Often**: Save your work by copying CSS or downloading SVG

## Keyboard Shortcuts

* **Enter**: Apply changes to any input field
* **Escape**: Cancel editing (in some contexts)
* **Click Input**: Select all text for easy replacement

## Browser Support

* Modern browsers with CSS `oklch()` support
* Chrome 111+, Firefox 113+, Safari 15.4+
* Graceful degradation for older browsers

## Troubleshooting

### Common Issues

**Input shows "3.01" instead of "39"**

* This was a bug that has been fixed! The new input handling allows proper multi-digit typing.

**Colors look different in my project**

* Make sure your browser supports OKLCH color space
* Check that you're using the exact CSS values provided

**Can't see the color variations**

* Try adjusting the transform controls to increase the variation range
* Check that your base colors have enough chroma to show variation

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Ensure you're using a supported browser
3. Try refreshing the page to reset the state

## Technical Details

* **Framework**: React with Vite
* **Color Space**: OKLCH (Oklch)
* **Styling**: Inline styles with CSS custom properties
* **Export**: Native CSS and SVG generation
* **State Management**: React hooks (useState, useEffect, useRef)

## License

This project is open source and available under the MIT License.

## About

A React-based color palette generator with advanced transform controls for OKLCH color space
