export const state = () => ({
    typeHouse: {},
});

export const mutations = {
    setTypeHouse(state, typeHouse) {
        state.typeHouse = typeHouse;
    },
    removeTypeHouse(state) {
        state.typeHouse = {};
    },
};

export const actions = {
    async getItems({commit}) {
        const typeHouse = await this.$axios.$get('select/type-house');
        commit('setTypeHouse', typeHouse);
    },
    async removeItems({commit}) {
        commit('removeTypeHouse');
    },
};

export const getters = {
    typeHouse: (s) => s.typeHouse,
};
