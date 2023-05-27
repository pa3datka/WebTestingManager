<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {ITypeSelection} from "~/composables/Interfaces/ComponentIntefaces/ITypeSelection";
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

const select = (id: number): void => {
  emit('update:modelValue', id);
}

</script>

<template>
  <menu class="list-type-quest">
    <li
        v-for="(item, key) in props.list"
        :key="item.id"
        class="item hover"
        :class="{'item-active': item.id === props.selectedId}"
        @click="select(item.id)"
    >
      <div class="item-cycle">
        <div class="item-cycle_center"></div>
      </div>
      <div class="type-wrapper">
        <div class="type_type">{{ item.name }}</div>
        <div class="type_description">{{ item.description }}</div>
      </div>
    </li>
  </menu>
</template>