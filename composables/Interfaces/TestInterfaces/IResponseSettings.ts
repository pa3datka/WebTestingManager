import {ITestSetting} from "~/composables/Interfaces/TestInterfaces/ITestSetting";

export interface IResponseSettings {
    difficulty_types: ITestSetting[]
    display_answer_types: ITestSetting[]
    evaluation_types: ITestSetting[]
    quest_types: ITestSetting[]
    categories: ITestSetting[]
    chose_images: object
}