<script setup lang="ts">
definePageMeta({
  name: "add-test",
  layout: 'dashboard',
  middleware: ['is-auth']
});

import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";
import {useRouter} from "nuxt/app";
import {useTest} from "~/composables/test/useTest";
import ThisCreateOrEditTest from "~/components/Shared/ThisCreateOrEditTest.vue";

const router = useRouter();
const {prepareTest, createTest} = useTest();

const create = async (payload) => {
  const test = <ITest> await prepareTest(payload.settings, payload.questions)
  const result = await createTest(test);
  if (result.status) {
    router.push({ name: 'my-tests' });
    return;
  }
}
</script>

<template>
  <ThisCreateOrEditTest v-on:save="create"/>
</template>