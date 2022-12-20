import {params} from '../helper/requestParams';

export const state = () => ({
  categoriesRealties: [],
  categoriesRealtiesFull: [],
  categoryRealties: {},
});

export const mutations = {
  setcategoriesRealties(state, categoriesRealties) {
    state.categoriesRealties = categoriesRealties;
  },
  setcategoriesRealtiesFull(state, categoriesRealtiesFull) {
    state.categoriesRealtiesFull = categoriesRealtiesFull;
  },
  setcategoryRealties(state, categoriesRealties) {
    state.categoryRealties = categoriesRealties;
  },
  addcategoriesRealties(state, categoriesRealties) {
    state.categoriesRealties.push(...categoriesRealties);
  },
  removecategoriesRealties(state) {
    state.categoriesRealties = [];
  },
  removecategoryRealties(state) {
    state.categoryRealties = {};
  },
};

export const actions = {
  async getItems({commit}, {
    from = null,
      id = null
  }) {
    const getParams = params({from, id});
    const categoriesRealties = await this.$axios.$get(`category-realties?skip=0&take=100${getParams}`);
    commit('setcategoriesRealties', categoriesRealties.realty_categories);
  },
  async getItemsFull({commit}, {
    from = null,
    querySearch = null,
  }) {
    const getParams = params({from, querySearch});
    const categoriesRealtiesFull = await this.$axios.$get(`category-realties-full?take=5${getParams}`);
    commit('setcategoriesRealtiesFull', categoriesRealtiesFull.realty_categories);
  },
  async addItems({commit}, {skip = 0}) {
    const categoriesRealties = await this.$axios.$get(`category-realties?skip=${skip}&take=25`);
    commit('addcategoriesRealties', categoriesRealties.realty_categories);
  },
  async removeItems({commit}) {
    commit('removecategoriesRealties');
  },
  async removeItem({commit}) {
    commit('removecategoryRealties');
  },
  async getItem({commit}, {id, expand = null}) {
    const getParams = params({expand});
    const catAd = await this.$axios.$get(`category-realties/${id}?${getParams}`);
    commit('setcategoryRealties', catAd);
  },
  async setItem({commit}, {cat}) {
    commit('setcategoryRealties', cat);
  },
};

export const getters = {
  categoriesRealties: (s) => s.categoriesRealties,
  categoriesRealtiesFull: (s) => s.categoriesRealtiesFull,
  categoryRealties: (s) => s.categoryRealties,
};
