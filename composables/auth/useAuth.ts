import { useCustomCookies } from "~/composables/shared/useCustomCookies";
import { IFormRegister } from "~/composables/Interfaces/IFormRegister";

export const useAuth = () => {
    const { $httpRequest } = useNuxtApp();
    const { setAuthToken } = useCustomCookies();

    const register = async (form: IFormRegister) => {
        try {
            form.lang = 'ru';
            // @ts-ignore
            const res = await $httpRequest.post('auth/register', { ...form });
            if (res?.status) {
                return res?.status;
            }
        } catch (e: any) {
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