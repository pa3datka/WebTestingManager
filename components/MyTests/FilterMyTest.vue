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