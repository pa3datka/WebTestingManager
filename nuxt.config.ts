// https://nuxt.com/docs/api/configuration/nuxt-config
import {NuxtConfigSchema} from "@nuxt/schema";

export default defineNuxtConfig({
    head: {
        title: 'Testing-Manager',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: 'testing-manager'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

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
