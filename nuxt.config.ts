// https://nuxt.com/docs/api/configuration/nuxt-config

import { ConfigSchema } from "@nuxt/schema/schema/config";

const config = <ConfigSchema> {
    app: {
        rootId: '_tmt',
        head: {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' }
            ],
        },

    },
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE_URL,
            appUrl: process.env.APP_DOMAIN,
            recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
            imageApiUrl: process.env.IMAGE_API_URL
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
};
// @ts-ignore
export default defineNuxtConfig(config);
