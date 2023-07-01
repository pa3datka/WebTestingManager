import { AppConfig } from "nitropack";
import {CookieSerializeOptions} from "cookie-es";

export const useCustomCookies = () => {

    const config = <CookieSerializeOptions> {
        maxAge: <number> 31536000,
        sameSite: <string> 'Lax',
    }

    const getAuthToken = (): string|undefined => {
        return useCookie('access_token').value || '';
    }

    const setAuthToken = (token: string): void => {
        useCookie('access_token', config).value = token;
    }

    const removeAuthToken = (): void => {
        useCookie('access_token').value = null;
    }

    const isToken = (): boolean => {
        return Boolean(getAuthToken());
    }

    return { getAuthToken, setAuthToken, removeAuthToken, isToken };
}