import {useReCaptcha } from "vue-recaptcha-v3";

export const useReCaptchaToken = () => {

    const recaptchaInstance = useReCaptcha();

    const getToken = async (action: string) => {
        const loaded = await recaptchaInstance?.recaptchaLoaded();
        console.log('loaded', loaded)
        const token = await recaptchaInstance?.executeRecaptcha(action);
        return token;
    }

    return { getToken }
}