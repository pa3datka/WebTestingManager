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

<style lang="scss">
@import "@/assets/css/variables.scss";

.desktop-head {
  display: none;
  height: 100%;
  align-items: center;
  grid-template-columns: minmax(rem-calc(155), rem-calc(310)) minmax(rem-calc(411), rem-calc(822)) minmax(rem-calc(54), rem-calc(108));

  .desktop-search {
    height: rem-calc(48);
    display: flex;
    align-items: center;
    border-right: rem-calc(1) solid $color-hosta-flower;
  }

  .desktop-filter {
    padding-left: 5%;
    padding-right: 5%;
    height: rem-calc(48);
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 2fr;
    column-gap: 10px;

    .filter-stat {
      display: grid;
      justify-content: center;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 10%;
    }

    .filter-type {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 15%;
    }
  }

  .desktop-setting {
    height: rem-calc(48);
    border-left: rem-calc(1) solid $color-hosta-flower;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      background: none;
      border: none;

      &:active {
        svg {
          stroke: $color-black-market;
        }
      }

      &:hover {
        svg {
          stroke: $color-black-market;
        }
      }

      svg {
        stroke: $color-grey-suit;
      }
    }
  }
}

@media (min-width: rem-calc(992)) {
  .desktop-head {
    display: grid;
  }
}
</style>