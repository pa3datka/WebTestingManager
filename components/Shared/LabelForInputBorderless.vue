<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  isBorderBottom: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
<div class="label-border-less" :class="{ 'label-border-less-not-border': !props.isBorderBottom }">
  <div class="label">{{ props.label }}</div>
  <div class="input">
    <slot name="input"></slot>
  </div>
</div>
</template>