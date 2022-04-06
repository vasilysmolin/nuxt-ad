export const state = () => ({
    salary_type: {},
});

export const mutations = {
    setSalary(state, salary_type) {
        state.salary_type = salary_type;
    },
    removeSalary(state){
        state.salary_type = {};
    },
};

export const actions = {
    async getItems({commit}) {
        const salary_type = await this.$axios.$get('select/salary');
        commit('setSalary', salary_type);
    },
    async removeItems({commit}) {
        commit('removeSalary');
    },
};

export const getters = {
    salary_type: s => s.salary_type,
};
