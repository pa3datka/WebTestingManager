import {IQuestion} from "~/composables/Interfaces/TestInterfaces/IQuestion";

export interface ITestCreate {
    id?: number;
    title: string;
    description: string;
    img_path: string;
    category_id: number;
    evaluation_id: number;
    difficulty_id: number;
    display_answer_id: number;
    shuffle_answers: boolean;
    attempts: number|null;
    time: number|null; //sec
    cheating_prevention: number|null;
    questions: IQuestion[]
}