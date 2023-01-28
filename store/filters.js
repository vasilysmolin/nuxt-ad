// import { params } from '../helper/requestParams';

export const state = () => ({
  filter: null,
  parameters: {},
  type: null,
  searchType: null,
});

export const mutations = {
  setFilter(state, filter) {
    state.filter = filter;
  },
  setType(state, type) {
    state.type = type;
  },
  setSearchType(state, type) {
    state.searchType = type;
  },
  setParameters(state, parameters) {
    state.parameters = parameters;
  },
};

export const actions = {
  setItems({commit}, {filter, type}) {
    commit('setFilter', filter);
    commit('setType', type);
  },
  setParameters({commit}, {parameters}) {
    commit('setParameters', parameters);
  },
  setSearchType({commit}, {parameter}) {
    commit('setSearchType', parameter);
  },
};

export const getters = {
  filter: (s) => s.filter,
  parameters: (s) => s.parameters,
  type: (s) => s.type,
  searchType: (s) => s.searchType,
};
