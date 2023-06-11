<script setup lang="ts">
import {string} from "postcss-selector-parser";

definePageMeta({
    name: "new-password",
    middleware: ['is-not-auth']
});

import AuthForm from "~/components/Shared/Form/AuthForm.vue";
import AuthInput from "~/components/Shared/Input/AuthInput.vue";
import AuthButton from "~/components/Shared/Button/AuthButton.vue";

import {IFormNewPassword} from "~/composables/Interfaces/IFormNewPassword";
import { useValidation } from "~/composables/shared/useValidation";
import { useAuth } from "~/composables/auth/useAuth";
import { useRouter, useRoute } from "nuxt/app";
import { IResponseError} from "~/composables/Interfaces/IResponseError";
import { useReCaptchaToken } from "~/composables/shared/useReCaptchToken";


const {validate, rules} = useValidation();
const { newPassword } = useAuth();
const route = useRoute();
const router = useRouter();
const formRef = <Ref> ref({});
const form = <IFormNewPassword> reactive({
    password: '',
    password_confirmation: '',
    reCaptcha: '',
    token: ''
});

const load = reactive({
    loading: <boolean> false,
    errorData: <any> '',
    messages: <string[]|undefined> []
});

onMounted(async () => {
    form.reCaptcha = <string|undefined> await useReCaptchaToken().getToken('password_reset') ?? '';
});

const submit = async () => {
    if (!validate(formRef)) {
        return;
    }

    form.token = <string>route.params.token;
    load.loading = true;
    const result = <IResponseError> await newPassword(form);
    load.loading = false;
    if (result.status) {
        return router.push({name: 'sign-in'});
    }
    load.messages = result.errors;
    return;
};
</script>

<template>
<div class="container">
    <AuthForm :is-footer="false" :errors="(load.messages ?? [])">
        <template v-slot:title>
            <div class="d-flex justify-content-center W-100 ">
                <div class="img-auth"></div>
            </div>
            <div class="t-dark pt-sm-20 pt-lg-30">Password recovery</div>
        </template>

        <template v-slot:content>
            <AuthInput

                    v-model="form.password"
                    type="password"
                    name="password"
                    classes="password-field"
                    placeholder="New password"
                    :rules="[rules.min8, rules.max50, rules.require]"
                    :ref="(el: any) => formRef[el?.name] = el"
            />

            <AuthInput
                    v-model="form.password_confirmation"
                    class="mt-sm-10 mt-md-20 mt-lg-20"
                    type="password"
                    classes="password-field"
                    placeholder="Password confirmation"
                    name="password_confirmation"
                    :rules="[rules.passConfirm]"
                    :ref="(el: any) => formRef[el?.name] = el"
            />
        </template>

        <template v-slot:action>
            <AuthButton
                    class="btn-auth primary-bg hover"
                    @click.prevent="submit"
                    text="Reset"
            />
        </template>

    </AuthForm>
</div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";
@import "@/assets/css/components/parts/forms/auth-form";
@import "@/assets/css/components/parts/buttons/auth-btn.scss";
@import "~/assets/css/components/parts/inputs/universal-input";
</style>