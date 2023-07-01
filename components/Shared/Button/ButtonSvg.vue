<script setup lang="ts">
import {PropType} from "@vue/runtime-core";

type ButtonType = "button" | "reset" | "submit";
const props = defineProps({
  type: {
    type: String as PropType<ButtonType>,
    default: 'button'
  },
  height: {
    type: String,
    default: 'auto'
  },
  width: {
    type: String,
    default: 'auto'
  }
});
</script>

<template>
<button class="button-svg hover" :style="{'height': props.height, 'width': props.width }" :type="`${props.type}`">
  <slot name="svg"></slot>
</button>
</template>

<style  lang="scss">
.button-svg {
  border: none;
  background: none;
  padding: 0;
}
</style>