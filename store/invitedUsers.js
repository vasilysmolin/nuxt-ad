import {params} from '../helper/requestParams';

export const state = () => ({
  users: [],
  amount: null,
  user: {},
});

export const mutations = {
  setusers(state, users) {
    state.users = users;
  },
  addusers(state, users) {
    state.users.push(...users);
  },
  removeusers(state) {
    state.users = [];
  },
  setuser(state, user) {
    state.user = user;
  },
  setAmount(state, amount) {
    state.amount = amount;
  },
};

export const actions = {
  async getItems({commit}, {
    state = null, type = null, name = null, phone = null,
  }) {
    const getParams = params({
      type, state, name, phone,
    });
    const users = await this.$axios.$get(`invited-users?skip=0&take=25${getParams}`);
    commit('setusers', users.invited_users);
    commit('setAmount', users.meta.total);
  },
  async addItems({commit}, {
    skip = 0, state = null, type = null, name = null, phone = null,
  }) {
    const getParams = params({
      skip, type, state, name, phone,
    });
    const users = await this.$axios.$get(`invited-users?&take=25${getParams}`);
    commit('addusers', users.invited_users);

  },
  async removeItems({commit}) {
    commit('removeusers');
  },
  async getItem({commit}, {id}) {
    const user = await this.$axios.$get(`invited-users/${id}`);
    commit('setuser', user);
  },
};

export const getters = {
  users: (s) => s.users,
  user: (s) => s.user,
  amount: (s) => s.amount,
};
