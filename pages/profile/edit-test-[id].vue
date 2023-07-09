<script setup lang="ts">
import {useRoute, useRouter} from "nuxt/app";
import {useTest} from "~/composables/test/useTest";
import ThisCreateOrEditTest from "~/components/Shared/ThisCreateOrEditTest.vue";
import {IQuestionTest} from "~/composables/Interfaces/TestInterfaces/IQuestionTest";
import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";
import {useAlertStore} from "~/store/shared/Alert";
import {ALERT_SUCCESS} from "~/store/constants/alertConst";

definePageMeta({
  name: "edit-test",
  layout: 'dashboard',
  middleware: ['is-auth']
});

const {fetchEditTest, prepareTest, updateTest} = useTest();
const route = useRoute();
const router = useRouter();
const data = reactive({
  testSettings: <ITest> {},
  questions: <IQuestionTest[]|[]> [],
  isLoad: false,
});

onMounted(async () => {
 const result = await fetchEditTest(route.params.id);
 data.questions = <IQuestionTest[]> result.questions;
 delete result.questions;
 data.testSettings = <ITest> result
});

const update = async (payload: any) => {
  const test = <ITest> await prepareTest(payload.settings, payload.questions)
   const result = await updateTest(test);
  if (result?.status) {
    useAlertStore().setInfo({ type: ALERT_SUCCESS, message: ['Success edit test'] });
    router.push({ name: 'my-tests' });
    return;
  }
  data.isLoad = false;
}

</script>

<template>
  <ThisCreateOrEditTest
      v-if="Object.keys(data.testSettings).length"
      :settings="data.testSettings"
      :questions="data.questions"
      v-on:save="update"
      :isLoad="data.isLoad"
  />
</template>