import { useTestStore } from "~/store/shared/Test";
import {useResponseError} from "~/composables/shared/useResponseError";
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
            return { status: true, id: res.test_id };
        } catch (e: any) {
            return { status: false, error: useResponseError().getResponseErrors(e)};
        }
    };

    const fetchTestsBySearchString = async (search: string) => {
        try {
            // @ts-ignore
            return await $httpRequest.post('test/search', { search: search });
        } catch (e) {
            console.log(e);
        }

    };

    const fetchMyTests = async (page: number|null) => {
        const numberPage = page ?`?page=${page}` : '';
        try {
            // @ts-ignore
            const res = await $httpRequest.get(`test/list${numberPage}`);
            useTestStore().setTests(res.data, res.paginate);
        } catch (e) {
            return {}
        }
    };

    const fetchEditTest = async (id: string) => {
        try {
            const res = await $httpRequest.get(`test/edit/${id}`);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }

    return { fetchTestSettings, createTest, fetchTestsBySearchString, fetchMyTests, fetchEditTest };
}