import {useCustomCookies} from "~/composables/shared/useCustomCookies";
import {useAuthStore} from "~/store/auth/auth";
import {useAuth} from "~/composables/auth/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {

    if (process.client) {
        const { isToken } = useCustomCookies();
        const { isAuth } = useAuthStore();

        if (isToken() && !isAuth) {
            const { me } = useAuth();
            await me();
        }

        if (isToken() && isAuth) {
            return navigateTo('/profile');
        }
    }
})