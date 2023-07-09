export interface IAnswerTest {
    id: number;
    answer_text?: string;
    answer_img?: string;
    is_correct: boolean;
    sequence?: number;
    question_id?: number;

    error_text?: string;
    new?: boolean;
}