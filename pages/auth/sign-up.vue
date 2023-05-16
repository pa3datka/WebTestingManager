<script setup lang="ts">
import AuthForm from "~/components/Shared/Form/AuthForm.vue";
import AuthInput from "~/components/Shared/Input/AuthInput.vue";
import AuthCheckBox from "~/components/Shared/CheckBox/AuthCheckBox.vue";
import AuthButton from "~/components/Shared/Button/AuthButton.vue";

import {useValidation} from "~/composables/shared/useValidation";

definePageMeta({
    name: "sign-up",
});

const {rules, validate} = useValidation();
const form = reactive({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
    agree: false
});

const formRef = <Ref> ref({});
const submit = () => {
    validate(formRef)
};

const load = reactive({
    loading: <boolean>false,
    errorData: <any>'',
});
</script>

<template>
    <div class="container">
        <AuthForm title="Registration" :is-footer="true">
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
                            :error="load.errorData"
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
                        :error="load.errorData"
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
                        :error="load.errorData"
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
                Already have an account?&nbsp;<nuxt-link to="/">Sign in</nuxt-link>
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