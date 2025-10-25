import chroma from 'chroma-js'
import { createChromaColor, formatOKLCH, interpolateHue } from './colorUtils.js'

/**
 * Easing functions for color transitions
 */
export const easingFunctions = {
  linear(t) {
    return t
  },
  cubic(t) {
    return t * t * t
  },
  quint(t) {
    return t * t * t * t * t
  },
  sine(t) {
    return 1 - Math.cos(t * Math.PI / 2)
  },
  quad(t) {
    return t * t
  },
  quart(t) {
    return t * t * t * t
  }
}

/**
 * Apply transform to a base color
 */
function applyTransform(baseColor, transform, channelRanges) {
  const [L, C, H] = baseColor
  
  return [
    L + (transform.L / 100) * channelRanges.L,  // Lightness
    C + (transform.C / 100) * channelRanges.C,  // Chroma
    H + transform.H                              // Hue (degrees)
  ]
}

/**
 * Interpolate between two colors using OKLCH space
 */
function interpolateColors(color1, color2, t, curve = 'linear') {
  const easeFn = easingFunctions[curve] || easingFunctions.linear
  const easedT = easeFn(t)
  
  try {
    return chroma.mix(color1, color2, easedT, 'oklch')
  } catch (error) {
    console.error('Error interpolating colors:', error)
    return color1
  }
}

/**
 * Generate swatches for a hue family
 */
export function generateSwatches(baseColor, variations, transform, curve = 'linear') {
  const swatches = []
  
  // Channel ranges for OKLCH
  const channelRanges = {
    L: 100,  // 0-100
    C: 150,  // 0-150
    H: 360   // 0-360 degrees
  }
  
  // Calculate target colors
  const minTarget = applyTransform(baseColor, transform.toMin, channelRanges)
  const maxTarget = applyTransform(baseColor, transform.toMax, channelRanges)
  
  // Create Chroma color objects
  const baseChroma = createChromaColor(baseColor[0], baseColor[1], baseColor[2])
  const minChroma = createChromaColor(minTarget[0], minTarget[1], minTarget[2])
  const maxChroma = createChromaColor(maxTarget[0], maxTarget[1], maxTarget[2])
  
  // Generate swatches toward min
  for (let i = variations.toMin; i >= 1; i--) {
    const t = i / (variations.toMin + 1)
    const swatch = interpolateColors(baseChroma, minChroma, t, curve)
    const [L, C, H] = swatch.oklch()
    swatches.push(formatOKLCH(L * 100, C, H))
  }
  
  // Add base color
  swatches.push(formatOKLCH(baseColor[0], baseColor[1], baseColor[2]))
  
  // Generate swatches toward max
  for (let i = 1; i <= variations.toMax; i++) {
    const t = i / (variations.toMax + 1)
    const swatch = interpolateColors(baseChroma, maxChroma, t, curve)
    const [L, C, H] = swatch.oklch()
    swatches.push(formatOKLCH(L * 100, C, H))
  }
  
  return swatches
}

/**
 * Get OKLCH components from CSS color string
 */
export function parseOKLCH(colorString) {
  // Match oklch(70% 15 240) format
  const match = colorString.match(/oklch\(([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\)/)
  if (match) {
    return [
      parseFloat(match[1]),
      parseFloat(match[2]),
      parseFloat(match[3])
    ]
  }
  return null
}

