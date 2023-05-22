<script setup lang="ts">
import Selection from "~/components/Shared/Input/Selection.vue";
import { computed } from "@vue/reactivity";
import { ISelection } from "~/composables/Interfaces/ComponentIntefaces/ISelection";
import { onUnmounted, onMounted } from "@vue/runtime-core";

const emit = defineEmits(['choseImage']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const data = reactive({
  imageSizeSelectedId: <number> 1
});

const categories = <ISelection[]> [
  {id: 1, name: 'mathematics', svg: 'home', color: 'strong-cyan'},
  {id: 2, name: 'history', svg: 'home', color: 'light-grayish-red'},
  {id: 3, name: 'language', svg: 'home', color: 'soft-navy'},
  {id: 4, name: 'geometry', svg: 'home', color: 'bright-red'},
  {id: 5, name: 'physics', svg: 'home', color: 'primary'}
];
const sizes = <ISelection[]> [
  {id: 0, name: 'small'},
  {id: 1, name: 'medium'},
  {id: 2, name: 'large'},
];


const imageSizeId = computed( {
  get: (): number => {
    return data.imageSizeSelectedId;
  },
  set: (val: number) => {
    localStorage.setItem('chose_size_id', String(val));
    data.imageSizeSelectedId = val;
  }
});


onMounted(() => {
  imageSizeId.value = Number(localStorage.getItem('chose_size_id') ?? 1);
  const body = document.querySelector('body');
  body && (body.style.overflow = 'hidden');
});

onUnmounted(() => {
  const body = document.querySelector('body');
  body && (body.style.overflow = '');
});

const choseImage = (path: string) => {
  emit('choseImage', path);
}
</script>

<template>
  <div class="chose-image-container">
    <div class="chose-background"></div>
    <div class="chose-modal-container">
      <div class="chose-image-modal">
        <div class="chose-modal-header">
          <div class="chose-modal-header__title">Chose a cover</div>
          <slot name="close"></slot>
        </div>

        <div class="chose-modal-action">
          <Selection
              :svg-is-label="true"
              :name="'categories'"
              :list="categories"
              placeholder="Chose a category"
          />

          <client-only>
            <Selection
                :name="'image-size'"
                :list="sizes"
                :is-label="true"
                v-model="imageSizeId"
                :selected="sizes[imageSizeId]"
            />
          </client-only>
        </div>

        <div class="chose-modal-content  scroll">
          <div class="category">
            <div class="category-title">Language</div>
            <div
                class="category-list"
                :class="`img-${sizes[imageSizeId].name}`"
            >
              <div
                  class="category-list_item"
                  v-for="(item, key) in 100"
                  @click="choseImage('/image-test-category.jpg')"
              >
                <img src="/image-test-category.jpg">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>