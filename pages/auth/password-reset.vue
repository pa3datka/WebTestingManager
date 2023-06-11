<script setup lang="ts">
definePageMeta({
    name: "password-reset",
    middleware: ['is-not-auth']
});

import AuthForm from "~/components/Shared/Form/AuthForm.vue";
import AuthInput from "~/components/Shared/Input/AuthInput.vue";
import AuthButton from "~/components/Shared/Button/AuthButton.vue";

import { IFormResetPassword } from "~/composables/Interfaces/IFormResetPassword";
import { useValidation } from "~/composables/shared/useValidation";
import { useAuth } from "~/composables/auth/useAuth";
import { useRouter } from "nuxt/app";
import { useReCaptchaToken } from "~/composables/shared/useReCaptchToken";

const {validate, rules} = useValidation();
const { passwordReset } = useAuth();
const router = useRouter();
const formRef = <Ref> ref({});
const form = <IFormResetPassword> reactive({
    email: '',
    reCaptcha: ''
});

const load = reactive({
    loading: <boolean> false,
    errorData: <any> '',
    message: <string> ''
});

onMounted(async () => {
    form.reCaptcha = <string|undefined> await useReCaptchaToken().getToken('password_reset');
});

const submit = () => {
    if (!validate(formRef)) {
        return;
    }

    try {
        load.loading = true;
        passwordReset(form);
    } catch (err: any) {
        console.log(err);
    } finally {
        load.loading = false;
        load.message = "An email has been sent to you to change your password.";
    }
};
</script>

<template>
<div class="container">
    <AuthForm :is-footer="false" v-if="!load.message.length">
        <template v-slot:title>
            <div class="d-flex justify-content-center W-100 ">
                <div class="img-auth"></div>
            </div>
            <div class="t-dark pt-sm-20 pt-lg-30">Password reset</div>
            <p class="pt-sm-15 fw-400 fs-15 t-dark-grey">Enter the email you used when registering</p>
        </template>

        <template v-slot:content>
            <AuthInput
                v-model="form.email"
                type="email"
                name="email"
                placeholder="E-mail"
                :rules="[rules.require, rules.email]"
                :ref="(el: any) => formRef[el?.name] = el"
                :error="load.errorData"
            />
        </template>

        <template v-slot:action>
            <AuthButton
                class="btn-auth primary-bg hover"
                @click.prevent="submit"
                text="Send"
            />
        </template>
    </AuthForm>
    <AuthForm v-else :is-footer="false">
        <template v-slot:title>
            <div class="d-flex justify-content-center W-100 ">
                <div class="img-auth"></div>
            </div>
            <p class="fs-15 pt-sm-15 t-dark pt-sm-20 pt-lg-30">{{ load.message }} <br> <nuxt-link to="/auth/sign-in">Sign in</nuxt-link></p>
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