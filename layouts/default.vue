<script setup lang="ts">
import MainHeader from "@/components/Header/ThisHeader.vue"
import Drawer from "~/components/Header/ThisDrawer.vue";
import Alert from "~/components/Shared/Alert/Alert.vue";
</script>

<template>
  <div class="tm-main">
      <main-header />
      <Drawer />
      <NuxtPage />
      <Alert />
  </div>
</template>