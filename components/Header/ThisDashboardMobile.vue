<script setup lang="ts">
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";
import {hideOnClickMenu} from "~/composables/shared/HideOnClickMenu";

const hide = hideOnClickMenu();
const data = reactive({
  isClose: false
});
const closeDashboard = () => {
  data.isClose = !data.isClose;
};

onMounted(() => {
  hide.hideMobileDashboard('dashboard-mobile', 'open-dashboard', closeDashboard);
});

</script>

<template>
  <div
      class="dashboard-mobile"
      :class="{ 'open-dashboard': data.isClose }"
  >
    <div class="dashboard-mobile-wrapper">
      <div class="header" @click="hide.mobileDashboard('dashboard-mobile', closeDashboard)">
        <div class="dashboard-close hover">
          <SvgTemplate name="close"/>
        </div>
        <div class="dashboard-open">|</div>
      </div>

      <div class="dashboard-list">
        <menu>
          <li @click="hide.mobileDashboard('dashboard-mobile', closeDashboard)">
            <nuxt-link to="/profile">
              <div class="svg-item">
                <SvgTemplate name="home"/>
              </div>
              <div class="text-item">
                <div>Home</div>
                <div class="count">12</div>
              </div>
            </nuxt-link>
          </li>

          <li @click="hide.mobileDashboard('dashboard-mobile', closeDashboard)">
            <nuxt-link to="/profile/my-tests">
              <div class="svg-item">
                <SvgTemplate name="my-tests"/>
              </div>
              <div class="text-item">
                <div>My tests</div>
              </div>
            </nuxt-link>
          </li>

          <li @click="hide.mobileDashboard('dashboard-mobile', closeDashboard)">
            <nuxt-link to="/profile/add-test">
              <div class="svg-item">
                <SvgTemplate name="add-test"/>
              </div>
              <div class="text-item">
                <div>Add Test</div>
              </div>
            </nuxt-link>
          </li>


        </menu>
      </div>
    </div>

  </div>
</template>