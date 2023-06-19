import { useTestStore } from "~/store/shared/Test";
import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";
import {useResponseError} from "~/composables/shared/useResponseError";

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
            return { status: true, id: res.test_id };
        } catch (e: any) {
            return { status: false, error: useResponseError().getResponseErrors(e)};
        }
    };

    const fetchTestsBySearchString = async (search: string) => {
        // @ts-ignore
        const res = await $httpRequest.post('test/search', { search: search });
        return res;
    };

    return { fetchTestSettings, createTest, fetchTestsBySearchString };
}