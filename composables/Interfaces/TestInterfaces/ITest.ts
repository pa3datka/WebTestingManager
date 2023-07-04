import {IUserTest} from "~/composables/Interfaces/TestInterfaces/IUserTest";
import {ICategoryTest} from "~/composables/Interfaces/TestInterfaces/ICategoryTest";
import {IDifficultyTest} from "~/composables/Interfaces/TestInterfaces/IDifficultyTest";
import {IEvaluationTest} from "~/composables/Interfaces/TestInterfaces/IEvaluationTest";
import {IQuestionTest} from "~/composables/Interfaces/TestInterfaces/IQuestionTest";

export interface ITest {
    id: number;
    title: string;
    slug?: string;
    description?: string;
    img_path: string;
    shuffle_answers?: boolean;
    attempts?: number|null;
    time?: number|null;
    cheating_prevention?: number|null;
    count_question?: number;
    lang?: string;
    status?: string;
    passed?: number;
    average_score?: number;
    average_time?: number;
    rating?: number;

    user_id?: number;
    user?: IUserTest;

    category_id?: number;
    category?: ICategoryTest;

    difficulty_id?: number;
    difficulty?: IDifficultyTest;

    evaluation_id?: number;
    evaluation?: IEvaluationTest;

    display_answer_id?: number;
    display_answer?: IDifficultyTest;

    questions?: IQuestionTest[];

    created_at?: string;
}