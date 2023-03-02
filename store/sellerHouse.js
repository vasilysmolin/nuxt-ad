export const state = () => ({
  seller: {},
});

export const mutations = {
  setSeller(state, user) {
    state.seller = user;
  },
  removeSeller(state) {
    state.seller = {};
  },
};

export const actions = {

  async getItem({commit}, {id}) {
    const user = await this.$axios.$get(`seller-houses/${id}`);
    commit('setSeller', user);
  },
  async removeItem({commit}) {
    commit('removeSeller');
  },
};

export const getters = {
  seller: (s) => s.seller,
};
