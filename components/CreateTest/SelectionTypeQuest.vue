<script setup lang="ts">
import {ITypeSelection} from "~/composables/Interfaces/ComponentIntefaces/ITypeSelection";
import {onUnmounted, onMounted, PropType} from "@vue/runtime-core";
import {computed} from "@vue/reactivity";

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  list: {
    type: Array as PropType<ITypeSelection[]>,
    default: []
  },
  selectedId: {
    type: Number,
    default: 1
  }
});

const data = reactive({
  isShow: false,
});

function clickEvent(e: Event) {
  const menu = document.querySelector('.options');
    if (menu && menu.classList.contains('show-options')) {
      !e.composedPath().includes(<EventTarget> document.querySelector('.selection-type-quest'))
      && show();
    }
};

onMounted(() => {
  const menu = document.querySelector('.options');
  menu && window.addEventListener('click', clickEvent);
});

onUnmounted(() => {
  window.removeEventListener('click', clickEvent);
});

const selectedItem = computed(() => <ITypeSelection> props.list.find((item: ITypeSelection) => item.id === props.selectedId));

const select = (id: number): void => {
  emit('update:modelValue', id);
}

const show = (): void => {
  data.isShow = !data.isShow;
}
</script>

<template>
<div class="selection-type-quest" @click="show">

  <div class="selected hover" >
    <div class="value">{{ selectedItem.name }}</div>
    <div class="description">{{ selectedItem.description }}</div>
  </div>

  <menu class="options" :class="{'show-options': data.isShow}">
    <li
        class="option hover"
        v-for="(item, key) in props.list"
        :key="key"
        :class="{'active-option': props.selectedId === item.id}"
        @click="select(item.id)"
        >
      <div class="option_value">
        <div class="option_value">{{ item.name }}</div>
        <div class="option_description">{{ item.description }}</div>
      </div>
      <div class="marker-cycle"></div>
    </li>
  </menu>

</div>
</template>