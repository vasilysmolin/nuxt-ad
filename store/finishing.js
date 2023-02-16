export const state = () => ({
    finishing: {},
});

export const mutations = {
    setFinishing(state, finishing) {
        state.finishing = finishing;
    },
    removeFinishing(state) {
        state.finishing = {};
    },
};

export const actions = {
    async getItems({commit}) {
        const finishing = await this.$axios.$get('select/finishing');
        commit('setFinishing', finishing);
    },
    async removeItems({commit}) {
        commit('removeFinishing');
    },
};

export const getters = {
    finishing: (s) => s.finishing,
};
