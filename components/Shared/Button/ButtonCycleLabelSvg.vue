<script setup lang="ts">
const props = defineProps({
  value: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="button-cycle-label-svg">
    <div class="label-svg">
      <slot name="label"></slot>
    </div>
    <div class="value">{{ props.value }}</div>
  </div>
</template>