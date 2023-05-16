<script setup lang="ts">
import User from "@/components/Header/parts/drawer/User.vue";
import Languages from "~/components/Header/parts/drawer/Languages.vue";
import AuthMenu from "~/components/Header/parts/drawer/AuthMenu.vue";
import ListLinks from "~/components/Header/parts/drawer/ListLinks.vue";

</script>

<template>
    <div class="drawer-container">
        <div class="drawer-wrap">
            <div class="drawer">
                <div class="drawer-close">
                    <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.89948 21.799L11.799 11.8995L1.89947 1.99996" stroke="white" stroke-width="3" stroke-linecap="round"/>
                    </svg>
                </div>
                <User />
                <languages />
                <hr>
                <AuthMenu />
                <hr>
                <list-links />
            </div>
        </div>
        <div class="shadow-background" onclick="void(0);"></div>
    </div>
</template>