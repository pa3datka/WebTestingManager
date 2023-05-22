import { defineStore } from 'pinia'
import { ISelection } from "~/composables/Interfaces/ComponentIntefaces/ISelection";

export const useCategoriesStore = defineStore('categories', {

    state: () => {
        return {
            categories: <ISelection[]> [
                {id: 1, name: 'mathematics', svg: 'home', color: 'strong-cyan'},
                {id: 2, name: 'history', svg: 'home', color: 'light-grayish-red'},
                {id: 3, name: 'language', svg: 'home', color: 'soft-navy'},
                {id: 4, name: 'geometry', svg: 'home', color: 'bright-red'},
                {id: 5, name: 'physics', svg: 'home', color: 'primary'}
            ]
        }
    },

    getters:{
       getCategories: (state): ISelection[] => state.categories,
    },

    actions:{},
});