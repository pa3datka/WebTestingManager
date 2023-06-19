<script setup lang="ts">
import {useStringHelpers} from "~/composables/shared/useStringHelpers";
import {useTest} from "~/composables/test/useTest";

const {fetchTestsBySearchString} = useTest();
const { dotsString } = useStringHelpers();
const emit = defineEmits(['searchString']);
const searchString = ref('')
const data = reactive({
  isSearch: <boolean> false,
  testsSearching: [],
});
const search = async (search: string) => {
  if (data.isSearch || !search.length) {
    return;
  }
  data.isSearch = true;
  data.testsSearching = await fetchTestsBySearchString(search);
  data.isSearch = false;
};



watch(searchString, (newString, oldString) => {
  search(newString);
})

onMounted(() => {
  const input = <EventTarget> document.querySelector('.search-input');
  input && input.focus();

  const menuList = document.querySelector('.search-input-group');
  menuList && window.addEventListener('click', (e) => {
    !e.composedPath().includes(<EventTarget>document.querySelector('.search-input-group')) && (data.testsSearching = []);
  });
});
</script>

<template>
  <form class="search-input-group" >
    <button type="submit" class="search-btn hover">
      <SvgTemplate name="search-field" />
    </button>
    <input class="search-input" type="text" v-model="searchString" placeholder="Search tests for title">

    <menu class="search-results scroll" v-show="data.isSearch || data.testsSearching.length">
      <div style="position: relative" v-if="data.isSearch">
        <div class="loading button--loading"></div>
      </div>
      <li class="hover" v-for="item in data.testsSearching" :key="item.id">
        <img :src="`https://devapi.testing-manager.local/storage/${item.img_path}`" alt="">
        <div class="search-item-title">{{dotsString(72, item.title)}}</div>
      </li>
    </menu>
  </form>
</template>