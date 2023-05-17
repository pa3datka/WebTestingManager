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

    const verifiedEmail = async (token: string): Promise<boolean> => {
        try {
            // @ts-ignore
            const res = await $httpRequest.get(`auth/verified-email-token/${token}`);

            if (res?.status) {
                setAuthToken(res.result.access_token);
                return true;
            }

            return false;
        } catch (e: any) {
            return false;
        }
    }

    const getErrors = (response: []|string) => {
        if (!response) {
            return 'Server error';
        }
        if (typeof response === 'string') {
            return response;
        }
        return Object.values(response).reduce((error, current) => error += (current[0] + ' '), '');
    }

    return { register, verifiedEmail };
}