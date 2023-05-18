<script setup lang="ts">
import AuthForm from "~/components/Shared/Form/AuthForm.vue";

import { useAuth } from "~/composables/auth/useAuth";
import {useRouter, useRoute } from "nuxt/app";

const { verifiedEmail } = useAuth();
const router = useRouter();
const route = useRoute();

const data = reactive({
    result: false
});
const verified = async () => {
    //const res = await verifiedEmail(String(route.params.token));

    data.result = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            resolve(await verifiedEmail(String(route.params.token)));
        }, 1000);
    });

    if (data.result) {
        await new Promise((resolve, reject) => {
            setTimeout(async () => {
                resolve(true);
            }, 2000);

        });
        return router.push({name: 'profile'});

    } else {
        return router.push('/error-404');
    }

};

onMounted(async () => {
    await verified();
})

definePageMeta({
    name: "verified-email",
});
</script>

<template>
  <div class="container">
      <AuthForm>
          <template v-slot:title>
              <div v-show="!data.result">
                  Verified...
              </div>
              <div class="fs-15" v-show="data.result">
                  Email successfully confirmed. In a second, we will redirect you to your personal account.
              </div>
          </template>
      </AuthForm>
  </div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";
@import "@/assets/css/components/parts/forms/auth-form";
</style>