export const state = () => ({
    deadLine: {},
});

export const mutations = {
    setDeadLine(state, deadLine) {
        state.deadLine = deadLine;
    },
    removeDeadLine(state) {
        state.deadLine = {};
    },
};

export const actions = {
    async getItems({commit}) {
        const deadLine = await this.$axios.$get('select/deadline');
        commit('setDeadLine', deadLine);
    },
    async removeItems({commit}) {
        commit('removeDeadLine');
    },
};

export const getters = {
    deadLine: (s) => s.deadLine,
};
