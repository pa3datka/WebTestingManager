<script setup lang="ts">

import Selection from "~/components/Shared/Input/Selection.vue";
import Textarea from "~/components/Shared/Input/Textarea.vue";
import Collapse from "~/components/Shared/Collapse/Collapse.vue";
import AuthInput from "~/components/Shared/Input/AuthInput.vue";
import SelectionBorderless from "~/components/Shared/Input/SelectionBorderless.vue";
import LabelForInputBorderless from "~/components/Shared/LabelForInputBorderless.vue";
import InputBorderless from "~/components/Shared/Input/InputBorderless.vue";
import Switch from "~/components/Shared/Input/Switch.vue";

import {useCategoriesStore} from "~/store/shared/CategoriesStore";

const categories = computed(() => useCategoriesStore().getCategories);

definePageMeta({
  name: "add-test",
  layout: 'dashboard',
  middleware: ['is-auth']
});
import PreviewLoadImg from "~/components/Shared/Input/PreviewLoadImg.vue";
import {computed} from "@vue/reactivity";
import {ISelectionBorderless} from "~/composables/Interfaces/ComponentIntefaces/ISelectionBorderless";

const data = reactive({
  img: <string> '',
  category: <number> 0,
  title: <string> '',
  textarea: <string> '',
  testname: <string> '',
  attempts: <number|string> '',
  typeAssessment: <number> 0,
  level: <number> 0,
  time: <number|string> '',
  showAnswers: <number> 0,
  cheating: <number|string> '',
  shuffleAnswers: <boolean> false,

  typeAssessmentArr:  <ISelectionBorderless[]> [
      { id: 1, name: 'points'},
      { id: 2, name: 'percent'}
    ],
  levels: <ISelectionBorderless[]> [
    { id: 1, name: 'beginner' },
    { id: 2, name: 'intermediate' },
    { id: 3, name: 'advanced' },
    { id: 4, name: 'expert' },
    { id: 5, name: 'master' },
  ],
  typeShowAnswers: <ISelectionBorderless[]> [
    { id: 1, name: 'show immediately'},
    { id: 2, name: 'show after completion'},
    { id: 3, name: 'never show'},
  ]
});

</script>

<template>
  <div class="container">
    <Collapse :label-svg="'label-setting'">
      <template v-slot:Title>
        Общие настройки
      </template>
      <template v-slot:content>
        <div class="d-grid grid-columns-1-sm grid-columns-2-1-lg column-gap-lg-20 row-gap-sm-24">
          <div class="d-flex column-gap-sm-24 column-gap-lg-32 flex-wrap-sm justify-content-center-ms row-gap-sm-24">
            <PreviewLoadImg v-model="data.img"/>

            <div class="W-100 max-width-lg-455" >
              <Selection
                  :svg-is-label="true"
                  :name="'category-test'"
                  :list="categories"
                  placeholder="Chose a category"
                  v-model="data.category"
              />

              <AuthInput
                  class="mt-sm-14 mt-lg-16"
                  placeholder="Enter plees test name"
                  name="testname"
                  v-model="data.testname"
              />

              <Textarea
                  class="mt-sm-14 mt-lg-16 h-ms-120 h-md-166 h-lg-194"
                  v-model="data.textarea"
                  placeholder="Описание теста"
              />

            </div>
          </div>
          <div class="W-100">
            <LabelForInputBorderless label="Attempts">
              <template v-slot:input>
                <InputBorderless v-model="data.attempts" name="attempts" placeholder="Unlimited" numberType="integer" type="number"/>
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Assessment format">
              <template v-slot:input>
                <SelectionBorderless v-model="data.typeAssessment" :list="data.typeAssessmentArr" :selected="data.typeAssessmentArr[0]"/>
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Difficulty level">
              <template v-slot:input>
                <SelectionBorderless v-model="data.typeAssessment" name="levels" :list="data.levels" :selected="data.levels[0]"/>
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Travel time (sec)">
              <template v-slot:input>
                <InputBorderless v-model="data.time" name="attempts" placeholder="Unlimited" numberType="integer" type="number"/>
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Display Answer Results">
              <template v-slot:input>
                <SelectionBorderless v-model="data.showAnswers" name="answers" :list="data.typeShowAnswers" :selected="data.typeShowAnswers[0]"/>
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Cheating Prevention">
              <template v-slot:input>
                <InputBorderless v-model="data.cheating" name="cheating" placeholder="" numberType="integer" type="number"/>
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Shuffle Answers" :is-border-bottom="false">
              <template v-slot:input>
                <Switch v-model="data.shuffleAnswers"/>
              </template>
            </LabelForInputBorderless>

          </div>
        </div>
      </template>

    </Collapse>
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
@import '@/assets/css/components/parts/inputs/auth-input';
@import '@/assets/css/components/parts/inputs/input-borderless';
@import '@/assets/css/components/parts/inputs/switch';
@import '@/assets/css/components/parts/label-for-input-border-less';

</style>