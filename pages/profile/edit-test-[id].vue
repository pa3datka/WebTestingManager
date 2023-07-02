<script setup lang="ts">
import {ITest} from "~/composables/Interfaces/TestInterfaces/Response/ITest";

definePageMeta({
  name: "edit-test",
  layout: 'dashboard',
  middleware: ['is-auth']
});

import {useRoute} from "nuxt/app";
import {useTest} from "~/composables/test/useTest";
import {ITestSettings} from "~/composables/Interfaces/TestInterfaces/ITestSettings";
import {IQuestion} from "~/composables/Interfaces/TestInterfaces/IQuestion";

const {fetchEditTest} = useTest();
const route = useRoute();
const data = reactive({
  testSettings: <ITestSettings> {},
  questions: <IQuestion[]> [],
});

onMounted(async () => {
 const result = await fetchEditTest(route.params.id);
});

</script>

<template>

</template>

<style scoped lang="scss">

</style>