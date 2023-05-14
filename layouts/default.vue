<script setup lang="ts">
import MainHeader from "@/components/Header/ThisHeader.vue"
import Drawer from "~/components/Header/ThisDrawer.vue";
</script>

<template>
  <div class="tm-main">
      <main-header />
      <Drawer />
      <NuxtPage />
  </div>
</template>

<style scoped>

</style>