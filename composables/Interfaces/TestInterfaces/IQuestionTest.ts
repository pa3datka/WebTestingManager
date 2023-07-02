import {IAnswerTest} from "~/composables/Interfaces/TestInterfaces/IAnswerTest";

export interface IQuestionTest {
    id: number;
    test_id?: number;
    question: string;
    img_path: string|null;
    count_points: number|null;
    explanation: string|null;
    type_id: number;

    answers: IAnswerTest[];

    check_is_correct?: boolean;
    is_errors?: boolean;
    new?: boolean;
}