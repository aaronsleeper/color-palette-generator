<template>
  <div class="global-controls">
    <h2 class="section-header">Global Controls</h2>
    
    <div class="form-group">
      <label>Number of Families</label>
      <ChannelControl
        :model-value="families"
        :min="1"
        :max="21"
        :step="1"
        abbr="Families"
        @update:model-value="$emit('update:families', $event)"
      />
    </div>
    
    <div class="form-group">
      <label>Variations to Min</label>
      <ChannelControl
        :model-value="variations.toMin"
        :min="1"
        :max="21"
        :step="1"
        abbr="Min"
        @update:model-value="$emit('update-variations', { toMin: $event, toMax: variations.toMax })"
      />
    </div>
    
    <div class="form-group">
      <label>Variations to Max</label>
      <ChannelControl
        :model-value="variations.toMax"
        :min="1"
        :max="21"
        :step="1"
        abbr="Max"
        @update:model-value="$emit('update-variations', { toMin: variations.toMin, toMax: $event })"
      />
    </div>
    
    <h3 class="section-subheader">Transform to Min</h3>
    <div class="form-group">
      <ChannelControl
        :model-value="transform.toMin.L"
        :min="-100"
        :max="100"
        :step="1"
        abbr="L"
        @update:model-value="updateTransform('toMin', 'L', $event)"
      />
    </div>
    <div class="form-group">
      <ChannelControl
        :model-value="transform.toMin.C"
        :min="-100"
        :max="100"
        :step="1"
        abbr="C"
        @update:model-value="updateTransform('toMin', 'C', $event)"
      />
    </div>
    <div class="form-group">
      <ChannelControl
        :model-value="transform.toMin.H"
        :min="-360"
        :max="360"
        :step="1"
        abbr="H"
        @update:model-value="updateTransform('toMin', 'H', $event)"
      />
    </div>
    
    <h3 class="section-subheader">Transform to Max</h3>
    <div class="form-group">
      <ChannelControl
        :model-value="transform.toMax.L"
        :min="-100"
        :max="100"
        :step="1"
        abbr="L"
        @update:model-value="updateTransform('toMax', 'L', $event)"
      />
    </div>
    <div class="form-group">
      <ChannelControl
        :model-value="transform.toMax.C"
        :min="-100"
        :max="100"
        :step="1"
        abbr="C"
        @update:model-value="updateTransform('toMax', 'C', $event)"
      />
    </div>
    <div class="form-group">
      <ChannelControl
        :model-value="transform.toMax.H"
        :min="-360"
        :max="360"
        :step="1"
        abbr="H"
        @update:model-value="updateTransform('toMax', 'H', $event)"
      />
    </div>
    
    <div class="form-group">
      <label>Easing Curve</label>
      <select
        class="select"
        :value="transform.curve"
        @change="$emit('update-curve', $event.target.value)"
      >
        <option value="linear">Linear</option>
        <option value="cubic">Cubic</option>
        <option value="quint">Quintic</option>
        <option value="sine">Sine</option>
        <option value="quad">Quadratic</option>
        <option value="quart">Quartic</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import ChannelControl from './ChannelControl.vue'

const props = defineProps({
  families: Number,
  variations: Object,
  transform: Object
})

const emit = defineEmits(['update:families', 'update-variations', 'update-transform', 'update-curve'])

function updateTransform(direction, channel, value) {
  const newTransform = { ...props.transform }
  newTransform[direction][channel] = value
  emit('update-transform', newTransform)
}
</script>

<style scoped>
.global-controls {
  display: flex;
  flex-direction: column;
}
</style>

