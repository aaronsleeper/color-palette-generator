<template>
  <div class="hue-family">
    <div class="hue-family-header">
      <input
        v-model="localLabel"
        class="text-input hue-family-label"
        @blur="handleLabelBlur"
      />
    </div>
    
    <div class="swatch-grid">
      <Swatch
        v-for="(swatch, index) in family.swatches"
        :key="index"
        :color="swatch"
        @click="$emit('focus', family.id)"
      />
    </div>
    
    <div v-if="focused" class="value-table" :style="{ '--swatch-count': family.swatches.length }">
      <div class="value-table-header">Channel</div>
      <div
        v-for="(channel, index) in colorSpace.channels"
        :key="channel.abbr"
        class="value-table-header"
      >
        {{ channel.abbr }}
      </div>
      
      <template v-for="(swatch, swatchIndex) in family.swatches" :key="swatchIndex">
        <div class="value-table-cell">
          Swatch {{ swatchIndex + 1 }}
        </div>
        <div
          v-for="(channel, channelIndex) in colorSpace.channels"
          :key="channel.abbr"
          class="value-table-cell"
        >
          {{ getChannelValue(swatch, channelIndex) }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swatch from './Swatch.vue'
import { parseOKLCH } from '../utils/colorEngine.js'

const props = defineProps({
  family: {
    type: Object,
    required: true
  },
  colorSpace: {
    type: Object,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['focus', 'update-label'])

const localLabel = ref(props.family.label)

function handleLabelBlur() {
  if (localLabel.value !== props.family.label) {
    emit('update-label', props.family.id, localLabel.value, true)
  }
}

function getChannelValue(swatch, channelIndex) {
  const components = parseOKLCH(swatch)
  if (components) {
    const value = components[channelIndex]
    // Format based on channel type
    if (channelIndex === 0) {
      return value.toFixed(1) + '%'
    } else if (channelIndex === 1) {
      return value.toFixed(1)
    } else {
      return Math.round(value) + '°'
    }
  }
  return '-'
}
</script>

<style scoped>
.hue-family {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
}

.hue-family-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.hue-family-label {
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-bottom: 2px solid transparent;
  padding: var(--spacing-xs);
}

.hue-family-label:focus {
  border-bottom-color: var(--color-primary);
  outline: none;
}

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.value-table {
  display: grid;
  grid-template-columns: auto repeat(var(--swatch-count, 0), 1fr);
  gap: var(--spacing-xs);
  font-size: 0.875rem;
  border-top: 1px solid var(--color-border);
  padding-top: var(--spacing-sm);
}

.value-table-header {
  font-weight: 600;
  color: #666;
  padding: var(--spacing-xs);
}

.value-table-cell {
  text-align: center;
  padding: var(--spacing-xs);
}
</style>

