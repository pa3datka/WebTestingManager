export interface ITestSettings {
    image: string,
    categoryId: number,
    title: string,
    description: string,
    evaluation_type_id: number,
    difficultyId: number,
    display_answer_type_id: number,
    shuffle_answers: boolean,
    attempts?: number,
    time?: number,
    cheating_prevention?: number,
}