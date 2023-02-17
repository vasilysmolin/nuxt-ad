export const state = () => ({
    elite: {},
});

export const mutations = {
    setElite(state, elite) {
        state.elite = elite;
    },
    removeElite(state) {
        state.elite = {};
    },
};

export const actions = {
    async getItems({commit}) {
        const elite = await this.$axios.$get('select/elite');
        commit('setElite', elite);
    },
    async removeItems({commit}) {
        commit('removeElite');
    },
};

export const getters = {
    elite: (s) => s.elite,
};
