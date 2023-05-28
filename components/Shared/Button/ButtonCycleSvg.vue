<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'button'
  },
  text: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <button class="button-cycle-svg hover" :type="props.type">
    <slot name="svg"></slot>
    <div class="text">{{ props.text }}</div>
  </button>
</template>