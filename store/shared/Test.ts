import {defineStore} from "pinia";
import {ITestSetting} from "~/composables/Interfaces/TestInterfaces/ITestSetting";
import {IResponseSettings} from "~/composables/Interfaces/TestInterfaces/IResponseSettings";
import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";
import {IPaginate} from "~/composables/Interfaces/IPaginate";
import {IChoseImage} from "~/composables/Interfaces/TestInterfaces/IChoseImage";


export const useTestStore = defineStore('test', {

    state: () => {
        return {
            difficultyTypes: <ITestSetting[]|[]> [],
            displayAnswerTypes: <ITestSetting[]|[]> [],
            evaluationTypes: <ITestSetting[]|[]> [],
            questTypes: <ITestSetting[]|[]> [],
            categories: <ITestSetting[]|[]> [],
            choseImages: <IChoseImage[]|[]> [],

            newTestConfiguration: <ITest> {},
            myTests: <ITest[]|[]> [],
            paginate: <IPaginate|null> null,
            countMyTests: <number|null> null,
        }
    },

    getters:{
        getDifficultyTypes: (state): ITestSetting[]|[] => state.difficultyTypes,
        getDisplayAnswerTypes: (state): ITestSetting[]|[] => state.displayAnswerTypes,
        getEvaluationTypes: (state): ITestSetting[]|[] => state.evaluationTypes,
        getQuestTypes: (state): ITestSetting[]|[] => state.questTypes,
        getCategories: (state): ITestSetting[]|[] => state.categories,
        getChoseImages: (state): IChoseImage[]|[] => state.choseImages,
        getMyTests: (state): ITest[]|[] => state.myTests,
        getPaginate: (state): IPaginate|null => state.paginate,
        getCountMyTests: (state): number|null => state.countMyTests,
    },

    actions:{
        setTestSettings(settings: IResponseSettings): void {
            this.difficultyTypes = <ITestSetting[]> settings.difficulty_types;
            this.displayAnswerTypes = <ITestSetting[]> settings.display_answer_types;
            this.evaluationTypes = <ITestSetting[]> settings.evaluation_types;
            this.questTypes = <ITestSetting[]> settings.quest_types;
            this.categories = <ITestSetting[]> settings.categories;
            this.choseImages = <IChoseImage[]> settings.chose_images;
        },

        setTests(list: ITest[], paginate: IPaginate|null): void {
            paginate && (this.paginate = paginate);
            !paginate && (this.paginate = null);

            list && (this.myTests = list);
        },

        deleteTestByIdInMyTests(id: number): void {
            this.myTests = <ITest[]|[]> this.myTests.filter((test: ITest) => test.id !== id);
        },

        setCountMyTests(count: number): void {
            this.countMyTests = count;
        }
    },
});