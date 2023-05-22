<script setup lang="ts">

import Selection from "~/components/Shared/Input/Selection.vue";
import Textarea from "~/components/Shared/Input/Textarea.vue";
import Collapse from "~/components/Shared/Collapse/Collapse.vue";

import {useCategoriesStore} from "~/store/shared/CategoriesStore";

const categories = computed(() => useCategoriesStore().getCategories);

definePageMeta({
  name: "add-test",
  layout: 'dashboard',
  middleware: ['is-auth']
});
import PreviewLoadImg from "~/components/Shared/Input/PreviewLoadImg.vue";
import {computed} from "@vue/reactivity";

const data = reactive({
  img: <string>'',
  category: <number | null>null,
  title: <string>'',
  textarea: <string>'',
});
</script>

<template>
  <div class="container">
    <Collapse :label-svg="'label-setting'">
      <template v-slot:Title>
        Общие настройки
      </template>
      <template v-slot:content>
        <PreviewLoadImg v-model="data.img"/>
      </template>
    </Collapse>
    <!--    <PreviewLoadImg v-model="data.img"/>-->

    <!--  <Selection-->
    <!--      :svg-is-label="true"-->
    <!--      :name="'category-test'"-->
    <!--      :list="categories"-->
    <!--      placeholder="Chose a category"-->
    <!--  />-->
    <!--  <div class="pt-sm-15"></div>-->
    <!--  <Textarea v-model="data.textarea" placeholder="щписание теста"/>-->
  </div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";
@import "@/assets/css/components/parts/buttons/cycle-radius-btn";
@import "@/assets/css/components/parts/inputs/image-thumbnail-uploader";
@import "@/assets/css/components/parts/inputs/textarea";
@import "@/assets/css/components/parts/modals/cropper-modal";
@import "@/assets/css/components/parts/modals/chose-upload-images-modal";
@import "@/assets/css/components/parts/inputs/select-svg-label";
@import "@/assets/css/components/parts/collapse/collapse";
@import 'vue-advanced-cropper/dist/style.css';
@import 'vue-advanced-cropper/dist/theme.compact.css';


</style>