<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <button class="button-cycle-svg hover" type="button">
    <slot name="svg"></slot>
    <div class="text" v-show="props.text?.length">{{ props.text }}</div>
  </button>
</template>