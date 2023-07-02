import {defineStore} from "pinia";
import {ITestSetting} from "~/composables/Interfaces/TestInterfaces/ITestSetting";
import {IResponseSettings} from "~/composables/Interfaces/TestInterfaces/IResponseSettings";
import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";
import { useUploadImage } from "~/composables/shared/useUploadImage";
import {IUploadTestImage} from "~/composables/Interfaces/TestInterfaces/IUploadTestImage";
import { useTest } from "~/composables/test/useTest";
import {IPaginate} from "~/composables/Interfaces/IPaginate";
import {IChoseImage} from "~/composables/Interfaces/TestInterfaces/IChoseImage";
import {IQuestionTest} from "~/composables/Interfaces/TestInterfaces/IQuestionTest";


export const useTestStore = defineStore('test', {

    state: () => {
        return {
            difficultyTypes: <ITestSetting[]> [],
            displayAnswerTypes: <ITestSetting[]> [],
            evaluationTypes: <ITestSetting[]> [],
            questTypes: <ITestSetting[]> [],
            categories: <ITestSetting[]> [],
            choseImages: <IChoseImage[]> [],

            newTestConfiguration: <ITest> {},
            myTests: <ITest[]|[]> [],
            paginate: <IPaginate|null> null,
        }
    },

    getters:{
        getDifficultyTypes: (state):ITestSetting[] => state.difficultyTypes,
        getDisplayAnswerTypes: (state):ITestSetting[] => state.displayAnswerTypes,
        getEvaluationTypes: (state):ITestSetting[] => state.evaluationTypes,
        getQuestTypes: (state):ITestSetting[] => state.questTypes,
        getCategories: (state):ITestSetting[] => state.categories,
        getChoseImages: (state):IChoseImage[] => state.choseImages,
        getMyTests: (state): ITest[]|[] => state.myTests,
        getPaginate: (state): IPaginate|null => state.paginate,
    },

    actions:{
        setTestSettings(settings: IResponseSettings): void {
            this.difficultyTypes = <ITestSetting[]> settings.difficulty_types;
            this.displayAnswerTypes = <ITestSetting[]> settings.display_answer_types;
            this.evaluationTypes = <ITestSetting[]> settings.evaluation_types;
            this.questTypes = <ITestSetting[]> settings.quest_types;
            this.categories = <ITestSetting[]> settings.categories;
            this.choseImages = <[]> settings.chose_images
        },

        setTests(list: ITest[], paginate: IPaginate|null): void {
            paginate && (this.paginate = paginate);
            paginate && (this.paginate = null);

            list && (this.myTests = list);
        },

        async createTest(configs: ITest, questions: IQuestionTest[]) {

           let arrImages = [];
           configs.img_path.length > 200 && arrImages.push({source: 'test', file: configs.img_path });
           questions.forEach(quest => {
               quest.img_path && quest.img_path.length > 100 && arrImages.push({source: 'question', questId: quest.id, file: quest.img_path });
               quest.answers && quest.answers.forEach(answer => {
                   answer.answer_img && answer.answer_img.length > 100 && arrImages.push({source: 'answer', questId: quest.id, answerId: answer.id, file: answer.answer_img });
               });
           });

           const images = <IUploadTestImage[]> await useUploadImage().uploadTestImages(arrImages);
           images.forEach((image: IUploadTestImage)  => {
               if (image.source === 'test') {
                   configs.img_path = image.file;
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
            configs.questions = questions;

           const { createTest } = useTest();

           return await createTest(configs);
        },
    },
});