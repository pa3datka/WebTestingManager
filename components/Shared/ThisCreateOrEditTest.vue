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
import ButtonCycle from "~/components/Shared/Button/ButtonCycleSvg.vue";
import SvgTemplate from "~/components/Svg/SvgTemplate.vue";

import {computed, reactive, ref} from "@vue/reactivity";
import {useTest} from "~/composables/test/useTest";
import {useTestStore} from "~/store/shared/Test";
import {useValidation} from "~/composables/shared/useValidation";
import {useRouter} from "nuxt/app";
import {Ref, toRefs, watchEffect} from "vue";
import {IQuestionTest} from "~/composables/Interfaces/TestInterfaces/IQuestionTest";
import {IAnswerTest} from "~/composables/Interfaces/TestInterfaces/IAnswerTest";
import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";
import {PropType} from "@vue/runtime-core";

const {rules, validateInput} = useValidation();
const { createTest } = useTestStore();
const router = useRouter();

const difficultyTypes = computed(() => useTestStore().getDifficultyTypes);
const displayAnswerTypes = computed(() => useTestStore().getDisplayAnswerTypes);
const evaluationTypes = computed(() => useTestStore().getEvaluationTypes);
const categories = computed(() => useTestStore().getCategories);
const questTypes = computed(() => useTestStore().getQuestTypes);

const refsFields = <Ref>ref({});
const emit = defineEmits(['save']);
const props = defineProps({
  settings: {
    type: Object as PropType<ITest|null>,
    default: null
  },
  questions: {
    type: Object as PropType<IQuestionTest[]|null>,
    default: null
  }
});


const data = reactive({
  settings: <ITest> {
    shuffle_answers: false
  },
  questsBtn: [
    {active: true, id: 1, activeValue: 'quest', is_errors: false},
  ],
  questions: <IQuestionTest[]> [
    {
      id: 1,
      type_id: 1,
      is_errors: false,
      check_is_correct: true,
      img_path: '',
      answers: [
        {
          id: 1,
          is_correct: false,
          is_errors: false,
        }
      ]
    },
  ],
  isTestImage: true,
  isCategoryIdError: true,

  activeQuest: 1,
  isLoad: false
});

if (props.settings && props.questions) {
  data.settings = props.settings;
  data.questions = props.questions;

  data.questsBtn = [];
  const lengthQuestions = (data.questions.length - 1);
  data.questions.map(quest => quest.check_is_correct = true);
  data.questions.forEach((quest, index) => {
    let active = false;
    lengthQuestions === index && (active = true);
    data.questsBtn.push({active: active, id: quest.id, activeValue: 'quest', is_errors: false});

  });
}

const getAnswerName = (questId: number, answerId: number): string => `answer-${questId}-${answerId}`;

!difficultyTypes.value.length && await useTest().fetchTestSettings();

watchEffect(() => {
  if (toRefs(data.settings)) {
    data.settings.category_id && (data.isCategoryIdError = true);
    data.settings.img_path && (data.isTestImage = true);
  }
});

const addQuest = () => {
  if (!validateQuestions()) {
    return;
  }

  data.questsBtn.map((quest, index) => data.questsBtn[index].active = false);
  data.questsBtn.push(getBtn());
  data.questions.push(getNewQuest());
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
  data.questsBtn[data.questsBtn.length - 1].active = true;
};

const getBtn = () => {
  let btn = {active: true, id: 1, activeValue: 'question', is_errors: false};
  const lastBtn = data.questsBtn[data.questsBtn.length - 1];
  btn.id = (lastBtn.id + 1);
  return btn;
};

const getNewQuest = (): IQuestionTest => {
  const lastTest = <IQuestionTest>data.questions[data.questions.length - 1];
  return <IQuestionTest>{
    id: (lastTest.id + 1),
    type_id: lastTest.type_id,
    check_is_correct: true,
    new: true,
    answers: [{ id: 1, is_correct: false, is_errors: false, new: true }]
  };
};

const addAnswer = (question: IQuestionTest): void => {
  const quest = <IQuestionTest> data.questions.find(quest => quest.id === question.id);
  const lastAnswer = <IAnswerTest> quest.answers[quest.answers.length - 1];
  const answerRef = refsFields.value[getAnswerName(quest.id, lastAnswer.id)];

  if (validateInput(answerRef)) {
    const newAnswer = <IAnswerTest> {
      id: (lastAnswer.id + 1),
      answer_text: '',
      answer_img: '',
      is_correct: false,
      sequence: null,
      is_errors: false,
      new: true,
    }
    quest.answers.push(newAnswer);
    isCountAnswers(question);
  }
};

const deleteAnswer = (questId: number, answerIndex: number, inputName: string, elemName: string): void => {
  const quest = <IQuestionTest>data.questions.find(quest => quest.id === questId);
  quest.answers.splice(answerIndex, 1);
  const elem = <Element>document.querySelector(`#${elemName}`);
  elem.remove();
};

const validateQuestions = (): boolean => {
  let isValid = true;
  data.questions.map(quest => {
    let result = validateQuest(quest);
    !result && (isValid = false);
  });

  return isValid;
};

const validateQuest = (quest: IQuestionTest): boolean => {
  const successAnswer = <boolean> isSuccessAnswer(quest);
  const answerFields = <boolean> isAnswerFields(quest);
  const countAnswers = <boolean> isCountAnswers(quest);
  const questFields = <boolean> isQuestFields(quest);

  quest.is_errors = !(countAnswers && successAnswer && answerFields && questFields);
  const btn = data.questsBtn.find(btn => btn.id === quest.id);
  btn && (btn.is_errors = quest.is_errors);

  return (countAnswers && successAnswer && answerFields && questFields);
}

const isCountAnswers = (quest: IQuestionTest): boolean => {
  const isCount = <boolean>(quest.answers?.length > 1);
  !isCount && (refsFields.value[getAnswerName(quest.id, quest.answers[quest.answers?.length - 1].id)].errorMessage += ', minimum number of answers 2');
  isCount && quest.answers?.forEach((answer: IAnswerTest): void => {
    const refAnswer = refsFields.value[getAnswerName(quest.id, answer.id)];
    refAnswer && refAnswer.errorMessage.replace(', minimum number of answers 2', '');
  });

  return isCount;
};

const isSuccessAnswer = (quest: IQuestionTest): boolean => {
  let isSuccess = false;
  quest.answers.forEach((answer: IAnswerTest) => answer.is_correct && (isSuccess = true));

  !isSuccess && (quest.check_is_correct = false);
  isSuccess && (quest.check_is_correct = true);

  return isSuccess;
};

const isAnswerFields = (quest: IQuestionTest): boolean => {
  let isValid = true;
  quest.answers.forEach(answer => {
    const result = validateInput(refsFields.value[getAnswerName(quest.id, answer.id)]);
    !result && (isValid = false);
  });

  return isValid;
};

const isQuestFields = (quest: IQuestionTest): boolean => {
  let arrFields = [];
  let isValid = true;
  if (1 === quest.type_id) {
    arrFields.push(refsFields.value[`question-${quest.id}`]);
    1 === data.settings.evaluation_id && arrFields.push(refsFields.value[`question-points-${quest.id}`]);
  }

  arrFields.forEach(field => {
    !validateInput(field) && (isValid = false);
  });

  return isValid;
};

const validateTestOptions = (): boolean => {
  let isValid = true;
  if (!data.settings.img_path) {
    data.isTestImage = false;
    isValid = false;
  }
  !validateInput(refsFields.value['test-title']) && (isValid = false);
  !validateInput(refsFields.value['test-description']) && (isValid = false);

  if (!data.settings.category_id) {
    data.isCategoryIdError = false;
    isValid = false;
  }

  return isValid;
};

const saveTest = async () => {
  data.isLoad = true;
  if (!validateTestOptions() || !validateQuestions()) {
    data.isLoad = false;
    return;
  }
  emit('save', {settings: data.settings, questions: data.questions})

};
</script>

<template>
  <div class="container page-add-test">
    <div class="page-title">
      <div class="page-title__text">Test – draft</div>
      <ButtonSaveGroup>
        <template v-slot:btn-one>
          <ButtonCycle class="button-active-info cotton-ball-bg" text="View">
            <template v-slot:svg>
              <SvgTemplate name="password"/>
            </template>
          </ButtonCycle>
        </template>
        <template v-slot:btn-two>
          <ButtonCycle
              class="button-active-info cotton-ball-bg"
              :class="{'button--loading primary-bg': data.isLoad}"
              @click="saveTest" text="Save"
              :disabled="data.isLoad"
          >
            <template v-slot:svg>
              <SvgTemplate name="export"/>
            </template>
          </ButtonCycle>
        </template>
      </ButtonSaveGroup>
    </div>
    <Collapse :label-svg="'label-setting'">
      <template v-slot:Title>
        General settings
      </template>
      <template v-slot:content>
        <div
            class="content-collapse collapse-container d-grid grid-columns-1-sm grid-columns-2-1-lg column-gap-lg-20 row-gap-sm-24">
          <div
              class="d-flex column-gap-sm-24 column-gap-lg-32 flex-wrap-sm flex-no-wrap-md justify-content-center-ms row-gap-sm-24">
            <PreviewLoadImg
                :classes="!data.isTestImage ? 'input-image-thumbnail-error' : ''"
                v-model="data.settings.img_path"
            />

            <div class="W-100 max-width-lg-455">
              <Selection
                  :class="!data.isCategoryIdError ? 'custom-select-error' : ''"
                  :svg-is-label="true"
                  :name="'category-test'"
                  :list="categories"
                  placeholder="Chose a category"
                  v-model="data.settings.category_id"
                  :selected="categories.find(cat => cat.id === data.settings.category_id)"
              />

              <AuthInput
                  class="mt-sm-14 mt-lg-16"
                  placeholder="Enter test name"
                  name="test-title"
                  :ref="el => refsFields['test-title'] = el"
                  :rules="[rules.require, rules.maxStringLength100]"
                  v-model="data.settings.title"
              />

              <Textarea
                  class="mt-sm-14 mt-lg-16 h-ms-120 h-md-166 h-lg-194"
                  v-model="data.settings.description"
                  :ref="el => refsFields['test-description'] = el"
                  :rules="[rules.require, rules.maxStringLength1000]"
                  placeholder="Описание теста"
              />
            </div>
          </div>
          <div class="W-100">
            <LabelForInputBorderless label="Attempts">
              <template v-slot:input>
                <InputBorderless
                    v-model="data.settings.attempts"
                    name="attempts"
                    placeholder="Unlimited"
                    numberType="integer"
                    type="number"
                />
              </template>
            </LabelForInputBorderless>
            <LabelForInputBorderless label="Assessment format">
              <template v-slot:input>
                <SelectionBorderless
                    v-model="data.settings.evaluation_id"
                    :list="evaluationTypes"
                    :selected="evaluationTypes[data.settings?.evaluation_id ? data.settings?.evaluation_id - 1 : 0 ]"
                    name="evaluation-types"
                />
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Difficulty level">
              <template v-slot:input>
                <SelectionBorderless
                    v-model="data.settings.difficulty_id"
                    :list="difficultyTypes"
                    :selected="difficultyTypes[data.settings?.difficulty_id ? data.settings.difficulty_id - 1 : 0]"
                    name="difficulty-types"
                />
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Travel time (sec)">
              <template v-slot:input>
                <InputBorderless
                    v-model="data.settings.time"
                    name="Travel-time"
                    placeholder="Unlimited"
                    numberType="integer"
                    type="number"
                />
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Display Answer Results">
              <template v-slot:input>
                <SelectionBorderless
                    v-model="data.settings.display_answer_id"
                    name="answers"
                    :list="displayAnswerTypes"
                    :selected="displayAnswerTypes[data.settings?.display_answer_id ? data.settings.display_answer_id - 1 : 0]"
                />
              </template>
            </LabelForInputBorderless>

            <LabelForInputBorderless label="Cheating Prevention">
              <template v-slot:input>
                <InputBorderless
                    v-model="data.settings.cheating_prevention"
                    name="cheating"
                    placeholder=""
                    numberType="integer"
                    type="number"
                />
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
        <div
            class="collapse-container pb-sm-25 pt-sm-25 pb-lg-40 pt-lg-40 d-flex flex-no-wrap-sm justify-space-between column-gap-sm-15 column-gap-lg-20">
          <div
              class="quest-buttons-container d-flex column-gap-sm-8 column-gap-lg-12 row-gap-sm-8 row-gap-lg-12 flex-wrap-sm">

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
            <ButtonCycleLabelSvg
                v-show="data.questsBtn.length > 1"
                value="Delete quest"
                class="button-cycle-label-svg-min hover-error"
                @click="deleteQuest"
            >
              <template v-slot:label>
                <SvgTemplate name="delete"/>
              </template>
            </ButtonCycleLabelSvg>
          </div>
        </div>

        <div
            class="quest-container"
            v-for="quest in data.questions"
            :key="quest.id"
            v-show="quest.id === activeQuestId"
        >
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
              <InputImage class="mt-sm-24" v-model="quest.img_path"/>
              <Textarea
                  class="mt-sm-14"
                  :ref="(el: any) => refsFields[el?.name] = el"
                  :rules="[rules.require, rules.maxStringLength1000]"
                  v-model="quest.question"
                  :name="`question-${quest.id}`"
                  :placeholder="'Enter quest'"
              />
              <InputNumber
                  class="mt-sm-14"
                  :name="`question-points-${quest.id}`"
                  v-if="data.settings.evaluation_id === 1"
                  :ref="(el: any) => refsFields[el?.name] = el"
                  :rules="[rules.require, rules.maxNumber10000]"
                  v-model="quest.count_points"
                  :id="`${quest.id}`"
                  placeholder="Enter count points"
              />

              <div class="title pt-sm-24 pb-sm-24">Answers</div>

              <div
                  class="quest-option"
                  v-for="(answer, index) in quest.answers"
                  :key="answer.id"
                  :class="{'pt-sm-10': index > 0}"
                  :id="`quest-option${answer.id}`"
              >
                <AuthInput
                    v-model="answer.answer_text"
                    :name="getAnswerName(quest.id, answer.id)"
                    placeholder="Option"
                    :ref="(el: any) => refsFields[el?.name] = el"
                    :rules="[rules.require, rules.maxStringLength250]"
                    :error="(answer?.error_text ?? '')"
                    :errorValue="answer.error_text"
                />
                <div class="btn-group">
                  <CheckBoxTextOrSvg
                      v-model="answer.is_correct"
                      :id="`asnwer-${quest.id}-${answer.id}`"
                      name="answer-check"
                      @click="isSuccessAnswer(quest)"
                      :class="{ 'input-checkbox-error': !quest.check_is_correct }"/>
                  <div class="btn-add-delete">
                    <ButtonMin class="hover button-active-success button-hover-success"
                               @click="addAnswer(quest)" text="+"
                               v-show="(quest.answers.length - 1) === index"/>

                    <ButtonMin class="hover button-active-warning button-hover-warning"
                               v-if="quest.answers.length > 1"
                               @click="deleteAnswer(quest.id, index, `answer-${answer.id}`, `quest-option${answer.id}`)"
                               text="-"
                    />
                  </div>
                </div>
              </div>

              <div class="title pt-sm-24">Explanation</div>
              <InputTextEditor v-model="quest.explanation" class="mt-sm-20"/>
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
@import "@/assets/css/components/parts/buttons/button-min";
@import "@/assets/css/components/parts/buttons/cycle-radius-btn";
@import "@/assets/css/components/parts/buttons/button-cycle-label-svg";
@import "@/assets/css/components/parts/buttons/button-number-quest";
@import "@/assets/css/components/parts/collapse/collapse";
@import "@/assets/css/components/parts/modals/chose-upload-images-modal";
@import "@/assets/css/components/parts/modals/cropper-modal";
@import '@/assets/css/components/parts/label-for-input-border-less';
@import 'vue-advanced-cropper/dist/style.css';
@import 'vue-advanced-cropper/dist/theme.compact.css';
@import "@/assets/css/components/parts/inputs/upload-image-container";
@import '@/assets/css/components/parts/inputs/input-border-less';
@import "@/assets/css/components/parts/inputs/select-svg-label";
@import "@/assets/css/components/parts/inputs/textarea";
@import '@/assets/css/components/parts/inputs/input-universal';
@import '@/assets/css/components/parts/inputs/switch';
@import '@/assets/css/components/parts/inputs/input-image';
@import '@/assets/css/components/parts/inputs/input-number';
@import "@/assets/css/components/parts/inputs/input-text-editor";
@import '@/assets/css/components/parts/checkbox/checkbox-text-or-svg';
@import '@/assets/css/components/parts/selections/selection-border-less';
@import '@/assets/css/components/parts/selections/selection-type-quest';
@import '@/assets/css/components/parts/lists/list-type-quest';
@import '@/assets/css/components/parts/animations';

//page style
@import "@/assets/css/components/pages/add-test-page";
</style>