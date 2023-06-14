export interface IQuestionAnswer {
    id: number;
    is_correct: boolean;
    sequence?: number;
    answer_text?: string;
    answer_img?: string;
    is_errors: boolean;
    error_text?: string;
}