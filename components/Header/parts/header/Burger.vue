<script setup lang="ts">
import { hideOnClickMenu } from "~/composables/shared/HideOnClickMenu";
const showDrawer = () => {
    console.log('show drawer')
}

onMounted(() => {
    const drawer = hideOnClickMenu();
    drawer.showDrawer();
    drawer.hideDrawer();
});
</script>

<template>
<div class="mobile-menu-burger d-flex align-items-center hover d-none-md">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px">
        <path class="first-line" fill-rule="evenodd" fill="#292D32" d="M-0.000,-0.000 L18.000,-0.000 L18.000,2.000 L-0.000,2.000 L-0.000,-0.000 Z"/>
        <path class="center-line" fill-rule="evenodd" fill="#292D32" d="M-0.000,7.000 L18.000,7.000 L18.000,9.000 L-0.000,9.000 L-0.000,7.000 Z"/>
        <path class="last-line" fill-rule="evenodd" fill="#292D32" d="M-0.000,14.000 L18.000,14.000 L18.000,16.000 L-0.000,16.000 L-0.000,14.000 Z"/>
    </svg>
</div>
</template>

<style scoped>

</style>