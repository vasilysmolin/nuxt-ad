import {params} from '../helper/requestParams';

export const state = () => ({
  categoriesServices: [],
  category: {},
});

export const mutations = {
  setCategoriesServices(state, categoriesServices) {
    state.categoriesServices = categoriesServices;
  },
  addCategoriesServices(state, categoriesServices) {
    state.categoriesServices.push(...categoriesServices);
  },
  setCategory(state, category) {
    state.category = category;
  },
  removeCategory(state) {
    state.category = {};
  },
  removeCategoriesServices(state) {
    state.categoriesServices = [];
  },
  setCategoryServices(state, categories) {
    state.category = categories;
  },
};

export const actions = {
  async getItems({commit}) {
    const categoriesServices = await this.$axios.$get('category-services?skip=0&take=100');
    commit('setCategoriesServices', categoriesServices.service_categories);
  },
  async addItems({commit}, {skip = 0}) {
    const categoriesServices = await this.$axios.$get(`category-services?skip=${skip}&take=25`);
    commit('addCategoriesServices', categoriesServices.service_categories);
  },
  async removeItems({commit}) {
    commit('removeCategoriesServices');
  },
  async removeItem({commit}) {
    commit('removeCategory');
  },
  async getItem({commit}, {id, expand = null}) {
    const getParams = params({expand});
    const cat = await this.$axios.$get(`category-services/${id}?${getParams}`);
    commit('setCategory', cat);
  },
  async setItem({commit}, {cat}) {
    commit('setCategoryServices', cat);
  },
};

export const getters = {
  categoriesServices: (s) => s.categoriesServices,
  category: (s) => s.category,
};
