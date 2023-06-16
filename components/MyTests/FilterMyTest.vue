<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

</script>

<template>
<div class="filter-my-test" :class="{ 'hide-filter': !props.show }" :style="{'transition': props.show ? 'width .3s linear' : ''}">
  <div class="average-ball active-filter  hover">ball</div>
  <div class="past active-filter hover">past</div>
  <div class="difficulty active-filter hover">difficulty</div>
  <div class="category active-filter hover">category</div>
  <div class="type active-filter hover">type</div>
</div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";

.filter-my-test {
  padding-left: rem-calc(5);
  padding-right: rem-calc(5);
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  display: flex;
  column-gap: 5px;

  border-left: rem-calc(1) solid $color-hosta-flower;
  color: $color-black-market;
  font-size: $font11;
}

.active-filter {
  display: flex;
  align-items: center;
  column-gap: rem-calc(5);
  &:before {
    content: '';
    background-image: url("@/assets/img/svg/polygon-up.svg");
    height: rem-calc(8);
    width: rem-calc(8);
    background-repeat: no-repeat;
    transform: rotate(180deg);
    opacity: .5;
  }
}

@media (min-width: rem-calc(400)) {
  .filter-my-test {
    padding-left: rem-calc(24);
    padding-right: rem-calc(24);
    column-gap: rem-calc(10);
    justify-content: center;
    font-size: $font13;
  }
}

@media (min-width: rem-calc(500)) {
  .filter-my-test {
    column-gap: rem-calc(15);
    font-size: $font15;
  }
}

.hide-filter {
  width: 0;
  padding: 0;
  border: none;

}
</style>