<template>
  <div class="channel-control">
    <span class="channel-label">{{ abbr }}</span>
    <div class="channel-input-wrapper">
      <input
        ref="inputRef"
        type="number"
        class="channel-input"
        :value="displayValue"
        :min="min"
        :max="max"
        :step="step"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <input
        type="range"
        class="channel-slider"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        @input="handleSliderInput"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { clamp } from '../utils/colorUtils.js'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  step: {
    type: Number,
    default: 0.001
  },
  label: {
    type: String,
    default: ''
  },
  abbr: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)
const userInput = ref(null) // Store exact user input

// Display value rounded to 3 decimals for calculated values
const displayValue = computed(() => {
  if (userInput.value !== null) {
    return userInput.value
  }
  return parseFloat(props.modelValue.toFixed(3))
})

function handleInput(event) {
  const value = parseFloat(event.target.value)
  userInput.value = value
  const clamped = clamp(value, props.min, props.max)
  emit('update:modelValue', clamped)
}

function handleFocus(event) {
  event.target.select()
}

function handleBlur() {
  // Clamp on blur
  const clamped = clamp(props.modelValue, props.min, props.max)
  if (clamped !== props.modelValue) {
    emit('update:modelValue', clamped)
  }
  // Clear user input after blur to show calculated value
  setTimeout(() => {
    userInput.value = null
  }, 100)
}

function handleSliderInput(event) {
  const value = parseFloat(event.target.value)
  userInput.value = null // Clear user input when slider changes
  emit('update:modelValue', value)
}
</script>

<style scoped>
.channel-control {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.channel-label {
  min-width: 24px;
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
}

.channel-input-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.channel-input {
  width: 100%;
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  text-align: center;
}

.channel-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.channel-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, #ddd, #bbb);
  outline: none;
  cursor: pointer;
}

.channel-slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.channel-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.2);
}

.channel-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-primary);
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.channel-slider::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.2);
}
</style>

