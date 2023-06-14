export interface IAnswer {
    id: number;
    is_correct: boolean;
    sequence: number|null;
    answer_text: string;
    answer_img: string;
}