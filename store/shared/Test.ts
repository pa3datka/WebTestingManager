import {defineStore} from "pinia";
import {ITestSetting} from "~/composables/Interfaces/TestInterfaces/ITestSetting";
import {IResponseSettings} from "~/composables/Interfaces/TestInterfaces/IResponseSettings";
import {ITestSettings} from "~/composables/Interfaces/TestInterfaces/ITestSettings";

export const useTestStore = defineStore('test', {

    state: () => {
        return {
            difficultyTypes: <ITestSetting[]> [],
            displayAnswerTypes: <ITestSetting[]> [],
            evaluationTypes: <ITestSetting[]> [],
            questTypes: <ITestSetting[]> [],
            categories: <ITestSetting[]> [],
            choseImages: <[]> [],

            newTestConfiguration: <ITestSettings> {}
        }
    },

    getters:{
        getDifficultyTypes: (state):ITestSetting[] => state.difficultyTypes,
        getDisplayAnswerTypes: (state):ITestSetting[] => state.displayAnswerTypes,
        getEvaluationTypes: (state):ITestSetting[] => state.evaluationTypes,
        getQuestTypes: (state):ITestSetting[] => state.questTypes,
        getCategories: (state):ITestSetting[] => state.categories,
        getChoseImages: (state) => {
            // @ts-ignore
            return state.choseImages.reduce((current: {}, image: any) => {
                // @ts-ignore
                !current[image?.name] && (current[image?.name] = []);
                // @ts-ignore
                current[image?.name].push(image)
                return current;
            }, {});
        },
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

        updateTestConfigs(configs: ITestSettings): void {
            this.newTestConfiguration = <ITestSettings> configs;
            console.log(this.newTestConfiguration)
        },

    },
});