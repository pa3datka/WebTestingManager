import { defineStore } from 'pinia'
import { IUser } from "@/composables/Interfaces/IUser";

export const useAuthStore = defineStore('auth', {

    state: () => {
        return {
            auth: false,
            user: <IUser> {}
        }
    },

    getters:{
        isAuth: (state):boolean  => state.auth,
        getUser: (state): IUser => state.user,
    },

    actions:{

        setUser(user: IUser): void {
            this.user = user;
            this.auth = true;
        },

        clearUser(): void {
            this.user  = <IUser> {};
            this.auth = false;
        }
    },
});