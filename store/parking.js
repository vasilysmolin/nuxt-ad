export const state = () => ({
    parking: {},
});

export const mutations = {
    setParking(state, parking) {
        state.parking = parking;
    },
    removeParking(state) {
        state.parking = {};
    },
};

export const actions = {
    async getItems({commit}) {
        const parking = await this.$axios.$get('select/parking');
        commit('setParking', parking);
    },
    async removeItems({commit}) {
        commit('removeParking');
    },
};

export const getters = {
    parking: (s) => s.parking,
};
