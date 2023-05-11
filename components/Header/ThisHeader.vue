<script setup lang="ts">
import LogoComponent from "~/components/Header/parts/header/Logo.vue"
import Navigation from "~/components/Header/parts/header/Navigation.vue";
import Burger from "~/components/Header/parts/header/Burger.vue";
import Languages from "~/components/Header/parts/header/Languages.vue";

</script>

<template>
<header>
    <div class="container d-flex justify-space-between align-items-center">
        <div class="left-header d-flex align-items-center">
            <logo-component />
            <languages />
        </div>
        <Navigation />
        <Burger />
    </div>
</header>
</template>

<style lang="scss">
.left-header {
    column-gap: 88px;
}
</style>