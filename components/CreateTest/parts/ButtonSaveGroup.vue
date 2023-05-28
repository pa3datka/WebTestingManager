<script setup lang="ts">
import ButtonCycle from "~/components/Shared/Button/ButtonCycleSvg.vue";
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";

</script>

<template>
<div class="btn-save-group">
  <div>
    <ButtonCycle class="button-active-info cotton-ball-bg" text="View" type="button">
      <template v-slot:svg>
        <SvgTemplate name="password"/>
      </template>
    </ButtonCycle>
  </div>
  <div class="delimiter"></div>
  <div>
    <ButtonCycle class="button-active-info cotton-ball-bg" text="Save" type="button">
      <template v-slot:svg>
        <SvgTemplate name="export"/>
      </template>
    </ButtonCycle>
  </div>
</div>
</template>