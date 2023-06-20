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
        return await $httpRequest.post('test/search', { search: search });
    };

    const fetchMyTests = async (page: number|null) => {
        const numberPage = page ?`?page=${page}` : '';
        try {
            // @ts-ignore
            const res = await $httpRequest.get(`test/list${numberPage}`);
            return { list: res.data, paginate: res.paginate };
        } catch (e) {
            return {}
        }
    };

    return { fetchTestSettings, createTest, fetchTestsBySearchString, fetchMyTests };
}