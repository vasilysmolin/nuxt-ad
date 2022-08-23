export const state = () => ({
    experience: {},
});

export const mutations = {
    setExperience(state, experience) {
        state.experience = experience;
    },
    removeExperience(state) {
        state.experience = {};
    },
};

export const actions = {
    async getItems({commit}) {
        const experience = await this.$axios.$get('select/experience');
        commit('setExperience', experience);
    },
    async removeItems({commit}) {
        commit('removeExperience');
    },
};

export const getters = {
    experience: (s) => s.experience,
};
