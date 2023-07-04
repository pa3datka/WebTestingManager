import { useTestStore } from "~/store/shared/Test";
import {useResponseError} from "~/composables/shared/useResponseError";
import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";
import {IQuestionTest} from "~/composables/Interfaces/TestInterfaces/IQuestionTest";
import {IUploadTestImage} from "~/composables/Interfaces/TestInterfaces/IUploadTestImage";
import {useUploadImage} from "~/composables/shared/useUploadImage";

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

    const updateTest = async (test: ITest) => {
        try {
            const res = await $httpRequest.post('test/update', test);
            return { status: true, id: res.test_id };
        } catch (e) {
            return { status: false, error: useResponseError().getResponseErrors(e)};
        }
    }

    const prepareTest = async (settings: ITest, questions: IQuestionTest[]): Promise<ITest> => {
        let arrImages = [];
        settings.img_path.length > 200 && arrImages.push({source: 'test', file: settings.img_path });
        questions.forEach(quest => {
            quest.img_path && quest.img_path.length > 100 && arrImages.push({source: 'question', questId: quest.id, file: quest.img_path });
            quest.answers && quest.answers.forEach(answer => {
                answer.answer_img && answer.answer_img.length > 100 && arrImages.push({source: 'answer', questId: quest.id, answerId: answer.id, file: answer.answer_img });
            });
        });

        const images = <IUploadTestImage[]> await useUploadImage().uploadTestImages(arrImages);
        images.forEach((image: IUploadTestImage)  => {
            if (image.source === 'test') {
                settings.img_path = image.file;
            }

            if (image.source === 'question') {
                questions.map(quest => {
                    if (quest.id === image.questId) {
                        quest.img_path = image.file;
                    }
                });
            }

            if (image.source === 'answer') {
                questions.map(quest => {
                    if (quest.id === image.questId) {
                        quest.answers && quest.answers.map(answer =>
                            answer.id === image.answerId && (answer.answer_img = image.file)
                        );
                    }
                });
            }
        });

        // reset new questions and answer ids
        questions.map(quest => {
            quest.new && (quest.id = 0);
            quest.answers.map(answer => answer.new && (answer.id = 0));
        });

        settings.questions = questions;

        return settings;
    }

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
            return res;
        } catch (e) {
            console.log(e);
        }
    };

    const deleteTest = async (id: number) => {
        try {
            const res = await $httpRequest.get(`test/delete/${id}`);
            res.status && useTestStore().deleteTestByIdInMyTests(id);
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    return {
        fetchTestSettings,
        fetchTestsBySearchString,
        fetchMyTests,
        fetchEditTest,
        prepareTest,
        createTest,
        updateTest,
        deleteTest
    };
}