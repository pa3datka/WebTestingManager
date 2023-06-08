<script setup lang="ts">
import ButtonSaveGroup from "~/components/CreateTest/parts/ButtonSaveGroup.vue";
import Collapse from "~/components/Shared/Collapse/Collapse.vue";

import Selection from "~/components/Shared/Input/Selection.vue";
import Textarea from "~/components/Shared/Input/Textarea.vue";
import AuthInput from "~/components/Shared/Input/AuthInput.vue";

import PreviewLoadImg from "~/components/Shared/Input/PreviewLoadImg.vue";
import LabelForInputBorderless from "~/components/Shared/LabelForInputBorderless.vue";
import SelectionBorderless from "~/components/Shared/Input/SelectionBorderless.vue";
import InputBorderless from "~/components/Shared/Input/InputBorderless.vue";
import Switch from "~/components/Shared/Input/Switch.vue";



import ButtonNumberQuest from "~/components/Shared/Button/ButtonNumberQuest.vue";
import ButtonCycleLabelSvg from "~/components/Shared/Button/ButtonCycleLabelSvg.vue";

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
import {ITestSettings} from "~/composables/Interfaces/TestInterfaces/ITestSettings";
import { useTest } from "~/composables/test/useTest";
import { useTestStore} from "~/store/shared/Test";
import {ITestQuestion} from "~/composables/Interfaces/TestInterfaces/ITestQuestion";
import {IQuestionAnswer} from "~/composables/Interfaces/TestInterfaces/IQuestionAnswer";
import { useValidation } from "~/composables/shared/useValidation";

const { validate, rules } = useValidation();

const difficultyTypes = computed(() => useTestStore().getDifficultyTypes);
const displayAnswerTypes = computed(() => useTestStore().getDisplayAnswerTypes);
const evaluationTypes = computed(() => useTestStore().getEvaluationTypes);
const categories = computed(() => useTestStore().getCategories);
const questTypes = computed(() => useTestStore().getQuestTypes);

const { updateTestConfigs } = useTestStore();

const refsFields = <Ref> ref({});
definePageMeta({
  name: "add-test",
  layout: 'dashboard',
  middleware: ['is-auth']
});
await useTest().fetchTestSettings();


const data = reactive({
  settings: <ITestSettings> {
    shuffle_answers: false
  },
  questsBtn: [
    { active: true, id: 1, activeValue: 'quest', is_errors: false },
  ],
  questions: <ITestQuestion[]> [
    {
      id: 1,
      type_id: 1,
      is_errors: false,
      check_is_correct: true,
      answers: [
        {
          id: 1,
          is_correct: false,
          is_errors: false,
        }
      ]
    },
  ],

  typeAnswer: <number> 1,
  quest: <string> '',
  questPints: <number> 0,
  answer: <string> '',

  activeQuest: 1,

});

watchEffect(() => {
 if (toRefs(data.settings)) {
   updateTestConfigs(data.settings);
 }
});

const addQuest = () => {
  const validate = validateQuest();
  if (!validate) {
    return;
  }
  data.questsBtn.map((quest, index) => {
    data.questsBtn[index].active = false;
  });
  data.questsBtn.push(getBtn());
  data.questions.push(getNewQuest())
}
const activeButton = (val: any) => {
  data.questsBtn.map((quest, index) => {
    data.questsBtn[index].active = false;
    if (quest.id === val.id) {
      data.questsBtn[index].active = val.active;
    }
  });
};

const activeQuestId = computed(() => {
  let activeId = 0;
  data.questsBtn.forEach((el) => el.active && (activeId = el.id));
  return activeId;
});
const deleteQuest = () => {
  data.questsBtn.forEach((quest, index) => {
    if (quest.active) {
      data.questsBtn.splice(index, 1);
      data.questions.splice(index, 1);
    }
  });
  data.questsBtn[data.questsBtn.length -1].active = true;
};

const getBtn = () => {
  let btn = { active: true, id: 1, activeValue: 'quest', is_errors: false };
  const lastBtn = data.questsBtn[data.questsBtn.length -1];
  btn.id = (lastBtn.id + 1);
  return btn;
};

const getNewQuest = (): ITestQuestion =>  {
  const lastTest = <ITestQuestion> data.questions[data.questions.length -1];
  return <ITestQuestion> {
    id: (lastTest.id + 1),
    type_id: lastTest.type_id,
    check_is_correct: true,
    answers: [
        {
          id: 1,
          is_correct: false,
          is_errors: false,
        }
    ]
  };
};

const addAnswer = (questId: number, answerId: number) => {
  const quest = <ITestQuestion> data.questions.find(quest => quest.id === questId);
  const lastAnswer = <IQuestionAnswer> quest.answers[quest.answers.length -1];
  quest.answers.push({ id: (lastAnswer.id + 1), is_correct: false, is_errors: false });
};

const deleteAnswer = (questId: number, answerIndex: number, inputName: string, elemName: string) => {
  const quest = <ITestQuestion> data.questions.find(quest => quest.id === questId);
  quest.answers.splice(answerIndex, 1);
  const elem = <Element> document.querySelector(`#${elemName}`);
  elem.remove();
  refsFields.value[inputName].delete();

  //delete refsFields.value[inputName];
 console.log(refsFields.value)


};

const validateQuest = () => {
  let isValidate = true;
  data.questions.map((quest, index) => {
    if (quest.type_id === 1) {
      if (!quest.question || !quest.countPoints) {
        data.questsBtn[index].is_errors = true;
        quest.is_errors = true;
        isValidate = false;
      }
      const checkBox = checkIsAnswer(quest);
      const isCountAnswers = checkCountAnswers(quest);
      isValidate = (isValidate && checkBox && isCountAnswers);
      isValidate && (data.questsBtn[index].is_errors = false);
    }
  });

  const valid = validate(refsFields);
  return (isValidate && valid);
}

const checkIsAnswer = (quest: ITestQuestion): boolean => {
  let isCheck = false;
  quest.answers.forEach(answer => answer.is_correct && (isCheck = true));
  !isCheck && (quest.check_is_correct = false);
  isCheck && (quest.check_is_correct = true);

  return isCheck;
}

const checkCountAnswers = (quest: ITestQuestion) => {
  let isCheck = quest.answers.length > 1;
  let isSuccessLenchAnswers = (quest.answers.length > 1);
  const answer = <IQuestionAnswer> quest.answers.find(answer => answer);
  !isSuccessLenchAnswers && (answer.error_text = 'there must be more than one option');
  isSuccessLenchAnswers && (answer.error_text = '');

  return isCheck;
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
            <PreviewLoadImg v-model="data.settings.image"/>

            <div class="W-100 max-width-lg-455" >
              <Selection
                  :svg-is-label="true"
                  :name="'category-test'"
                  :list="categories"
                  placeholder="Chose a category"
                  v-model="data.settings.categoryId"
              />

              <AuthInput
                  class="mt-sm-14 mt-lg-16"
                  placeholder="Enter plees test name"
                  name="testname"
                  v-model="data.settings.title"
              />

              <Textarea
                  class="mt-sm-14 mt-lg-16 h-ms-120 h-md-166 h-lg-194"
                  v-model="data.settings.description"
                  placeholder="Описание теста"
              />
            </div>
          </div>
          <div class="W-100">
            <LabelForInputBorderless label="Attempts">
              <template v-slot:input>
                <InputBorderless v-model="data.settings.attempts" name="attempts" placeholder="Unlimited" numberType="integer" type="number"/>
              </template>
            </LabelForInputBorderless>
            <LabelForInputBorderless label="Assessment format">
              <template v-slot:input>
                <SelectionBorderless v-model="data.settings.evaluation_type_id" :list="evaluationTypes" :selected="evaluationTypes[0]" name="evaluation-types"/>
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Difficulty level">
              <template v-slot:input>
                <SelectionBorderless v-model="data.settings.difficultyId" :list="difficultyTypes" :selected="difficultyTypes[0]" name="difficulty-types"/>
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Travel time (sec)">
              <template v-slot:input>
                <InputBorderless v-model="data.settings.time" name="attempts" placeholder="Unlimited" numberType="integer" type="number"/>
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Display Answer Results">
              <template v-slot:input>
                <SelectionBorderless v-model="data.settings.display_answer_type_id" name="answers" :list="displayAnswerTypes" :selected="displayAnswerTypes[0]"/>
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Cheating Prevention">
              <template v-slot:input>
                <InputBorderless v-model="data.settings.cheating_prevention" name="cheating" placeholder="" numberType="integer" type="number"/>
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Shuffle Answers" :is-border-bottom="false">
              <template v-slot:input>
                <Switch v-model="data.settings.shuffle_answers"/>
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
                v-for="(btn, key) in data.questsBtn"
                :key="btn.id"
                v-on:active="activeButton"
                :is-active="btn.active"
                :value="String(key + 1)"
                :active-value="btn.activeValue"
                :id="btn.id"
                :class="{'quest-errors': btn.is_errors, 'success-new-answer': !btn.active && !btn.is_errors }"
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
          <div>

          </div>
          <div class="quest-container" v-for="quest in data.questions" :key="quest.id" v-show="quest.id === activeQuestId">
            <div class="answer-types-container">
              <div class="answer-types-title">Question Format</div>

              <div class="desktop-answer-types">
                <ListTypeQuest v-model="quest.type_id" :list="questTypes" :selected-id="quest.type_id"/>
              </div>

              <div class="mobile-type-container">
                <SelectionTypeQuest v-model="quest.type_id" :list="questTypes" :selected-id="quest.type_id"/>
              </div>
            </div>

            <div class="collapse-container quest-builder pb-sm-32 pb-lg-48">
              <div class="quest-builder__quest">
                <div class="title pb-sm-24">Quest</div>
                <InputImage class="mt-sm-24" v-model="quest.image"/>
                <Textarea
                    class="mt-sm-14"
                    :ref="el => refsFields[el?.name] = el"
                    :rules="[rules.require]"
                    v-model="quest.question"
                    :name="`quest${quest.id}`"
                    :placeholder="'Enter quest'"
                />
                <InputNumber
                    class="mt-sm-14"
                    :name="`quest-point-${quest.id}`"
                    v-show="data.settings.evaluation_type_id === 1"
                    :ref="el => refsFields[el?.name] = el"
                    :rules="[rules.require]"
                    v-model="quest.countPoints"
                    :id="`${quest.id}`"
                    placeholder="Enter count points"
                />

                <div class="title pt-sm-24 pb-sm-24">Answers</div>

                <div class="quest-option" v-for="(answer, index) in quest.answers" :key="answer.id" :class="{'pt-sm-10': index > 0}" :id="`quest-option${answer.id}`">
                  <AuthInput
                      v-model="answer.answer_text"
                      :name="`answer-${answer.id}`"
                      placeholder="Option"
                      :ref="el => refsFields[el?.name] = el"
                      :rules="[rules.require]"
                      :error="answer.error_text"
                      :errorValue="answer.error_text"
                  />
                  <div class="btn-group">
                    <CheckBoxTextOrSvg
                        v-model="answer.is_correct"
                        :id="`asnwer-${quest.id}-${answer.id}`"
                        @click="checkIsAnswer(quest)"
                        name="answer-check"
                        :class="{ 'input-checkbox-error': !quest.check_is_correct }"/>
                    <div class="btn-add-delete">
                      <ButtonMin class="hover button-active-success" @click="addAnswer(quest.id, answer.id) && checkCountAnswers(quest)" text="+" />
                      <ButtonMin class="hover button-active-warning" v-if="quest.answers.length > 1" @click="deleteAnswer(quest.id, index, `answer-${answer.id}`, `quest-option${answer.id}`)" text="-" />
                    </div>
                  </div>
                </div>

                <div class="title pt-sm-24">Explanation</div>
                <InputTextEditor v-model="quest.explanation" class="mt-sm-20" />
              </div>
            </div>
          </div>

      </template>

    </Collapse>
    {{data.questions}}
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