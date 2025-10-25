<template>
  <div v-if="family" class="color-editor">
    <h2 class="section-header">Edit {{ family.label }}</h2>
    
    <ColorControl
      :color="family.base"
      :color-space="colorSpace"
      @update:color="handleColorUpdate"
    />
    
    <div class="editor-actions">
      <button class="btn btn-primary" @click="handleDone">Done</button>
    </div>
  </div>
</template>

<script setup>
import ColorControl from './ColorControl.vue'

const props = defineProps({
  family: Object,
  colorSpace: Object
})

const emit = defineEmits(['update-family', 'close'])

function handleColorUpdate(newColor) {
  emit('update-family', props.family.id, { base: newColor })
}

function handleDone() {
  emit('close')
}
</script>

<style scoped>
.color-editor {
  display: flex;
  flex-direction: column;
}

.editor-actions {
  margin-top: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-sm);
}
</style>

