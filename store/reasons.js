export const state = () => ({
    reasons: {},
});

export const mutations = {
    setReasons(reason, reasons) {
        reason.reasons = reasons;
    },
    removeReasons(reason) {
        reason.reasons = {};
    },
};

export const actions = {
    async getItems({commit}) {
        const reasons = await this.$axios.$get('select/reasons');
        commit('setReasons', reasons);
    },
    async removeItems({commit}) {
        commit('removeReasons');
    },
};

export const getters = {
    reasons: (s) => s.reasons,
};
