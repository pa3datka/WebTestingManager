import {defineStore} from "pinia";
import {ITestSetting} from "~/composables/Interfaces/TestInterfaces/ITestSetting";
import {IResponseSettings} from "~/composables/Interfaces/TestInterfaces/IResponseSettings";
import {ITestSettings} from "~/composables/Interfaces/TestInterfaces/ITestSettings";
import {ITestQuestion} from "~/composables/Interfaces/TestInterfaces/ITestQuestion";

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
        getChoseImages: (state) => state.choseImages,
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
        },

        async createTest(questions: ITestQuestion[]) {
            // async saveImages() {
            //     let res = await Promise.all(
            //         this.photos.map(async img => await this.saveImage(img)),
            //     );
            //     res= res.filter(it => it)
            //     this.value = [...this.value, ...res];
            //
            //     return true;
            // },
            //
            // async saveImage(image) {
            //     let result = await photoService.savePhoto(image, this.source, this.store.state.user.car.id)
            //     return result && result.hasOwnProperty('photoId') ? result.photoId : null;
            // },
        }

    },
});