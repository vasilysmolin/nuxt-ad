export const state = () => ({
    searchLogs: {},
});

export const mutations = {
    setSearchLogs(state, searchLogs) {
        state.searchLogs = searchLogs;
    },
    removeSearchLogs(state) {
        state.searchLogs = {};
    },
};

export const actions = {
    async getItems({commit}) {
        const searchLogs = await this.$axios.$get('search-logs');
        commit('setSearchLogs', searchLogs);
    },
    async removeItems({commit}) {
        commit('removeSearchLogs');
    },
};

export const getters = {
    searchLogs: (s) => s.searchLogs,
};
