<script setup lang="ts">
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";
import {onMounted} from "@vue/runtime-core";
import {computed} from "@vue/reactivity";

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
    type: Array,
    default: []
  },
  selected: {
    type: Object,
    default: {}
  }
});
const selectedRef = <Ref> ref(null);
const data = reactive({
  isLabel: true,
  selected: {},
  beforeColorClass: <string> '',
  searchString: <string> '',
});

const selectItem = (itemId: number) => {
  data.beforeColorClass = data.selected?.color + '-bg';
  data.selected = <object> props.list?.find(item => Number(item.id) === Number(itemId));
  selectedRef.value.classList.remove('select-focus');

  selectedRef.value.querySelector('input').classList.add('d-none');
  selectedRef.value.querySelector('.selected-value').classList.add('d-block');
  emit('update:modelValue', itemId);
};



onMounted(() => {
  if (props.selected) {
    data.selected = props.selected;
  }


  const select = <Element> document.querySelector('#select-id-'+ props.name);
  const selected = <Element> select.querySelector('.input-wrapper');
  console.log(props.name, selected)

  selected && selected.addEventListener('click', () => {
    select.querySelector('input').focus();
    select.classList.add('select-focus');
    console.log(props.name, selected)
  });

  selected && window.addEventListener('click', (e) => {
    if (select.classList.contains('select-focus')) {
      !e.composedPath().includes(<EventTarget> select)
      && select.classList.remove('select-focus')
    }
  });

  selected && window.addEventListener('touchstart', (e) => {
    if (select.classList.contains('select-focus')) {
      !e.composedPath().includes(<EventTarget> select)
      && select.classList.remove('select-focus')
    }
  });

});

const searchList = computed(() => {
  if (!data.searchString) {
    return props.list;
  }

  return props.list.filter(item => item.name.includes(data.searchString));
});

</script>

<template>
  <div class="custom-select hover">
    <div class="custom-select__label" v-if="props.isLabel">Вид:</div>
    <div class="select" :ref="(el: any) => selectedRef = el" :id="'select-id-' + props.name">
      <div class="input-wrapper">
        <SvgTemplate :name="data.selected?.svg ? data.selected?.svg : 'select_list'" v-if="props.svgIsLabel" :class="(data.selected?.color ? `${data.selected?.color}-stroke` : 'grey-stroke')"/>
        <input  class="hover" type="text" v-model="data.searchString" placeholder="Выберите картинку">
        <div class="selected-value d-none">
          {{ data.selected.name }}
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
          <div class="selected-value-item" :class="{'selected-value-item-active': data.selected.id === item.id}"></div>
        </li>
      </menu>
    </div>

  </div>
</template>