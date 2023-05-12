<script setup lang="ts">

const data = reactive({
    isShow: false
});

const showMenu = () => {
    data.isShow = !data.isShow;
}
</script>

<template>
  <div class="laptop-menu">
      <div class="burger-container hover" @click="showMenu()">
          <div class="burger">
              <div class="burger-center-line"></div>
              <div class="burger-center-line"></div>
              <div class="burger-center-line"></div>
          </div>
      </div>

      <menu
          class="laptop-menu-list"
          :class="{'laptop-menu-list-show': data.isShow}"
      >
          <li class="laptop-menu-list-item hover">Item 1</li>
          <li class="laptop-menu-list-item hover">Item 2</li>
          <li class="laptop-menu-list-item hover">Item 3</li>
          <li class="laptop-menu-list-item hover">Item 3</li>
      </menu>
  </div>
</template>

<style scoped>
.laptop-menu {
    position: relative;
    height: 30px;
    width: 30px;
    padding: 8px 4px;

    .burger-container {
        .burger {
            height: 14px;
            width: 21px;
            display: grid;
            grid-template-columns: 1fr;
            row-gap: 5.3px;

            .burger-center-line {
                height: 1px;
                width: 100%;
                background-color: #292D32;
            }
        }
    }

    .laptop-menu-list-show {
        max-height: 180px!important;
    }

    .laptop-menu-list {
        max-height: 0;
        overflow: hidden;
        position: absolute;
        top: 42px;
        width: 246px;
        background-color: #FFFFFF;
        list-style: none;
        box-shadow: 4px 8px 16px rgba(44, 100, 220, 0.12);
        border-radius: 8px;
        transition: max-height 0.20s ease-in-out;

        .laptop-menu-list-item:first-child {
            margin-top: 18px;
        }
        .laptop-menu-list-item:last-child {
            margin-bottom: 18px;
        }
        .laptop-menu-list-item {
            padding: 9px 24px;
            &:hover {
                background-color: #F3F4FD;
            }
        }
    }
}
</style>