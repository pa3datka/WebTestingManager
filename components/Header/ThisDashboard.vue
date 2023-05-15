<script setup lang="ts">
import Logo from "~/components/Header/parts/header/Logo.vue";

import {localStore} from "~/composables/localStorage/LocalStore";

const data = reactive({
    isShow: true
});
const openDashboard = () => {
    const state = localStore().getDashboardMenuState();
    localStore().setDashboardMenuState(!state);

    data.isShow = !state;
};

onMounted(() => {
    data.isShow = localStore().getDashboardMenuState();
});
</script>

<template>
    <div
            :class="{'dashboard-min': !data.isShow}"
            class="dashboard-wrapper">
        <div class="top">
            <logo/>
        </div>
        <menu>
            <li class="d-flex align-items-center">
                <nuxt-link class="d-flex align-items-center" to="/tests">
                    <div class="svg-link">
                        <svg-template name="home"/>
                    </div>
                    <span>link.name</span>
                </nuxt-link>
            </li>

            <li class="d-flex align-items-center hover">
                <nuxt-link class="d-flex align-items-center">
                    <div class="svg-link">
                        <svg-template name="home"/>
                    </div>
                    <span>link.name</span>
                </nuxt-link>
            </li>
        </menu>

        <div class="collapse hover" @click="openDashboard()">
            <div class="btn-collapse d-flex align-items-center">
                <div class="btn-svg">
                    <svg-template name="collapse"/>
                </div>
                <span>Collapse</span>
            </div>
        </div>
    </div>
</template>