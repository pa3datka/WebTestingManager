<script setup lang="ts">
import Selection from "~/components/Shared/Input/Selection.vue";
import {computed} from "@vue/reactivity";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['choseImage']);

const data = reactive({
  imageSize: <number> 1
});

const categories = [
  {id: 1, name: 'mathematics', svg: 'home', color: 'strong-cyan'},
  {id: 2, name: 'history', svg: 'home', color: 'light-grayish-red'},
  {id: 3, name: 'language', svg: 'home', color: 'soft-navy'},
  {id: 4, name: 'geometry', svg: 'home', color: 'bright-red'},
  {id: 5, name: 'physics', svg: 'home', color: 'primary'}
];

const sizes = [
  {id: 1, name: 'small'},
  {id: 2, name: 'medium'},
  {id: 3, name: 'large'},
];


const size = computed(() => sizes.find(size => size.id === data.imageSize));

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
          />

          <Selection
              :name="'image-size'"
              :list="sizes"
              :is-label="true"
              v-model="data.imageSize"
              :selected="sizes[2]"
          />
        </div>
        <div class="chose-modal-content  scroll">
          <div class="category">
            <div class="category-title">Language</div>
            <div
                class="category-list"
                :class="`img-${size.name}`"
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