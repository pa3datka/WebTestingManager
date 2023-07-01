<script setup lang="ts">
import Selection from "~/components/Shared/Input/Selection.vue";
import { computed } from "@vue/reactivity";
import { ISelection } from "~/composables/Interfaces/ComponentIntefaces/ISelection";
import { onUnmounted, onMounted } from "@vue/runtime-core";
import { useTestStore } from "~/store/shared/Test";
import { ITestSetting } from "~/composables/Interfaces/TestInterfaces/ITestSetting";
import {IChoseImage} from "~/composables/Interfaces/TestInterfaces/IChoseImage";

const emit = defineEmits(['choseImage']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const images = computed(() => {
  const categoryImages = <IChoseImage[]> useTestStore().getChoseImages.filter((image: any) => {
    if (!data.selectedCategoryId) {
      return image;
    }

    if (data.selectedCategoryId === image?.id) {
      return image;
    }
  });
  interface IN  {
    [identifier: string]: IChoseImage[];
  }
  return  categoryImages.reduce((current: IN, image) => {
    !current[image.name] && (current[image.name] = <IChoseImage[]> []);
    current[image.name].push(image);
    return current;
  }, {});
});

const categories =  computed((): ITestSetting[] => useTestStore().getChoseImages.reduce((current, item) => {
  const isIssetCategory = current.filter((img: any) => img.id === item?.id);
  if (!isIssetCategory.length) {
    current.push(item);
  }
  return current;
}, <ITestSetting[]> []));
const data = reactive({
  imageSizeSelectedId: <number> 1,
  categories: <object> {},
  selectedCategoryId: <number> 0,
  baseUrl: <string> useRuntimeConfig().public.imageApiUrl
});

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


onMounted(async () => {
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
              v-model="data.selectedCategoryId"
              :id="'id-modal-chose-category'"
          />

          <client-only>
            <Selection
                :name="'image-size'"
                :list="sizes"
                :is-label="true"
                v-model="imageSizeId"
                :selected="sizes[imageSizeId]"
                :id="'id-select-size'"
            />
          </client-only>
        </div>

        <div class="chose-modal-content  scroll">
          <div class="category" v-for="(categoryImages, key) in images" :key="key">
            <div class="category-title">{{ key }}</div>
            <div
                class="category-list"
                :class="`img-${sizes[imageSizeId].name}`"
            >
              <div
                  class="category-list_item hover"
                  v-for="(image, imageKey) in categoryImages" :key="imageKey"
                  @click="choseImage(`${data.baseUrl}${image.path}`)"
              >
                <img :src="`${data.baseUrl}${image.path}`">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>