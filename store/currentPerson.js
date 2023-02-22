export const state = () => ({
  isPerson: false,
});

export const mutations = {
  remove(state) {
    state.isPerson = null;
  },
  add(state, person) {
    state.isPerson = person;
  },
};

export const actions = {
  async addPerson({commit}, {person}) {
    commit('add', person);
  },
  async removePerson({commit}) {
    commit('remove');
  },
};

export const getters = {
  isPerson: (s) => s.isPerson,
};
