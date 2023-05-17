// https://nuxt.com/docs/api/configuration/nuxt-config
import {RuntimeConfig} from "nuxt/schema";
import {ConfigLayerMeta} from "c12";

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE_URL,
            appUrl: process.env.APP_DOMAIN,
            recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY
        }
    },

    modules: [
        ['@pinia/nuxt',
            {
                autoImports: [
                    'defineStore',
                    ['defineStore', 'definePiniaStore'],
                ],
            },
        ],
    ],

    css: [
        '@/assets/css/fonts.scss',
        '@/assets/css/app.scss',
    ],

    imports: {
        dirs: [
            'composables/**'
        ]
    },

    typescript: {
        strict: true,
        typeCheck: true
    },


})
