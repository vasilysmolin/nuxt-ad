export const state = () => ({
    categoriesResumes: [],
});

export const mutations = {
    setCategoriesResumes(state, categoriesResumes) {
        state.categoriesResumes = categoriesResumes;
    },
    addCategoriesResumes(state, categoriesResumes) {
        state.categoriesResumes.push(...categoriesResumes);
    },
    removeCategoriesResumes(state) {
        state.categoriesResumes = [];
    },
};

export const actions = {
    async getItems({commit}) {
        const categoriesResumes = await this.$axios.$get('category-resume?skip=0&take=100');
        commit('setCategoriesResumes', categoriesResumes.jobs_resumes_categories);
    },
    async addItems({commit}, {skip = 0}) {
        const categoriesResumes = await this.$axios.$get(`category-resume?skip=${skip}&take=25`);
        commit('addCategoriesResumes', categoriesResumes.jobs_resumes_categories);
    },
    async removeItems({commit}) {
        commit('removeCategoriesResumes');
    },
};

export const getters = {
    categoriesResumes: (s) => s.categoriesResumes,
};
