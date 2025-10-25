import chroma from 'chroma-js'

/**
 * Clamp a value between min and max
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}

/**
 * Convert percentage to absolute value based on channel range
 */
export function percentageToAbsolute(percentage, channelRange) {
  return (percentage / 100) * channelRange
}

/**
 * Format OKLCH color for CSS
 */
export function formatOKLCH(L, C, H) {
  return `oklch(${L}% ${C} ${H})`
}

/**
 * Create Chroma color object from OKLCH values
 */
export function createChromaColor(L, C, H) {
  // Convert percentage to 0-1 range for Chroma.js
  const lNormalized = L / 100
  return chroma.oklch(lNormalized, C, H)
}

/**
 * Get color name using Chroma.js
 */
export function getColorName(color) {
  try {
    const chromaColor = typeof color === 'string' ? chroma(color) : color
    const name = chromaColor.name()
    
    // If name is hex (unnamed color), generate descriptive name
    if (name.startsWith('#')) {
      const [L, C, H] = chromaColor.oklch()
      return `Color L${Math.round(L * 100)} C${Math.round(C)} H${Math.round(H)}`
    }
    
    // Capitalize first letter
    return name.charAt(0).toUpperCase() + name.slice(1)
  } catch (error) {
    console.error('Error getting color name:', error)
    return 'Unnamed Color'
  }
}

/**
 * Interpolate hue with wrapping
 */
export function interpolateHue(h1, h2, t) {
  const diff = h2 - h1
  
  // Take shorter arc (handle wrapping)
  if (Math.abs(diff) > 180) {
    if (diff > 0) {
      return h1 + (diff - 360) * t
    } else {
      return h1 + (diff + 360) * t
    }
  }
  
  return h1 + diff * t
}

/**
 * Check if color is in sRGB gamut
 */
export function isInGamut(color) {
  try {
    const rgb = chroma(color).rgb()
    return rgb.every(c => c >= 0 && c <= 255)
  } catch {
    return false
  }
}

/**
 * Sanitize label for CSS custom property name
 */
export function sanitizeLabel(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

