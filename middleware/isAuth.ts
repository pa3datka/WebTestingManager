import { useAuthStore } from "~/store/auth/auth";
import { useCustomCookies } from "~/composables/shared/useCustomCookies";
import { useAuth } from "~/composables/auth/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {

    if (process.client) {
        const { isToken } = useCustomCookies();
        const { isAuth } = useAuthStore();

        if (!isToken()) {
            return navigateTo('/auth/sign-in');
        }

        if (isToken() && !isAuth) {
            const { me } = useAuth();
            await me();
        }

        if (!isAuth) {
            return navigateTo('/auth/sign-in');
        }
    }
})