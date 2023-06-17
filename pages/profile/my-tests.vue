<script setup lang="ts">
import DesktopTableHead from "~/components/MyTests/DesktopTableHead.vue";
import MobileTableHead from "~/components/MyTests/MobileTableHead.vue";
import ButtonCycleSvg from "~/components/Shared/Button/ButtonCycleSvg.vue";
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";
import TableItem from "~/components/MyTests/TableItem.vue";

definePageMeta({
  name: "my-tests",
  layout: 'dashboard',
  middleware: ['is-auth']
});

import {useRouter} from "nuxt/app";

const router = useRouter();

const getPageName = (pageName: string) => {
  router.push({ name: pageName });
}
</script>

<template>
<div class="container">
  <div class="page-my-tests">
    <div class="title">

      <div class="btn-head" @click="getPageName('add-test')">
        <svg-template name="add-test"/>
      </div>
      <div>My Tests ({{ 12 }})</div>

      <div class="btn-head-desktop">
        <ButtonCycleSvg class="cotton-ball-bg button-active-info" @click="getPageName('add-test')" text="Add test">
          <template v-slot:svg>
            <SvgTemplate name="add-test"/>
          </template>
        </ButtonCycleSvg>
      </div>
    </div>

    <div class="page-table-tests">

      <div class="table-head">
        <MobileTableHead />
        <DesktopTableHead />
      </div>

      <div class="table-content">
        <TableItem class="pt-sm-14 pt-lg-20"/>
        <TableItem class="pt-sm-14 pt-lg-20"/>
        <TableItem class="pt-sm-14 pt-lg-20"/>
        <TableItem class="pt-sm-14 pt-lg-20"/>
        <TableItem class="pt-sm-14 pt-lg-20"/>
        <TableItem class="pt-sm-14 pt-lg-20"/>
        <TableItem class="pt-sm-14 pt-lg-20"/>
      </div>

    </div>
  </div>

</div>
</template>

<style lang="scss">
//parts
@import "@/assets/css/variables.scss";
@import "@/assets/css/components/pages/my-tests/my-tests-page";
@import "@/assets/css/components/pages/my-tests/parts/mobile-table-head";
@import "@/assets/css/components/pages/my-tests/parts/search-my-test-input";
@import "@/assets/css/components/pages/my-tests/parts/filter-my-test";
@import "@/assets/css/components/pages/my-tests/parts/desktop-table-head";
@import "@/assets/css/components/pages/my-tests/parts/table-item";
@import "@/assets/css/components/parts/indicators/item-rate";

//shared
@import "@/assets/css/components/parts/buttons/button-cycle-svg";

</style>