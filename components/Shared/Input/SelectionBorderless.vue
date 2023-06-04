<script setup lang="ts">
import {ISelectionBorderless} from "~/composables/Interfaces/ComponentIntefaces/ISelectionBorderless";
import {PropType} from "@vue/runtime-core";
import {ITestSetting} from "~/composables/Interfaces/TestInterfaces/ITestSetting";

const props = defineProps({
  selected: {
    type: Object as PropType<ITestSetting>,
    default: {}
  },
  modelValue: {
    type: Number,
    default: null
  },
  list: {
    type: Array as PropType<ITestSetting[]>,
    default: []
  },
  name: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const data = reactive({
  selected: <ITestSetting>{},
  isShowOptions: <boolean> false,
})

onMounted(() => {
  if (!Object.keys(data.selected).length) {
    data.selected = <ITestSetting>props.selected;
    emit('update:modelValue', data.selected.id);
  }

  const select = document.querySelector('#id-' + props.name);
  const eventFunction = (e: Event): void => {
    if (select) {
      const menu = select.querySelector('.election-borderless__list')
      if (menu && menu.classList.contains('show-options')) {
        !e.composedPath().includes(<EventTarget> select)
        && show();
      }
    }

  };

  select && window.addEventListener('click', (e: Event) => {
    eventFunction(e);
  });

  select && window.addEventListener('touchstart', (e: Event) => {
    eventFunction(e);
  });
});

const toggleItem = (id: number): void => {
  show();
  data.selected = <ITestSetting> props.list?.find(item => item.id === id)
  emit('update:modelValue', id);
};

const show = (): void => {
  data.isShowOptions = !data.isShowOptions;
};
</script>

<template>
  <div class="selection-borderless hover" :id="'id-' + props.name">
    <div class="selection-borderless__selected"  @click="show">
      <div>{{ data.selected.name }}</div>
    </div>
    <menu class="election-borderless__list" :class="{'show-options': data.isShowOptions}">
      <li v-for="item in props.list" :key="item.id"  @click="toggleItem(item.id)">
        {{ item.name }}
      </li>
    </menu>
  </div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";
.selection-borderless {
  position: relative;
  height: 100%;
  width: 100%;


  .selection-borderless__selected {
    color: #262342;
    font-size: $font13;
    display: flex;
    align-items: center;
    column-gap: rem-calc(24);
    text-transform: capitalize;
    padding-left: 20px;

    &:after {
      content: '';
      background-image: url("/assets/img/svg/polygon-up.svg");
      background-position: center center;
      background-repeat: no-repeat;
      height: rem-calc(5);
      width: rem-calc(7);
      transform: rotate(180deg);
      opacity: .6;
    }
  }

  .election-borderless__list {
    display: none;
    position: absolute;
    z-index: 2;
    width: auto;
    padding-top: rem-calc(8);
    padding-bottom: rem-calc(8);
    background: #FFFFFF;
    box-shadow: 1px 1px 16px rgba(44, 100, 220, 0.13);
    border-radius: 4px;

     li {
       text-transform: capitalize;
       padding: rem-calc((8, 20, 8, 20));

       &:hover {
         cursor: pointer;
         background: $color-gray-emerald-bg;
       }
     }
  }

  .show-options {
    display: block!important;
  }

}

@media (min-width: rem-calc(992)) {
  .selection-borderless {

    .selection-borderless__selected {
      font-size: $font15;
    }

    .election-borderless__list {
    }

  }
}

</style>