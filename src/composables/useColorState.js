import { ref, reactive, computed } from 'vue'

// OKLCH color space definition
const OKLCH_COLOR_SPACE = {
  name: 'OKLCH',
  channels: [
    { label: 'Lightness', abbr: 'L', min: 0, max: 100 },
    { label: 'Chroma', abbr: 'C', min: 0, max: 150 },
    { label: 'Hue', abbr: 'H', min: 0, max: 360 }
  ]
}

// Default base color (medium lightness, moderate chroma, blue hue)
const DEFAULT_BASE_COLOR = [70, 15, 240]

// Create a reactive global state
const colorSpace = ref(OKLCH_COLOR_SPACE)
const families = ref(1)
const variations = reactive({
  toMin: 1,
  toMax: 1
})
const transform = reactive({
  toMin: { L: 0, C: 0, H: 0 },
  toMax: { L: 0, C: 0, H: 0 },
  curve: 'linear'
})
const focusedFamilyId = ref(null)

// Hue families array - reactive
const hueFamilies = ref([])

export function useColorState() {
  // Initialize default family
  function initializeFamilies() {
    hueFamilies.value = []
    for (let i = 0; i < families.value; i++) {
      hueFamilies.value.push({
        id: i + 1,
        label: 'Color Family',
        nameOverride: false,
        base: [...DEFAULT_BASE_COLOR],
        swatches: []
      })
    }
  }

  // Update families count
  function updateFamiliesCount(newCount) {
    families.value = Math.max(1, Math.min(21, newCount))
    initializeFamilies()
  }

  // Update a family's base color
  function updateFamilyBase(familyId, newBase) {
    const family = hueFamilies.value.find(f => f.id === familyId)
    if (family) {
      family.base = newBase
    }
  }

  // Update a family's label
  function updateFamilyLabel(familyId, label, isOverride = false) {
    const family = hueFamilies.value.find(f => f.id === familyId)
    if (family) {
      family.label = label
      family.nameOverride = isOverride
    }
  }

  // Set focused family
  function setFocusedFamily(familyId) {
    focusedFamilyId.value = familyId
  }

  // Get focused family
  const focusedFamily = computed(() => {
    return hueFamilies.value.find(f => f.id === focusedFamilyId.value) || null
  })

  // Initialize on first use
  if (hueFamilies.value.length === 0) {
    initializeFamilies()
  }

  return {
    // State
    colorSpace,
    families,
    variations,
    transform,
    hueFamilies,
    focusedFamilyId,
    focusedFamily,
    
    // Methods
    updateFamiliesCount,
    updateFamilyBase,
    updateFamilyLabel,
    setFocusedFamily,
    initializeFamilies
  }
}

