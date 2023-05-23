<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  }
});

</script>

<template>
  <label class="switch">
    <input type="checkbox" v-model="value" />
    <span class="slider"></span>
  </label>
</template>