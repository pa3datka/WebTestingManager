import {IDifficulty} from "~/composables/Interfaces/TestInterfaces/Response/IDifficulty";
import {ICategory} from "~/composables/Interfaces/TestInterfaces/Response/ICategory";

export interface ITest {
    id: number;
    title: string,
    slug: string,
    img_path: string,
    status: string,
    passed: number,
    average_score: number,
    difficulty: IDifficulty,
    category: ICategory
}