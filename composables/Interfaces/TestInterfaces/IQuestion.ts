import {IAnswer} from "~/composables/Interfaces/TestInterfaces/IAnswer";

export interface IQuestion {
    id?: number,
    question: string;
    type_id: number;
    count_points: number|null;
    img_path: string;
    explanation: string;
    answers: IAnswer[];
}