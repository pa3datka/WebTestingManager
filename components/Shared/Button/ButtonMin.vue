<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
});
</script>

<template>
<button class="button-min">{{ props.text }}</button>
</template>