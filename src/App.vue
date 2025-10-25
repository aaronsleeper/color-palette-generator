<template>
  <div class="app-container">
    <!-- Left Sidebar: Global Controls -->
    <aside class="sidebar">
      <GlobalControls
        :families="families"
        :variations="variations"
        :transform="transform"
        @update:families="handleFamiliesUpdate"
        @update-variations="handleVariationsUpdate"
        @update-transform="handleTransformUpdate"
        @update-curve="handleCurveUpdate"
      />
      
      <ExportPanel :families="hueFamilies" />
    </aside>
    
    <!-- Main Content: Hue Families -->
    <main class="main-content">
      <h1>Color Palette Generator</h1>
      <div class="hue-families">
        <HueFamily
          v-for="family in hueFamilies"
          :key="family.id"
          :family="family"
          :color-space="colorSpace"
          :focused="focusedFamilyId === family.id"
          @focus="handleFamilyFocus"
          @update-label="handleLabelUpdate"
        />
      </div>
    </main>
    
    <!-- Right Panel: Color Editor -->
    <aside class="editor-panel">
      <ColorEditor
        v-if="focusedFamily"
        :family="focusedFamily"
        :color-space="colorSpace"
        @update-family="handleFamilyUpdate"
        @close="handleEditorClose"
      />
      <div v-else class="editor-placeholder">
        <p>Click a swatch to edit its base color</p>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { watch, computed } from 'vue'
import { useColorState } from './composables/useColorState.js'
import { generateSwatches } from './utils/colorEngine.js'
import { getColorName } from './utils/colorUtils.js'
import GlobalControls from './components/GlobalControls.vue'
import HueFamily from './components/HueFamily.vue'
import ColorEditor from './components/ColorEditor.vue'
import ExportPanel from './components/ExportPanel.vue'

const {
  colorSpace,
  families,
  variations,
  transform,
  hueFamilies,
  focusedFamilyId,
  focusedFamily,
  updateFamiliesCount,
  updateFamilyBase,
  updateFamilyLabel,
  setFocusedFamily
} = useColorState()

// Generate swatches for all families
function generateAllSwatches() {
  hueFamilies.value.forEach(family => {
    family.swatches = generateSwatches(
      family.base,
      variations,
      transform,
      transform.curve
    )
    
    // Update family name if not overridden
    if (!family.nameOverride) {
      try {
        const colorString = `oklch(${family.base[0]}% ${family.base[1]} ${family.base[2]})`
        family.label = getColorName(colorString)
      } catch (error) {
        console.error('Error generating name:', error)
      }
    }
  })
}

// Watch for changes that affect colors
watch([families, variations, transform], () => {
  generateAllSwatches()
}, { deep: true })

watch(() => hueFamilies.value, () => {
  generateAllSwatches()
}, { deep: true })

// Initialize on mount
generateAllSwatches()

// Event handlers
function handleFamiliesUpdate(newCount) {
  updateFamiliesCount(newCount)
}

function handleVariationsUpdate(newVariations) {
  variations.toMin = newVariations.toMin
  variations.toMax = newVariations.toMax
}

function handleTransformUpdate(newTransform) {
  Object.assign(transform, newTransform)
}

function handleCurveUpdate(newCurve) {
  transform.curve = newCurve
}

function handleFamilyFocus(familyId) {
  setFocusedFamily(familyId)
}

function handleLabelUpdate(familyId, label, isOverride) {
  updateFamilyLabel(familyId, label, isOverride)
}

function handleFamilyUpdate(familyId, updates) {
  if (updates.base) {
    updateFamilyBase(familyId, updates.base)
  }
}

function handleEditorClose() {
  setFocusedFamily(null)
}
</script>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: 300px 1fr 350px;
  grid-template-rows: 100vh;
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  background-color: #f8f9fa;
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
  padding: var(--spacing-lg);
}

.main-content {
  background-color: var(--color-bg);
  overflow-y: auto;
  padding: var(--spacing-lg);
}

.editor-panel {
  background-color: #f8f9fa;
  border-left: 1px solid var(--color-border);
  overflow-y: auto;
  padding: var(--spacing-lg);
}

.editor-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #999;
}

.hue-families {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  margin-top: var(--spacing-lg);
}

/* Responsive */
@media (max-width: 1024px) {
  .app-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
  }
  
  .sidebar,
  .editor-panel {
    max-height: 300px;
  }
}
</style>
