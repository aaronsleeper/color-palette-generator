<template>
  <div
    class="swatch"
    :style="{ backgroundColor: color }"
    :tabindex="0"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    required: true
  }
})

defineEmits(['click'])
</script>

<style scoped>
.swatch {
  block-size: 100%;
  inline-size: 1fr;
  min-height: 60px;
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.swatch:hover {
  border-color: var(--color-primary);
  transform: scale(1.05);
}

.swatch:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
</style>

