# User Guide

## Getting Started

### Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## How to Use

### Basic Workflow

1. **Adjust Global Settings**: Use the left sidebar to:
   - Set the number of color families (1-21)
   - Set variations to create toward min and max directions
   - Configure transform values for color variations
   - Select an easing curve

2. **Edit Base Colors**: 
   - Click any swatch in a color family
   - The color editor appears in the right panel
   - Adjust L, C, H values to change the base color
   - Click "Done" when finished

3. **View Color Values**:
   - When a family is focused (clicked), it shows a table below with all channel values
   - Values are formatted as: L (percentage), C (absolute), H (degrees)

4. **Export Your Palette**:
   - Use the Export panel in the left sidebar
   - Click "Copy CSS" to get CSS custom properties
   - Click "Copy SVG" to get an SVG representation

### Channel Controls

Each channel control has two parts:

- **Number Input**: Type exact values with any decimal precision
- **Slider**: Visual control that stays synchronized with the input

**Behavior**:
- Clicking the input selects all text for easy replacement
- Typing preserves your exact decimal places
- Display shows 3 decimal places for calculated values
- Values are clamped to min/max ranges automatically

### Transform Controls

Transforms control how colors vary from the base:

- **L (Lightness)**: -100% to +100% of the lightness range
- **C (Chroma)**: -100% to +100% of the chroma range  
- **H (Hue)**: -360° to +360° rotation around the color wheel

Transform "to Min" applies when creating darker variations.
Transform "to Max" applies when creating lighter variations.

### Easing Curves

Choose how color transitions progress:

- **Linear**: Constant rate of change
- **Cubic**: Gradual acceleration (t³)
- **Quintic**: Strong acceleration (t⁵)
- **Sine**: Smooth S-curve
- **Quadratic**: Quadratic acceleration (t²)
- **Quartic**: Quartic acceleration (t⁴)

### Custom Family Names

- Families are automatically named based on their base color
- Click the family name to edit it
- Your custom name persists until you change it again
- To re-enable auto-naming, edit the name to something else

## Keyboard Shortcuts

- **Enter**: Apply changes to any input field
- **Tab**: Navigate between controls
- **Click Input**: Select all text for easy replacement

## Tips

1. **Start with Transforms**: Adjust transform values first to create systematic variations
2. **Use Easing**: Different curves create different visual effects
3. **Edit Multiple Families**: Create families before editing individual base colors
4. **Export Often**: Copy CSS/SVG to save your work
5. **Touch-Friendly**: Works great on tablets and touch devices

## Browser Support

- Chrome 111+
- Firefox 113+
- Safari 15.4+
- Edge 111+

Requires support for CSS `oklch()` color format.

## Troubleshooting

**Colors look different in my project**:
- Ensure your browser supports OKLCH
- Use the exact CSS values provided

**Can't see variations**:
- Try increasing transform values
- Check that base colors have enough chroma

**Input not responding**:
- Make sure value is within min/max range
- Try clicking away and back

**Export not working**:
- Check browser console for errors
- Try a different browser

