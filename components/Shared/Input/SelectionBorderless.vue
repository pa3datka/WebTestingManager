<script setup lang="ts">
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
      const menu = select.querySelector('.selection-borderless__list')
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
    <menu class="selection-borderless__list" :class="{'show-options': data.isShowOptions}">
      <li v-for="item in props.list" :key="item.id"  @click="toggleItem(item.id)">
        {{ item.name }}
      </li>
    </menu>
  </div>
</template>

