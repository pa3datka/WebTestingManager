<script setup lang="ts">
const props = defineProps({
    isShow: {
        type: Boolean,
        default: true
    }
});
</script>

<template>
  <div v-show="props.isShow" class="logo-main d-flex align-items-center">
      <img src="/img/logo/logo-main.png" alt="Logo" />
      <span>TestingManager</span>
  </div>
</template>