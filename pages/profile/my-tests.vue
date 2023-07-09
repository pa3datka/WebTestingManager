<script setup lang="ts">
import DesktopTableHead from "~/components/MyTests/DesktopTableHead.vue";
import MobileTableHead from "~/components/MyTests/MobileTableHead.vue";
import ButtonCycleSvg from "~/components/Shared/Button/ButtonCycleSvg.vue";
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";
import TableItem from "~/components/MyTests/TableItem.vue";

import {useRouter} from "nuxt/app";
import {computed} from "@vue/reactivity";
import {useTest} from "~/composables/test/useTest";
import {IPaginate} from "~/composables/Interfaces/IPaginate";
import PaginateButtons from "~/components/Shared/Paginate/PaginateButtons.vue";
import {useRoute} from "nuxt/app";
import {useTestStore} from "~/store/shared/Test";
import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";

definePageMeta({
  name: "my-tests",
  layout: 'dashboard',
  middleware: ['is-auth']
});



const route = useRoute();
const {fetchMyTests} = useTest();
const router = useRouter();
const data = reactive({
  myTests: <ITest[]|[]> [],
  paginate: <IPaginate|null> {}
});

const myTests = computed(() => useTestStore().getMyTests);
const paginate = computed(() => useTestStore().getPaginate);
const getMyTests = async (page = null) => {
  await fetchMyTests(page);
};

onMounted(async () => {
  await getMyTests();
});

const countMyTests = computed(() => useTestStore().getCountMyTests);

const getPageName = (pageName: string) => {
  router.push({ name: pageName });
}

watch(() => route.query.page, async () => {
  await getMyTests(route.query.page);
});
</script>

<template>
<div class="container">
  <div class="page-my-tests">
    <div class="title">

      <div class="btn-head" @click="getPageName('add-test')">
        <svg-template name="add-test"/>
      </div>
      <div>My Tests ({{ countMyTests }})</div>

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

      <div class="table-content" v-if="myTests.length">
        <TableItem class="pt-sm-14 pt-lg-20" v-for="test in myTests" :testItem="test" :key="test.id"/>
      </div>

      <div class="table-footer pt-sm-15 pt-lg-30" v-if="paginate && paginate.last_page > 1">
        <PaginateButtons v-on:showPage="getMyTests" :paginate="paginate"/>
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
@import "@/assets/css/components/parts/buttons/button-min";

</style>