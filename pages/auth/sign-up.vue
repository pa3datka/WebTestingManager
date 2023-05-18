<script setup lang="ts">
import AuthForm from "~/components/Shared/Form/AuthForm.vue";
import AuthInput from "~/components/Shared/Input/AuthInput.vue";
import AuthCheckBox from "~/components/Shared/CheckBox/AuthCheckBox.vue";
import AuthButton from "~/components/Shared/Button/AuthButton.vue";

import {useReCaptchaToken} from "~/composables/shared/useReCaptchToken";
import { useValidation } from "~/composables/shared/useValidation";
import { IFormRegister } from "~/composables/Interfaces/IFormRegister";
import { useRouter } from "nuxt/app";
import { useAuth } from "~/composables/auth/useAuth";

definePageMeta({
    name: "sign-up",
    middleware: ['is-not-auth']
});

const { register } = useAuth();
const router = useRouter();
const {rules, validate} = useValidation();
const form = <IFormRegister> reactive({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    agree: false,
    reCaptcha: ''
});

const formRef = <Ref> ref({});
const submit = async () => {
    if (!validate(formRef)) {
        return;
    }

    load.loading = true;
    const res = await register(form);
    load.loading = false;
    if (res === true) {
        load.successRegister = true;
        setTimeout(() => router.push({name: 'home'}), 3000);
        return;
    }
    load.errorData = res;
    return;
};

const load = reactive({
    loading: <boolean>false,
    errorData: <any>'',
    successRegister: <boolean> false
});

onMounted(async () => {
    form.reCaptcha = <string|undefined> await useReCaptchaToken().getToken('sign_up');
});
</script>

<template>
    <div class="container">
        <AuthForm v-show="!load.successRegister" :is-footer="true">
            <template v-slot:title>Registration</template>
            <template v-slot:content>
                <div class="input-row">
                    <AuthInput
                            class="mt-md-20 mt-lg-0"
                            v-model="form.firstname"
                            name="firstname"
                            type="text"
                            placeholder="Name"
                            :rules="[rules.require, rules.min2]"
                            :ref="(el: any) => formRef[el?.name] = el"
                            :error="load.errorData"
                    />
                    <AuthInput
                            class="mt-sm-10 mt-md-20 mt-lg-0"
                            v-model="form.lastname"
                            name="lastname" type="text"
                            placeholder="Surname"
                            :rules="[rules.require, rules.min2]"
                            :ref="(el: any) => formRef[el?.name] = el"
                    />
                </div>

                <AuthInput
                        class="mt-sm-10 mt-md-20 mt-lg-20"
                        v-model="form.email"
                        name="email"
                        type="text"
                        placeholder="E-mail"
                        :rules="[rules.require, rules.email]"
                        :ref="(el: any) => formRef[el?.name] = el"
                />

                <AuthInput
                        class="mt-sm-10 mt-md-20 mt-lg-20"
                        v-model="form.password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        classes="password-field"
                        :rules="[rules.min8, rules.max50]"
                        :ref="(el: any) => formRef[el?.name] = el"
                />

                <AuthInput
                        class="mt-sm-10 mt-md-20 mt-lg-20"
                        v-model="form.password_confirmation"
                        name="password_confirmation"
                        classes="password-field"
                        placeholder="Confirm password"
                        type="password"
                        :ref="(el: any) => formRef[el?.name] = el"
                        :rules="[rules.passConfirm]"
                />

                <AuthCheckBox
                        class="mt-sm-10 mt-md-20 hover"
                        id="checkbox"
                        name="agree"
                        :rules="[rules.isTrue]"
                        v-model="form.agree"
                        :ref="(el: any) => formRef[el?.name] = el"
                >
                    <template v-slot:label>
                          <span class="hover">
                            I agree to the <nuxt-link to="/">terms of the user agreement</nuxt-link> and <nuxt-link
                                  to="/">privacy policy</nuxt-link>
                          </span>
                    </template>
                </AuthCheckBox>
            </template>
            <template v-slot:action>
                <AuthButton class="btn-auth primary-bg hover heartbeat" text="Sign in" :disabled="load.loading"
                            @click.stop="submit"/>
            </template>

            <template v-slot:footer>
                <div class="t-dark-grey">Already have an account?&nbsp;<nuxt-link to="/auth/sign-in">Sign in</nuxt-link></div>
            </template>
        </AuthForm>

        <AuthForm v-show="load.successRegister" title="Success">
            <template v-slot:content>
                <div>Вам на почту было выслано письмо для подтверждения! Проидите по ссылке из письма!</div>
            </template>
        </AuthForm>
    </div>
</template>

<style lang="scss">
@import "@/assets/css/variables.scss";
@import "@/assets/css/components/parts/forms/auth-form";
@import "@/assets/css/components/parts/buttons/auth-btn.scss";
@import "@/assets/css/components/parts/inputs/auth-checkbox";
@import "@/assets/css/components/parts/inputs/auth-input";
</style>