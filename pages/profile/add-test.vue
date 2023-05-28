<script setup lang="ts">
import ButtonSaveGroup from "~/components/CreateTest/parts/ButtonSaveGroup.vue";
import Collapse from "~/components/Shared/Collapse/Collapse.vue";

import Selection from "~/components/Shared/Input/Selection.vue";
import Textarea from "~/components/Shared/Input/Textarea.vue";

import AuthInput from "~/components/Shared/Input/AuthInput.vue";
import SelectionBorderless from "~/components/Shared/Input/SelectionBorderless.vue";
import LabelForInputBorderless from "~/components/Shared/LabelForInputBorderless.vue";
import InputBorderless from "~/components/Shared/Input/InputBorderless.vue";
import Switch from "~/components/Shared/Input/Switch.vue";
import ButtonNumberQuest from "~/components/Shared/Button/ButtonNumberQuest.vue";
import ButtonCycleLabelSvg from "~/components/Shared/Button/ButtonCycleLabelSvg.vue";
import PreviewLoadImg from "~/components/Shared/Input/PreviewLoadImg.vue";
import SelectionTypeQuest from "~/components/CreateTest/SelectionTypeQuest.vue";
import ListTypeQuest from "~/components/CreateTest/ListTypeQuest.vue";
import InputNumber from "~/components/Shared/Input/InputNumber.vue";
import CheckBoxTextOrSvg from "~/components/Shared/CheckBox/CheckBoxTextOrSvg.vue";
import ButtonMin from "~/components/Shared/Button/ButtonMin.vue";
import InputTextEditor from "~/components/Shared/Input/InputTextEditor.vue";
import InputImage from "~/components/Shared/Input/InputImage.vue";

import { ITypeSelection } from "~/composables/Interfaces/ComponentIntefaces/ITypeSelection";
import { ISelectionBorderless } from "~/composables/Interfaces/ComponentIntefaces/ISelectionBorderless";

import { useCategoriesStore } from "~/store/shared/CategoriesStore";
import { computed } from "@vue/reactivity";


const categories = computed(() => useCategoriesStore().getCategories);

definePageMeta({
  name: "add-test",
  layout: 'dashboard',
  middleware: ['is-auth']
});

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

  typeAnswer: <number> 1,
  quest: <string> '',
  questPints: <number> 0,
  answer: <string> '',
  checkbox: <boolean> false,

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
  ],

  activeQuest: 1,
  questsBtn: [
    { active: true, id: 1, value: '1', activeValue: 'quest' },

  ],

  questTypes: <ITypeSelection[]> [
    { id: 1, name: 'text', description: 'Select one or more answers' },
    { id: 2, name: 'picture', description: 'Select one or more pictures' },
    { id: 3, name: 'Sequence (text)', description: 'Specify the sequence of answers' },
    { id: 4, name: 'Sequence (pictures)', description: 'Specify the sequence of answers' },
    { id: 5, name: 'Fill in the gaps', description: 'Insert missing characters or words' },
  ],
});

const addQuest = () => {
  let lastItemId = <number> data.questsBtn.length - 1;
  const newQuest = { id: data.questsBtn[lastItemId].id + 1, value: String((data.questsBtn[lastItemId].id + 1)), activeValue: 'quest', active: true };
  data.questsBtn.map((quest, index) => {
    data.questsBtn[index].active = false;
  });
  data.questsBtn.push( newQuest );
}
const activeButton = (val: any) => {
  data.questsBtn.map((quest, index) => {
    data.questsBtn[index].active = false;
    if (quest.id === val.id) {
      data.questsBtn[index].active = val.active;
    }

  });
  console.log(val);
};
const deleteQuest = () => {
  data.questsBtn.map((quest, index) => {
    if (quest.active) {
      console.log(index)
      data.questsBtn.splice(index, 1);
    }
  });
}
</script>

<template>
  <div class="container page-add-test">
    <div class="page-title">
      <div class="page-title__text">Тест 18.08.2022 – черновик</div>
      <ButtonSaveGroup />
    </div>
    <Collapse :label-svg="'label-setting'">
      <template v-slot:Title>
        General settings
      </template>
      <template v-slot:content>
        <div class="content-collapse collapse-container d-grid grid-columns-1-sm grid-columns-2-1-lg column-gap-lg-20 row-gap-sm-24">
          <div class="d-flex column-gap-sm-24 column-gap-lg-32 flex-wrap-sm flex-no-wrap-md justify-content-center-ms row-gap-sm-24">
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

    <Collapse class="mt-sm-20" :label-svg="'label-edit'">
      <template v-slot:Title>
        Question editor
      </template>
      <template v-slot:content>
        <div class="collapse-container pb-sm-25 pt-sm-25 pb-lg-40 pt-lg-40 d-flex flex-no-wrap-sm justify-space-between column-gap-sm-15 column-gap-lg-20">
          <div class="quest-buttons-container d-flex column-gap-sm-8 column-gap-lg-12 row-gap-sm-8 row-gap-lg-12 flex-wrap-sm">

            <ButtonNumberQuest
                v-for="btn in data.questsBtn"
                :key="btn.id"
                v-on:active="activeButton"
                :is-active="btn.active"
                :value="btn.value"
                :active-value="btn.activeValue"
                :id="btn.id"
            />
            <ButtonNumberQuest
                :is-active="false"
                :value="'+'"
                @click="addQuest"
            />
          </div>
          <div class="">
            <ButtonCycleLabelSvg v-show="data.questsBtn.length > 1" value="Delete quest" class="button-cycle-label-svg-min hover-error" @click="deleteQuest">
              <template v-slot:label>
                <SvgTemplate name="delete"/>
              </template>
            </ButtonCycleLabelSvg>
          </div>
        </div>

        <div class="quest-container">
          <div class="answer-types-container">
              <div class="answer-types-title">Question Format</div>

              <div class="desktop-answer-types">
                <ListTypeQuest v-model="data.typeAnswer" :list="data.questTypes" :selected-id="data.typeAnswer"/>
              </div>

              <div class="mobile-type-container">
                <SelectionTypeQuest v-model="data.typeAnswer" :list="data.questTypes" :selected-id="data.typeAnswer"/>
              </div>
            </div>

          <div class="collapse-container quest-builder pb-sm-32 pb-lg-48">
            <div class="quest-builder__quest">
              <div class="title pb-sm-24">Quest</div>
              <InputImage class="mt-sm-24"/>
              <Textarea class="mt-sm-14" v-model="data.quest" :name="'quest'" :placeholder="'Enter quest'" />
              <InputNumber class="mt-sm-14" v-model="data.questPints" name="quest-point" placeholder="Enter count points"/>

              <div class="title pt-sm-24 pb-sm-24">Answers</div>
              <div class="quest-option">
                <AuthInput v-model="data.answer" name="answer" placeholder="Option"/>

                <div class="btn-group">
                  <CheckBoxTextOrSvg class="" v-model="data.checkbox" :id="'asnwer'" name="answer-check"/>

                  <div class="btn-add-delete">
                    <ButtonMin class="hover button-active-success" text="+" />
                    <ButtonMin class="hover button-active-warning" text="-" />
                  </div>
                </div>
              </div>
              <div class="title pt-sm-24">Explanation</div>
              <InputTextEditor class="mt-sm-20" />
            </div>
          </div>
        </div>
      </template>

    </Collapse>
  </div>
</template>

<style lang="scss">
//components
@import "@/assets/css/variables.scss";
@import "@/assets/css/components/parts/buttons/button-cycle-svg";
@import "@/assets/css/components/parts/collapse/collapse";
@import "~/assets/css/components/parts/inputs/upload-image-container";
@import "@/assets/css/components/parts/modals/chose-upload-images-modal";
@import "@/assets/css/components/parts/modals/cropper-modal";
@import "@/assets/css/components/parts/inputs/select-svg-label";
@import "@/assets/css/components/parts/inputs/textarea";
@import '@/assets/css/components/parts/inputs/input-borderless';
@import 'vue-advanced-cropper/dist/style.css';
@import 'vue-advanced-cropper/dist/theme.compact.css';
@import "@/assets/css/components/parts/buttons/cycle-radius-btn";
@import "@/assets/css/components/parts/buttons/button-cycle-label-svg";
@import '@/assets/css/components/parts/inputs/auth-input';
@import '@/assets/css/components/parts/inputs/switch';
@import '@/assets/css/components/parts/label-for-input-border-less';
@import '@/assets/css/components/parts/inputs/selection-type-quest';
@import '@/assets/css/components/parts/lists/list-type-quest';
@import "@/assets/css/components/parts/inputs/input-text-editor";

//page style
@import "@/assets/css/components/pages/add-test-page";
</style>