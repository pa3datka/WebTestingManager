<script setup lang="ts">

import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";

definePageMeta({
  name: "edit-test",
  layout: 'dashboard',
  middleware: ['is-auth']
});

import {useRoute, useRouter} from "nuxt/app";
import {useTest} from "~/composables/test/useTest";
import ThisCreateOrEditTest from "~/components/Shared/ThisCreateOrEditTest.vue";
import {IQuestionTest} from "~/composables/Interfaces/TestInterfaces/IQuestionTest";

const {fetchEditTest, prepareTest, updateTest} = useTest();
const route = useRoute();
const router = useRouter();
const data = reactive({
  testSettings: {},
  questions: [],
});

onMounted(async () => {
 const result = await fetchEditTest(route.params.id);
 data.questions = <IQuestionTest> result.questions;
 delete result.questions;
 data.testSettings = <ITest> result
  console.log('data.questions', data.questions)
});

const update = async (payload) => {

  const test = <ITest> await prepareTest(payload.settings, payload.questions)
   const result = await updateTest(test);
  if (result.status) {
    router.push({ name: 'my-tests' });
    return;
  }
}

</script>

<template>
  <ThisCreateOrEditTest
      v-if="Object.keys(data.testSettings).length"
      :settings="data.testSettings"
      :questions="data.questions"
      v-on:save="update"
  />
</template>