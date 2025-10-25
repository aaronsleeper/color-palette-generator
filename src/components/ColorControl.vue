<template>
  <div class="color-control">
    <div
      v-for="(channel, index) in colorSpace.channels"
      :key="channel.abbr"
      class="form-group"
    >
      <ChannelControl
        :model-value="color[index]"
        :min="channel.min"
        :max="channel.max"
        :step="index === 0 ? 0.01 : index === 1 ? 0.1 : 1"
        :label="channel.label"
        :abbr="channel.abbr"
        @update:model-value="updateChannel(index, $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ChannelControl from './ChannelControl.vue'

const props = defineProps({
  color: {
    type: Array,
    required: true
  },
  colorSpace: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:color'])

const localColor = ref([...props.color])

function updateChannel(index, value) {
  localColor.value[index] = value
  emit('update:color', [...localColor.value])
}
</script>

<style scoped>
.color-control {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
</style>

