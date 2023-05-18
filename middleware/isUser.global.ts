import { useAuthStore } from "~/store/auth/auth";
import { useAuth } from "~/composables/auth/useAuth";
import { useCustomCookies } from "~/composables/shared/useCustomCookies";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        const { getAuthToken } = useCustomCookies();
        const { isAuth } = useAuthStore();
        const { me } = useAuth();

        getAuthToken() && !isAuth && await me();
    }
})