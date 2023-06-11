import { useTestStore } from "~/store/shared/Test";
import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";

export const useTest = () => {
    const { $httpRequest } = useNuxtApp();

    const fetchTestSettings = async () => {
        try {
            // @ts-ignore
            const res = await $httpRequest.get('settings/create-test');
            useTestStore().setTestSettings(res)

        } catch (e) {

        }
    };

    const createTest = async (test: ITest) => {
        try {
            // @ts-ignore
            const res = await $httpRequest.post('test/create', test);
            console.log(res)
        } catch (e) {
            console.error(e);
        }
    }

    return { fetchTestSettings, createTest };
}