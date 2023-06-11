import {defineStore} from "pinia";
import {ITestSetting} from "~/composables/Interfaces/TestInterfaces/ITestSetting";
import {IResponseSettings} from "~/composables/Interfaces/TestInterfaces/IResponseSettings";
import {ITestSettings} from "~/composables/Interfaces/TestInterfaces/ITestSettings";
import {ITestQuestion} from "~/composables/Interfaces/TestInterfaces/ITestQuestion";
import { useUploadImage } from "~/composables/shared/useUploadImage";
import {ITest} from "~/composables/Interfaces/TestInterfaces/ITest";
import {IQuestion} from "~/composables/Interfaces/TestInterfaces/IQuestion";
import {IQuestionAnswer} from "~/composables/Interfaces/TestInterfaces/IQuestionAnswer";
import {IAnswer} from "~/composables/Interfaces/TestInterfaces/IAnswer";
import {IUploadTestImage} from "~/composables/Interfaces/TestInterfaces/IUploadTestImage";
import { useTest } from "~/composables/test/useTest";


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

        async createTest(configs: ITestSettings, questions: ITestQuestion[]) {

           let arrImages = [];
            configs.image.length > 100 && arrImages.push({source: 'test', file: configs.image });
           questions.forEach(quest => {
               quest.image && quest.image.length > 100 && arrImages.push({source: 'question', questId: quest.id, file: quest.image });
               quest.answers.forEach(answer => {
                   answer.answer_img && answer.answer_img.length > 100 && arrImages.push({source: 'answer', questId: quest.id, answerId: answer.id, file: answer.answer_img });
               });
           });


           const images = <IUploadTestImage[]> await useUploadImage().uploadTestImages(arrImages);

           images.forEach((image: IUploadTestImage)  => {
               if (image.source === 'test') {
                   configs.image = image.file;
               }

               if (image.source === 'question') {
                   questions.map(quest => {
                       if (quest.id === image.questId) {
                           quest.image = image.file;
                       }
                   });
               }

               if (image.source === 'answer') {
                   questions.map(quest => {
                       if (quest.id === image.questId) {
                           quest.answers.map(answer =>
                               answer.id === image.answerId && (answer.answer_img = image.file)
                           );
                       }
                   });
               }
           });

           const test = this.prepareTest(configs, questions);

           const { createTest } = useTest();

           await createTest(test);
        },

        prepareTest(settings: ITestSettings, questions: ITestQuestion[]){
            let test = <ITest> {};

            test.title = settings.title;
            test.description = settings.description;
            test.img_path = settings.image;
            test.category_id = settings.categoryId;
            test.difficulty_id = settings.difficultyId;
            test.attempts = (settings?.attempts ?? null);
            test.display_answer_type_id = settings.display_answer_type_id;
            test.evaluation_type_id = settings.evaluation_type_id;
            test.cheating_prevention = (settings?.cheating_prevention ?? null);
            test.time = (settings?.time ?? null);
            test.shuffle_answers = settings.shuffle_answers;
            test.questions = this.prepareQuestions(questions);

            return test;
        },

        prepareQuestions(questions: ITestQuestion[]): IQuestion[] {
          let arrQuestions = <IQuestion[]> [];

          questions.forEach(quest => {
              let question = <IQuestion> {};
              question.question = quest.question;
              question.type_id = quest.type_id;
              question.img_path = (quest?.image ?? '');
              question.count_points = (quest?.countPoints ?? null);
              question.explanation = (quest?.explanation ?? '');
              question.answers = this.prepareAnswers(quest.answers);
              arrQuestions.push(question);
          });

          return arrQuestions;
        },

        prepareAnswers(answers: IQuestionAnswer[]): IAnswer[] {
            let arrAnswers = <IAnswer[]> [];

            answers.forEach(answer => {
                let newAnswer = <IAnswer> {};
                newAnswer.answer_text = (answer?.answer_text ?? '');
                newAnswer.answer_img = (answer?.answer_img ?? '');
                newAnswer.is_correct = answer.is_correct;
                newAnswer.sequence = (answer?.sequence ?? null);

                arrAnswers.push(newAnswer);
            });

            return arrAnswers;
        }

    },
});