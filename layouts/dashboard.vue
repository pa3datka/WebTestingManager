<script setup lang="ts">
import MainHeader from "@/components/Header/ThisHeader.vue"
import Drawer from "~/components/Header/ThisDrawer.vue";
import Dashboard from "~/components/Header/ThisDashboard.vue";
import ThisDashboardMobile from "~/components/Header/ThisDashboardMobile.vue";
import Alert from "~/components/Shared/Alert/Alert.vue";
</script>

<template>
    <client-only>
      <div class="dashboard">
        <div class="tm-main-dashboard">
          <main-header />
          <Drawer />

          <NuxtPage />
        </div>
        <div class="dashboard-container">
          <Dashboard />
        </div>

        <ThisDashboardMobile />
        <div class="open-background"></div>
        <Alert />
      </div>
    </client-only>
</template>