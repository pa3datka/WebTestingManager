import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin(async (nuxtApp) => {
    // @ts-ignore
    nuxtApp.vueApp.use(VueReCaptcha, {
        siteKey: useRuntimeConfig().public.recaptchaSiteKey,
        loaderOptions: {
            autoHideBadge: true,
            explicitRenderParameters: {
                badge: 'bottomleft',
            },
        },
    });
});