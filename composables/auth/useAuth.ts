import { useCustomCookies } from "~/composables/shared/useCustomCookies";
import { IFormRegister } from "~/composables/Interfaces/IFormRegister";
import { IFormLogin } from "~/composables/Interfaces/IFormLogin";
import {useAuthStore} from "~/store/auth/auth";
import {IFormResetPassword} from "~/composables/Interfaces/IFormResetPassword";
import {IFormNewPassword} from "~/composables/Interfaces/IFormNewPassword";
import {IResponseError} from "~/composables/Interfaces/IResponseError";
import {IErrorResponseData} from "~/composables/Interfaces/IErrorResponseData";

export const useAuth = () => {
    const { $httpRequest } = useNuxtApp();
    const { setAuthToken } = useCustomCookies();

    const register = async (form: IFormRegister): Promise<IResponseError> => {
        try {
            form.lang = 'ru';
            // @ts-ignore
            const res = await $httpRequest.post('auth/register', { ...form });
            if (res?.status) {
                return { status: res?.status };
            }

            return { status: false, errors: getErrors(res) };
        } catch (e: any) {
            return {
                status: false,
                errors: getErrors(e?.response?._data)
            };
        }
    };

    const login = async (form: IFormLogin): Promise<IResponseError> => {
        try {
            // @ts-ignore
            const res = await $httpRequest.post('auth/login', { ...form });
            if (res?.status) {
                const { setUser } = useAuthStore();
                setAuthToken(res.result.access_token);
                setUser(res.result.user);
                return { status: res?.status };
            }
            return { status: false, errors: getErrors(res) };
        } catch (e: any) {
            return {
                status: false,
                errors: getErrors(e?.response?._data)
            };
        }
    }

    const me = async () => {
        const { setUser, clearUser } = useAuthStore();
        try {
            // @ts-ignore
            const res = await $httpRequest.get('auth/me');

            res?.status && setUser(res.result.user);
            !res?.status && clearUser();
        } catch (e: any) {
            clearUser();
        }

        return true;
    }

    const logout = () => {
        const { clearUser } = useAuthStore();
        const { removeAuthToken } = useCustomCookies();
        // @ts-ignore
        $httpRequest.get('auth/logout');

        clearUser();
        removeAuthToken();
    }

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

    const passwordReset = async (form: IFormResetPassword) => {
        try {
            // @ts-ignore
            $httpRequest.post('auth/password-reset', { ...form });
        } catch (e: any) {
            console.log(e);
        }
    }

    const newPassword = async (form: IFormNewPassword): Promise<IResponseError> => {
        try {
            // @ts-ignore
            const res = await $httpRequest.post('auth/new-password', { ...form });
            if (res?.status) {
                return { status: res?.status }
            }
            return { status: false, errors: getErrors(res) };
        } catch (e: any) {

            return {
                status: false,
                errors: getErrors(e?.response?._data)
            };
        }
    }

    const getErrors = (response: IErrorResponseData|string): string[] => {

        if (typeof response === 'string') {
            return [response];
        }

        let arrErr = <string[]> [];

        const errors = <string[]> Object.values(response?.errors ?? {});
        if (errors.length) {
            for (let i = 0; i <= errors.length;i++) {
                if (typeof errors[i] !== 'undefined') {
                    // @ts-ignore
                    errors[i].forEach((err: string) => arrErr.push(err));
                }
            }
        }

        if (!arrErr.length && response?.message) {
            arrErr.push(response?.message);
        }

        if (!arrErr.length) {
            return ['Server error'];
        }

        return arrErr;
    }

    return { register, verifiedEmail, me, logout, login, passwordReset, newPassword };
}