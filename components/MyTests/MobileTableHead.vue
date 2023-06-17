<script setup lang="ts">
import FilterMyTest from "~/components/MyTests/FilterMyTest.vue";
import ButtonCycleSvg from "~/components/Shared/Button/ButtonCycleSvg.vue";
import SearchMyTestInput from "~/components/MyTests/SearchMyTestInput.vue";
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";

const data = reactive({
  mobileHeadBtns: {
    search: false,
    filter: false,
  }
});

const search = (searchString: string) => {
  console.log(searchString);
  data.mobileHeadBtns.search = !data.mobileHeadBtns.search;
}

const showFilter = () => {
  data.mobileHeadBtns.filter = !data.mobileHeadBtns.filter;
};
</script>

<template>
  <div class="mobile-head">
    <SearchMyTestInput v-if="data.mobileHeadBtns.search" v-on:searchString="search"/>

    <button-cycle-svg
        class="white-bg border-none"
        v-if="!data.mobileHeadBtns.search && !data.mobileHeadBtns.filter"
        text="Search"
        @click="data.mobileHeadBtns.search = !data.mobileHeadBtns.search"
    >
      <template v-slot:svg>
        <SvgTemplate name="search-field"/>
      </template>
    </button-cycle-svg>

    <div class="line" v-if="!data.mobileHeadBtns.search && !data.mobileHeadBtns.filter">|</div>

    <button-cycle-svg
        class=" white-bg border-none"
        :class="{'min-btn': data.mobileHeadBtns.filter}"
        v-if="!data.mobileHeadBtns.search"
        :text="!data.mobileHeadBtns.filter ? 'Filter' : ''"
        @click="showFilter">
      <template v-slot:svg>
        <SvgTemplate name="filter"/>
      </template>
    </button-cycle-svg>

    <FilterMyTest :show="data.mobileHeadBtns.filter"/>

  </div>
</template>