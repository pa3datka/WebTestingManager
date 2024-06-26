<script setup lang="ts">
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";
import {onMounted, PropType} from "@vue/runtime-core";
import {computed} from "@vue/reactivity";
import {ITestSetting} from "~/composables/Interfaces/TestInterfaces/ITestSetting";
import {Ref} from "vue";

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Number,
    default: null
  },
  name: {
    type: String,
    default: 'default'
  },
  placeholder: {
    type: String,
    default: ''
  },
  isLabel: {
    type: Boolean,
    default: false
  },
  svgIsLabel: {
    type: Boolean,
    default: false
  },
  list: {
    type: Array as PropType<ITestSetting[]>,
    default: []
  },
  selected: {
    type: Object as PropType<ITestSetting>,
    default: {}
  },
  id: {
    type: String,
    default: 'id-chose-category'
  }
});

const selectedRef = <Ref>ref(null);
const data = reactive({
  isLabel: <boolean>true,
  selected: <ITestSetting>{},
  beforeColorClass: <string>'',
  searchString: <string>'',
});

const searchList = computed((): ITestSetting[] => {
  if (!data.searchString) {
    return props.list;
  }

  return props.list.filter((item: any): ITestSetting[] => item.name.toLowerCase().includes(data.searchString.toLowerCase()));
});

const selected = computed(() => {
  return <ITestSetting>data.selected
});


const selectItem = (itemId: number): void => {
  data.beforeColorClass = data.selected?.color + '-bg';
  data.selected = <ITestSetting>props.list?.find((item: any) => Number(item.id) === Number(itemId));
  selectedRef.value.classList.remove('select-focus');

  selectedRef.value.querySelector('input').classList.add('d-none');
  selectedRef.value.querySelector('.selected-value').classList.add('d-block');
  data.searchString = '';
  emit('update:modelValue', itemId);
};


onMounted(() => {
  if (props.selected) {
    data.selected = <ITestSetting>props.selected;
    emit('update:modelValue', data.selected.id);
  }

  const select = <Element>document.querySelector('#select-id-' + props.name);
  const selected = <Element>select.querySelector('.input-wrapper');
  const eventFunction = (e: Event): void => {
    if (select.classList.contains('select-focus')) {
      !e.composedPath().includes(<EventTarget>select)
      && select.classList.remove('select-focus')
    }
  };

  selected && selected.addEventListener('click', (): void => {
    const input = select.querySelector('input');
    input && input.focus();
    select.classList.add('select-focus');
  });

  selected && window.addEventListener('click', (e: Event) => {
    eventFunction(e);
  });

  selected && window.addEventListener('touchstart', (e: Event) => {
    eventFunction(e);
  });
});
</script>

<template>
  <div class="custom-select hover">
    <div class="custom-select__label" v-if="props.isLabel">Вид:</div>
    <div class="select" :ref="(el: any) => selectedRef = el" :id="'select-id-' + props.name">

      <div class="input-wrapper">
        <SvgTemplate
            :name="data.selected?.svg ? data.selected?.svg : 'select_list'"
            v-if="props.svgIsLabel"
            :class="(data.selected?.color ? `${data.selected?.color}-stroke` : 'grey-stroke')"/>
        <input class="hover" type="text" :id="props.id" v-model="data.searchString"
               :placeholder="(selected?.name ?? props.placeholder)">
        <div class="selected-value d-none">
          {{ selected.name }}
        </div>
      </div>

      <menu class="section-list scroll">
        <li
            v-for="(item, key) in searchList"
            :key="key"
            @click="selectItem(item.id)"
        >
          <div class="section-list-item">
            <SvgTemplate v-if="props.svgIsLabel && item?.svg" :name="item?.svg" :class="`${item.color}-bg`"/>
            <div>{{ item.name }}</div>
          </div>
          <div class="selected-value-item"
               :class="{'selected-value-item-active': item && data.selected.id === item?.id}"></div>
        </li>
      </menu>

    </div>
  </div>
</template>