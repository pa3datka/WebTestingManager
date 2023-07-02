export interface IAnswerTest {
    id: number;
    answer_text: string|null;
    answer_img: string|null;
    is_correct: boolean;
    sequence: number|null;
    question_id?: number;

    error_text?: string|undefined;
    new?: boolean;
}