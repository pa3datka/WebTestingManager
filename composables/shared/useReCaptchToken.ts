import { useReCaptcha } from "vue-recaptcha-v3";

export const useReCaptchaToken = () => {

    const recaptchaInstance = useReCaptcha();

    const getToken = async (action: string): Promise<string|undefined> => {
        const loaded = await recaptchaInstance?.recaptchaLoaded();
        const token = await recaptchaInstance?.executeRecaptcha(action);
        return token;
    }

    return { getToken }
}