import {IAnswerTest} from "~/composables/Interfaces/TestInterfaces/IAnswerTest";

export interface IQuestionTest {
    id: number;
    test_id?: number;
    question: string;
    img_path: string;
    count_points: number;
    explanation: string;
    type_id: number;

    answers: IAnswerTest[];

    check_is_correct?: boolean;
    is_errors?: boolean;
    new?: boolean;
}