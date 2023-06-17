<script setup lang="ts">
import SearchMyTestInput from "~/components/MyTests/SearchMyTestInput.vue";
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";
</script>

<template>
  <div class="desktop-head">
    <div class="desktop-search">
      <SearchMyTestInput/>
    </div>
    <div class="desktop-filter">
      <div class="filter-stat">
        <div class="average-ball active-filter  hover">GPA</div>
        <div class="past active-filter hover">Passes</div>
        <div class="difficulty active-filter hover">Difficulty</div>
      </div>
      <div class="filter-type">
        <div class="category active-filter hover">Category</div>
        <div class="type active-filter hover">Type</div>
      </div>
    </div>
    <div class="desktop-setting">
      <button type="button" class="hover">
        <SvgTemplate name="menu-options"/>
      </button>
    </div>

  </div>
</template>