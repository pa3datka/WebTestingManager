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