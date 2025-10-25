<template>
  <div class="export-panel">
    <h2 class="section-header">Export</h2>
    
    <div>
      <h3>CSS Variables</h3>
      <button class="btn btn-primary" @click="copyCSS">Copy CSS</button>
      <div v-if="cssPreview" class="export-preview">{{ cssPreview }}</div>
    </div>
    
    <div style="margin-top: var(--spacing-lg);">
      <h3>SVG</h3>
      <button class="btn btn-primary" @click="copySVG">Copy SVG</button>
      <div v-if="svgPreview" class="export-preview">{{ svgPreview }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { sanitizeLabel } from '../utils/colorUtils.js'

const props = defineProps({
  families: Array
})

const cssPreview = ref('')
const svgPreview = ref('')

function generateCSS() {
  let css = ':root {\n'
  
  props.families.forEach(family => {
    const sanitizedName = sanitizeLabel(family.label)
    family.swatches.forEach((swatch, index) => {
      css += `  --${sanitizedName}-${index + 1}: ${swatch};\n`
    })
  })
  
  css += '}'
  return css
}

function generateSVG() {
  const swatchSize = 24
  const maxSwatches = Math.max(...props.families.map(f => f.swatches.length))
  const width = maxSwatches * swatchSize
  const height = props.families.length * swatchSize
  
  let svg = `<svg width="${width}" height="${height}">\n`
  
  props.families.forEach((family, familyIndex) => {
    family.swatches.forEach((swatch, swatchIndex) => {
      const x = swatchIndex * swatchSize
      const y = familyIndex * swatchSize
      svg += `  <rect x="${x}" y="${y}" width="${swatchSize}" height="${swatchSize}" fill="${swatch}"/>\n`
    })
  })
  
  svg += '</svg>'
  return svg
}

async function copyCSS() {
  const css = generateCSS()
  cssPreview.value = css
  try {
    await navigator.clipboard.writeText(css)
    alert('CSS copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy CSS:', error)
  }
}

async function copySVG() {
  const svg = generateSVG()
  svgPreview.value = svg
  try {
    await navigator.clipboard.writeText(svg)
    alert('SVG copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy SVG:', error)
  }
}
</script>

<style scoped>
.export-panel {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
}

.export-preview {
  background-color: #f8f9fa;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  max-height: 200px;
  overflow-y: auto;
  margin-top: var(--spacing-sm);
  white-space: pre-wrap;
  word-break: break-all;
}
</style>

