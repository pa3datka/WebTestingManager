import { useCustomCookies } from "~/.nuxt/imports";
import { IFormRegister } from "~/composables/Interfaces/IFormRegister";
import { useReCaptchaToken } from "~/composables/shared/useReCaptchToken";

export const useAuth = () => {
    const { $httpRequest } = useNuxtApp();
    const { setAuthToken } = useCustomCookies();

    const register = async (form: IFormRegister) => {
         const { getToken } = useReCaptchaToken();
        try {
            form.lang = 'ru';
            console.log(form)
            form.reCaptcha = <string> await getToken('sign_up');
            console.log(form)
            form.reCaptcha = 'asdasd';
            // @ts-ignore
            const res = await $httpRequest.post('auth/register', { ...form });
            if (res?.status) {
                return res?.status;
            }
        } catch (e: any) {
            console.log(e)
            return getErrors(e?.response?._data?.errors);
        }
    };

    const getErrors = (response: []|string) => {
        if (!response) {
            return 'Server error';
        }
        if (typeof response === 'string') {
            return response;
        }
        return Object.values(response).reduce((error, current) => error += (current[0] + ' '), '');
    }

    return { register };
}