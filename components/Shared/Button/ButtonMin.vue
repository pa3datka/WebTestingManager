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

<style lang="scss">
.button-min {
  height: 28px;
  width: 28px;
  background-color: #FFFFFF;
  border: 1px solid #E4E5F1;
  border-radius: 4px;
  color: #8F8E9C;
  &:active {
    border-color: #8F8E9C;
  }
}
</style>