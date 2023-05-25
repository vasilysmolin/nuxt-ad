import {params} from '../helper/requestParams';

export const state = () => ({
  users: [],
  user: {},
});

export const mutations = {
  setusers(state, users) {
    state.users = users;
  },
  addusers(state, users) {
    state.users.push(...users);
  },

};

export const actions = {

  async getItems({commit}, {
    state = null, type = null, name = null, phone = null
  }) {
    const getParams = params({
      type, state, name, phone
    });
    const users = await this.$axios.$get(`users?skip=0&take=25${getParams}`);

    commit('setusers', users.users);
    commit('setAmount', users.current_page);
  },

};

export const getters = {
  users: (s) => s.users,
  user: (s) => s.user,
};
