<script setup lang="ts">
import ThisCreateOrEditTest from "@/components/Shared/ThisCreateOrEditTest.vue";

import {reactive} from "@vue/reactivity";
import {useTest} from "@/composables/test/useTest";
import {useAlertStore} from "@/store/shared/Alert";
import {useRouter} from "nuxt/app";
import {ALERT_SUCCESS} from '@/store/constants/alertConst';
import {ITest} from "@/composables/Interfaces/TestInterfaces/ITest";

definePageMeta({
  name: "add-test",
  layout: 'dashboard',
  middleware: ['is-auth']
});

const router = useRouter();
const {prepareTest, createTest} = useTest();
const data = reactive({
  isLoad: false,
});

const create = async (payload: any) => {
  const test = <ITest> await prepareTest(payload.settings, payload.questions)
  const result = await createTest(test);
  if (result?.status) {
    useAlertStore().setInfo({ type: ALERT_SUCCESS, message: ['Success created test'] });
    router.push({ name: 'my-tests' });
  }
  data.isLoad = false;
}
</script>

<template>
  <ThisCreateOrEditTest v-on:save="create" :isLoad="data.isLoad" />
</template>