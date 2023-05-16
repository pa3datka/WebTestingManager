<script setup lang="ts">
import {hideOnClickMenu} from "~/composables/shared/HideOnClickMenu";

interface ILangs {
    [key: string]: string;
};

const langs = <ILangs> {
    'ua': 'Українська',
    'ru': 'Русский',
    'pl': 'Polski',
    'by': 'Беларускі',
    'de': 'Deutsch',
    'en': 'English',
    'fr': 'Français',
    'it': 'Italiano',
    'es': 'Español',
};

const data = reactive({
    isShowList:<boolean> false,
    activeLang:<string> 'en'
});
const showList = () => {
    data.isShowList = !data.isShowList;
};

const changeLang = (lang: string) => {
    data.activeLang = lang;
    showList();
};

onMounted(() => {
    hideOnClickMenu().hideMenu('languages', 'lang-list', 'lang-list-show', showList);
});
</script>

<template>
  <div class="languages">
      <div class="selected-lang d-flex align-items-center" @click="showList">
          <div :class="'lang-head-img-' + data.activeLang"></div>
          <div class="lang-text">{{ langs[data.activeLang] }}</div>
      </div>

      <menu
          :class="{'lang-list-show': data.isShowList}"
          class="lang-list"
      >
          <li
              class="lang-item d-flex align-items-center justify-space-between"
              :class="'lang-list__item-' + key"
              v-for="(lang, key) in langs"
              :key="key"
              @click="changeLang(String(key))"
          >
              <div>{{ lang }}</div>
          </li>
      </menu>
  </div>
</template>