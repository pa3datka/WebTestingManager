<script setup lang="ts">
import {reactive} from "@vue/reactivity";

const emit = defineEmits(['active']);
const props = defineProps({
  activeValue: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number,
    default: null
  }
});
const data = reactive({
  active: <boolean> false
});

const active = (): void => {
  emit('active', {active: true, id: props.id});
};
</script>

<template>
<div class="button-square" :class="{'button-square-active': props.isActive}" @click="active">
  <div class="button-square__value">
    <div class="button-square__value-inactive">{{ props.value }}</div>
    <div class="button-square__value-active d-none">{{ props.value + ' ' + props.activeValue }}</div>
  </div>
</div>
</template>