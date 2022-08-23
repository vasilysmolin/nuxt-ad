import {params} from '../helper/requestParams';

export const state = () => ({
  colors: [],
  color: {},
});

export const mutations = {
  setColors(state, colors) {
    state.colors = colors;
  },
  addColors(state, colors) {
    state.colors.push(...colors);
  },
  removeColors(state) {
    state.colors = {};
  },
  setColor(state, color) {
    state.color = color;
  },
};

export const actions = {
  async getItems({commit}) {
    const colors = await this.$axios.$get('colors');
    commit('setColors', colors.colors);
  },
  async addItems({commit}, {skip = 0}) {
    const colors = await this.$axios.$get(`colors?skip=${skip}&take=25`);
    commit('addColors', colors.colors);
  },
  async removeItems({commit}) {
    commit('removeColors');
  },
  async getItem({commit}, {id, expand = null}) {
    const getParams = params({expand});
    const ad = await this.$axios.$get(`colors/${id}?${getParams}`);
    commit('setColor', ad);
  },
};

export const getters = {
  colors: (s) => s.colors,
  color: (s) => s.color,
};
