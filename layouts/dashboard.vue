<script setup lang="ts">
import MainHeader from "@/components/Header/ThisHeader.vue"
import Drawer from "~/components/Header/ThisDrawer.vue";
import Dashboard from "~/components/Header/ThisDashboard.vue";
import ThisDashboardMobile from "~/components/Header/ThisDashboardMobile.vue";
</script>

<template>
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
    </div>
</template>

<style>
.open-background {
    position: fixed;
    top: 63px;
    bottom: 0;
    width: 100%;
    background-color: #262342;
    opacity: .8;
    z-index: 9;
    display: none;
    transition: all .5s ease-in-out;
}
</style>