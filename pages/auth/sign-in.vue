<script setup lang="ts">
import {IResponseError} from "~/composables/Interfaces/IResponseError";

definePageMeta({
    name: "sign-in",
    middleware: ['is-not-auth']
});

import AuthForm from "~/components/Shared/Form/AuthForm.vue";
import AuthInput from "~/components/Shared/Input/AuthInput.vue";
import AuthButton from "~/components/Shared/Button/AuthButton.vue";
import { IFormRegister } from "~/composables/Interfaces/IFormRegister";
import { useValidation } from "~/composables/shared/useValidation";
import { useReCaptchaToken } from "~/composables/shared/useReCaptchToken";
import { useAuth } from "~/composables/auth/useAuth";
import { useRouter } from "nuxt/app";

const {validate, rules} = useValidation();
const { login } = useAuth();
const router = useRouter();
const formRef = <Ref> ref({});
const form = <IFormRegister> reactive({
    email: '',
    password: '',
    reCaptcha: ''
});

const load = reactive({
    loading: <boolean>false,
    messages: <string[]|undefined> [],
    successRegister: <boolean> false
});


const submit = async () => {
    if (!validate(formRef)) {
        return;
    }

    load.loading = true;
    const res = <IResponseError> await login(form);
    load.loading = false;
    if (res.status) {
        await router.push({ name: 'profile' });
        return;
    }
    load.messages = res.errors;
    return;
};

onMounted(async () => {
    form.reCaptcha = <string|undefined> await useReCaptchaToken().getToken('sign_in');
});
</script>

<template>
<div class="container">
    <AuthForm :is-footer="true" :errors="load.messages">
        <template v-slot:title>Login</template>
        <template v-slot:content>
            <AuthInput
              name="email"
              v-model="form.email"
              placeholder="E-mail"
              type="text"
              :rules="[rules.require]"
              :ref="(el: any) => formRef[el?.name] = el"
            />

            <AuthInput
                class="mt-sm-10 mt-md-20 mt-lg-20"
                v-model="form.password"
                name="password"
                type="password"
                placeholder="Password"
                classes="password-field"
                :rules="[rules.require]"
                :ref="(el: any) => formRef[el?.name] = el"
            />

            <div class="mt-sm-10 mt-md-20 align-text-right">
                <nuxt-link to="/auth/password-reset">Забыли пароль?</nuxt-link>
            </div>
        </template>

        <template v-slot:action>
            <AuthButton
                class="btn-auth primary-bg hover"
                text="Sign in"
                :load="load.loading"
                @click.prevent="submit"
            />
        </template>

        <template v-slot:footer>
            <div class="t-dark-grey">Еще нет аккаунта? <nuxt-link to="/auth/sign-up">Sign up</nuxt-link></div>
        </template>
    </AuthForm>
</div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";
@import "@/assets/css/components/parts/forms/auth-form";
@import "@/assets/css/components/parts/buttons/auth-btn.scss";
@import "@/assets/css/components/parts/inputs/auth-input";
</style>