<script setup lang="ts">
import ButtonCycle from "~/components/Shared/Button/ButtonCycleSvg.vue";
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";

</script>

<template>
<div class="btn-save-group">
  <div>
    <slot name="btn-one"></slot>
  </div>
  <div class="delimiter"></div>
  <div>
    <slot name="btn-two"></slot>
  </div>
</div>
</template>