<script setup lang="ts">
const data = reactive({
  show: false,
});
</script>

<template>
<div class="alert" v-if="data.show">
  sdfsdfsdffdf
</div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";
.alert {
  position: fixed;
  right: 0;
  top: rem-calc(125);
  z-index: 30;
  padding: rem-calc((20, 50, 20, 30));
  border-left: rem-calc(4) solid $color-red-2;
  border-bottom-left-radius: rem-calc(14);
  border-top-left-radius: rem-calc(14);
  background-color: rgba(222, 60, 75, .5)

}
</style>