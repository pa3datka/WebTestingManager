// https://nuxt.com/docs/api/configuration/nuxt-config
import {NuxtConfigSchema} from "@nuxt/schema";

export default defineNuxtConfig({
    modules: [],

    css: [
        '@/assets/css/fonts.scss',
        '@/assets/css/app.scss',
    ],

    typescript: {
        strict: true,
        typeCheck: true
    },


})
