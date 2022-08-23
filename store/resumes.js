import {params} from '../helper/requestParams';

export const state = () => ({
  resumes: [],
  resumesNew: [],
  amount: null,
  amountNew: null,
  resume: {},
});

export const mutations = {
  setResumes(state, resumes) {
    state.resumes = resumes;
  },
  addResumes(state, resumes) {
    state.resumes.push(...resumes);
  },
  removeresumes(state) {
    state.resumes = [];
  },
  setresume(state, resume) {
    state.resume = resume;
  },
  setResumesNew(state, resumes) {
    state.resumesNew = resumes;
  },
  addResumesNew(state, resumes) {
    state.resumesNew.push(...resumes);
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
    skip = 0,
    skipFromFull = 0,
    take = 25,
    user_id = null,
    state = null,
    from = null,
    expand = null,
    name = null,
    querySearch = null,
    filtersArray = null,
    priceFrom = null,
    priceTo = null,
  }) {
    const getParams = params({
      user_id, state, expand, from, name, skipFromFull, skip, take, querySearch, priceFrom, priceTo, filtersArray,
    });
    const resumes = await this.$axios.$get(`resume?${getParams}`);
    if (state === 'new') {
      commit('setResumesNew', resumes.jobs_resumes);
      commit('setAmountNew', resumes.meta.total);
    } else {
      commit('setResumes', resumes.jobs_resumes);
      commit('setAmount', resumes.meta.total);
    }
  },
  async addItems({commit}, {
    skip = 0, user_id = null, state = null, from = null, expand = null, name = null,
  }) {
    const getParams = params({
      user_id, state, expand, from, skip, name,
    });
    const resumes = await this.$axios.$get(`resume?take=25${getParams}`);
    if (state === 'new') {
      commit('addResumesNew', resumes.jobs_resumes);
    } else {
      commit('addResumes', resumes.jobs_resumes);
    }
  },
  async removeItems({commit}) {
    commit('removeresumes');
  },
  async getItem({commit}, {id, expand = null}) {
    const getParams = params({expand});
    commit('setresume', {});
    if (id) {
      await this.$axios.$get(`resume/${id}?${getParams}`).then((response) => {
        commit('setresume', response);
      });
    }
  },
};

export const getters = {
  resumes: (s) => s.resumes,
  resumesNew: (s) => s.resumesNew,
  resume: (s) => s.resume,
  amount: (s) => s.amount,
  amountNew: (s) => s.amountNew,
};
