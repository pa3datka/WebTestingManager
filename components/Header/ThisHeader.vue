<script setup lang="ts">
import LogoComponent from "~/components/Header/parts/header/Logo.vue"
import Navigation from "~/components/Header/parts/header/Navigation.vue";
import Burger from "~/components/Header/parts/header/Burger.vue";
import Languages from "~/components/Header/parts/header/Languages.vue";
import LaptopMenu from "~/components/Header/parts/header/LaptopMenu.vue";
import Auth from "~/components/Header/parts/header/Auth.vue";

const props = defineProps({
    isLogo: {
        type: Boolean,
        default: true
    }
});

</script>

<template>
<header>
    <div class="container-header d-flex justify-space-between align-items-center" style="height: 100%;">
        <div class="left-header d-flex align-items-center">
            <logo-component />
            <laptop-menu />
            <languages />
        </div>
        <Navigation />
        <div class="right-header d-flex align-items-center">
            <Auth />
            <Burger />
        </div>
    </div>
</header>
</template>