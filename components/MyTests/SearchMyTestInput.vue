<script setup lang="ts">

const emit = defineEmits(['searchString']);
const data = reactive({
  string: ''
});
const search = () => {
  emit('searchString', data.string)
};

onMounted(() => {
  const input = <EventTarget> document.querySelector('.search-input');
  input && input.focus();
});
</script>

<template>
  <form class="search-input-group" @submit.prevent="search">
    <button type="submit" class="search-btn hover" @click.prevent="search">
      <SvgTemplate name="search-field" />
    </button>
    <input class="search-input" type="text" v-model="data.string" placeholder="Search tests for title">
  </form>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";

.search-input-group {
  width: 100%;
  height: 100%;
  padding-left: rem-calc(24);
  padding-right: rem-calc(24);
  display: flex;
  .search-input {
    width: 100%;
    height: 100%;
    font-size: $font15;
    &::placeholder {
      font-size: $font15;
      color: $color-grey-suit;
      font-style: italic;
    }
  }

  .search-btn {
    border: none;
    background: none;
    svg {
      stroke: $color-grey-suit;
    }
  }
}
</style>