<script setup lang="ts">
import {hideOnClickMenu} from "~/composables/shared/HideOnClickMenu";
import Burger from "~/components/Header/parts/header/Burger.vue";

const data = reactive({
    isShow: false
});

const showMenu = () => {
    data.isShow = !data.isShow;
}

onMounted(() => {
    hideOnClickMenu().hideMenu('laptop-menu', 'laptop-menu-list', 'laptop-menu-list-show', showMenu);
});
</script>

<template>
  <div class="laptop-menu">
      <div class="burger-container hover" @click="showMenu()">
          <div class="burger">
              <svg
                  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="21px"
                  height="16px"
                  class="svg-btn"
                  :class="{'burger-active': data.isShow}">
                  <path class="first-line" fill-rule="evenodd" fill="#292D32" d="M-0.000,-0.000 L21.000,-0.000 L21.000,2.000 L-0.000,2.000 L-0.000,-0.000 Z"/>
                  <path class="center-line" fill-rule="evenodd" fill="#292D32" d="M-0.000,7.000 L21.000,7.000 L21.000,9.000 L-0.000,9.000 L-0.000,7.000 Z"/>
                  <path class="last-line" fill-rule="evenodd" fill="#292D32" d="M-0.000,14.000 L21.000,14.000 L21.000,16.000 L-0.000,16.000 L-0.000,14.000 Z"/>
              </svg>
          </div>
      </div>

      <menu
          class="laptop-menu-list"
          :class="{'laptop-menu-list-show': data.isShow}"
      >
          <li class="laptop-menu-list-item hover"><nuxt-link to="/about">ABOUT US</nuxt-link></li>
          <li class="laptop-menu-list-item hover"><nuxt-link to="/faq">FAC</nuxt-link></li>
          <li class="laptop-menu-list-item hover"><nuxt-link to="/tests">TESTS</nuxt-link></li>
          <li class="laptop-menu-list-item hover"><nuxt-link to="/contact">CONTUCT US</nuxt-link></li>
      </menu>
  </div>
</template>