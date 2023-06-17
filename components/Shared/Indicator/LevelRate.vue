<script setup lang="ts">
const props = defineProps({
  rate: {
    type: String,
    default: '0'
  },

  title: {
    type: String,
    default: ''
  }
});

</script>

<template>
  <div class="level-rate">
    <div class="level-rate-title" v-if="props.title?.length">
      {{ props.title }}
    </div>
    <div class="cycle-value level-rate-5">
          <div class="one"></div>
          <div class="two"></div>
          <div class="three"></div>
          <div class="four"></div>
          <div class="five"></div>
    </div>
  </div>
</template>