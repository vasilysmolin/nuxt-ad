import {params} from '../helper/requestParams';

export const state = () => ({
  users: [],
  accounts: [],
  amount: null,
  amountNew: null,
  usersBlock: [],
  usersNew: [],
  user: {},
  currentAccount: {},
});

export const mutations = {
  setusers(state, users) {
    state.users = users;
  },
  setAccounts(state, users) {
    state.accounts = users;
  },
  setusersnew(state, users) {
    state.usersNew = users;
  },
  addusers(state, users) {
    state.users.push(...users);
  },
  addusersnew(state, users) {
    state.usersNew.push(...users);
  },
  removeusers(state) {
    state.users = [];
  },
  setuser(state, user) {
    state.user = user;
  },
  setCurrentAccount(state, user) {
    state.currentAccount = user;
  },
  setAmountNew(state, amount) {
    state.amountNew = amount;
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
    const users = await this.$axios.$get(`users?skip=0&take=25${getParams}`);
    if (state === 'new') {
      commit('setusersnew', users.users);
      commit('setAmountNew', users.meta.total);
    } else {
      commit('setusers', users.users);
      commit('setAmount', users.meta.total);
    }
  },
  async getAccounts({commit}, {
    state = null, type = null, name = null, phone = null,
  }) {
    // const getParams = params({
    //   type, state, name, phone,
    // });
    const users = await this.$axios.$get(`users/accounts`);
    commit('setAccounts', users.users);
  },
  async addItems({commit}, {
    skip = 0, state = null, type = null, name = null, phone = null,
  }) {
    const getParams = params({
      skip, type, state, name, phone,
    });
    const users = await this.$axios.$get(`users?&take=25${getParams}`);
    if (type === 'new') {
      commit('addusersnew', users.users);
    } else {
      commit('addusers', users.users);
    }
  },
  async removeItems({commit}) {
    commit('removeusers');
  },
  async getItem({commit}, {id}) {
    const user = await this.$axios.$get(`users/${id}`);
    commit('setuser', user);
  },
  async getCurrentAccount({commit}) {
    const user = await this.$axios.$get(`users/accounts/current`);
    commit('setCurrentAccount', user);
  },
};

export const getters = {
  users: (s) => s.users,
  currentAccount: (s) => s.currentAccount,
  accounts: (s) => s.accounts,
  usersBlock: (s) => s.usersBlock,
  usersNew: (s) => s.usersNew,
  user: (s) => s.user,
  amount: (s) => s.amount,
  amountNew: (s) => s.amountNew,
};
