import {IAlert} from "~/composables/Interfaces/IAlert";

export const useAlertStore = defineStore('alert', {

    state: () => {
        return {
            info: <IAlert> {},
        }
    },

    getters:{
        getMessage: (state): IAlert|null => {
            if (Object.keys(state.info).length) {
                return state.info;
            }

            return null;
        },
    },

    actions:{
        setInfo(alert: IAlert): void {
            this.info = alert;
        },

        clearInfo(): void {
            this.info = <IAlert> {};
        }
    },
});