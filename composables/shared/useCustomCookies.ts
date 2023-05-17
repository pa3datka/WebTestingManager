import { AppConfig } from "nitropack";

export const useCustomCookies = () => {

    const config = <AppConfig> useAppConfig();

    const getAuthToken = (): string|undefined => {
        return useCookie('access_token').value || '';
    }

    const setAuthToken = (token: string): void => {
        useCookie(config.authCookie.key, config.authCookie.options).value = token;
    }

    const removeAuthToken = (): void => {
        useCookie(config.authCookie.key).value = null;
    }

    const isToken = (): boolean => {
        return Boolean(getAuthToken());
    }

    return { getAuthToken, setAuthToken, removeAuthToken, isToken };
}