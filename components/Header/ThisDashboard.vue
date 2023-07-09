<script setup lang="ts">
import Logo from "~/components/Header/parts/header/Logo.vue";

import {localStore} from "~/composables/localStorage/LocalStore";
import {useTestStore} from "~/store/shared/Test";
import {useTest} from "~/composables/test/useTest";
import {computed} from "@vue/reactivity";

const {fetchCountTests} = useTest();
const data = reactive({
    isShow: true
});
const openDashboard = () => {
    const state = localStore().getDashboardMenuState();
    localStore().setDashboardMenuState(!state);

    data.isShow = !state;
};

onMounted(async () => {
    data.isShow = localStore().getDashboardMenuState();
    await fetchCountTests();
});

const countMyTests = computed(() => useTestStore().getCountMyTests);
</script>

<template>
    <div :class="{'dashboard-min': !data.isShow}" class="dashboard-wrapper">
        <div class="top">
            <logo/>
        </div>
        <menu>
            <li class="d-flex align-items-center">
                <nuxt-link class="d-flex align-items-center" to="/profile">
                    <div class="svg-link">
                        <svg-template name="home"/>
                    </div>
                    <span class="name-link">Home</span>
                </nuxt-link>
            </li>

            <li class="d-flex align-items-center hover">
                <nuxt-link class="d-flex align-items-center" to="/profile/my-tests">
                    <div class="svg-link">
                        <svg-template name="my-tests"/>
                    </div>
                    <span class="name-link">My tests</span>

                </nuxt-link>
                <div class="count-dashboard" v-show="countMyTests">
                  <span>{{ countMyTests }}</span>
                </div>
            </li>

          <li class="d-flex align-items-center hover">
            <nuxt-link class="d-flex align-items-center" to="/profile/add-test">
              <div class="svg-link">
                <svg-template name="add-test"/>
              </div>
              <span class="name-link">Add test</span>
            </nuxt-link>
          </li>
        </menu>

        <div class="container-collapse hover" @click="openDashboard()">
            <div class="btn-collapse d-flex align-items-center">
                <div class="btn-svg">
                    <svg-template name="collapse"/>
                </div>
                <span>Collapse</span>
            </div>
        </div>
    </div>
</template>