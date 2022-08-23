export const state = () => ({
    categoriesVacancies: [],
});

export const mutations = {
    setCategoriesVacancies(state, categoriesVacancies) {
        state.categoriesVacancies = categoriesVacancies;
    },
    addCategoriesVacancies(state, categoriesVacancies) {
        state.categoriesVacancies.push(...categoriesVacancies);
    },
    removeCategoriesVacancies(state) {
        state.categoriesVacancies = [];
    },
};

export const actions = {
    async getItems({commit}) {
        const categoriesVacancies = await this.$axios.$get('category-vacancies?skip=0&take=100');
        commit('setCategoriesVacancies', categoriesVacancies.jobs_vacancy_categories);
    },
    async addItems({commit}, {skip = 0}) {
        const categoriesVacancies = await this.$axios.$get(`category-vacancies?skip=${skip}&take=25`);
        commit('addCategoriesVacancies', categoriesVacancies.jobs_vacancy_categories);
    },
    async removeItems({commit}) {
        commit('removeCategoriesVacancies');
    },
};

export const getters = {
    categoriesVacancies: (s) => s.categoriesVacancies,
};
