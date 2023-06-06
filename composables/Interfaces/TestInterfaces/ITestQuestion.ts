import {IQuestionAnswer} from "~/composables/Interfaces/TestInterfaces/IQuestionAnswer";

export interface ITestQuestion {
    id: number,
    question: string;
    answers: IQuestionAnswer[];
    type_id: number;
    countPoints?: number;
    image?: string;
    explanation?: string;
}