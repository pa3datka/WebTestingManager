import { AppConfig } from "nitropack";

export const useCustomCookies = () => {

    const config = useRuntimeConfig().coockie;

    const getAuthToken = (): string|undefined => {
        return useCookie(config?.key).value || '';
    }

    const setAuthToken = (token: string): void => {
        useCookie(config?.key, config?.options).value = token;
    }

    const removeAuthToken = (): void => {
        useCookie(config?.key).value = null;
    }

    const isToken = (): boolean => {
        return Boolean(getAuthToken());
    }

    return { getAuthToken, setAuthToken, removeAuthToken, isToken };
}