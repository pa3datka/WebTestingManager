<script setup lang="ts">
import Selection from "~/components/Shared/Input/Selection.vue";
import { computed } from "@vue/reactivity";
import { ISelection } from "~/composables/Interfaces/ComponentIntefaces/ISelection";
import { onUnmounted, onMounted } from "@vue/runtime-core";
import {IChoseCategoryImages} from "~/composables/Interfaces/TestInterfaces/IChoseCategoryImages";
import {useTestStore} from "~/store/shared/Test";
import {ITestSetting} from "~/composables/Interfaces/TestInterfaces/ITestSetting";

const emit = defineEmits(['choseImage']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const baseUrl = useRuntimeConfig().public.imageApiUrl;
const images = computed(() => useTestStore().getChoseImages);
const categories =  computed((): ITestSetting[] => Object.values(useTestStore().getChoseImages).reduce((current, item: any) => {
  let img = <ITestSetting> item.find(img => img);
  current.push(img);
  return current;
}, []));
const data = reactive({
  imageSizeSelectedId: <number> 1,
  categories: <object> {},
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
          <div class="category" v-for="(categoryImages, key) in images" :key="key">
            <div class="category-title">{{ key }}</div>
            <div
                class="category-list"
                :class="`img-${sizes[imageSizeId].name}`"
            >
              <div
                  class="category-list_item hover"
                  v-for="(image, imageKey) in categoryImages" :key="imageKey"
                  @click="choseImage(baseUrl + image.path)"
              >
                <img :src="baseUrl + image.path">
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>