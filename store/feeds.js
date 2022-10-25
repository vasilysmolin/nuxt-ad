import {params} from '../helper/requestParams';

export const state = () => ({
  feeds: [],
  amount: null,
  feed: {},
});

export const mutations = {
  setfeeds(state, feeds) {
    state.feeds = feeds;
  },
  removefeeds(state) {
    state.feeds = [];
  },
  setfeed(state, feed) {
    state.feed = feed;
  },
  setAmount(state, amount) {
    state.amount = amount;
  },
};

export const actions = {
  async getItems({commit}, {
    user_id = null,
    state = null,
    from = null,
    expand = null,
    name = null,
    alias = null,
  }) {
    const getParams = params({
      user_id, state, expand, from, name, alias,
    });
    const feeds = await this.$axios.$get(`feeds?skip=0&take=25${getParams}`);
    commit('setfeeds', feeds.feeds);
    commit('setAmount', feeds.meta.total);
  },
  async removeItems({commit}) {
    commit('removefeeds');
  },
  async removeItemsFull({commit}) {
    commit('removefeedsFull');
  },
  async getItem({commit}, {id, expand = null}) {
    const getParams = params({expand});
    const feed = await this.$axios.$get(`feeds/${id}?${getParams}`);
    commit('setfeed', feed);
  },
};

export const getters = {
  feeds: (s) => s.feeds,
  feed: (s) => s.feed,
  amount: (s) => s.amount,
};
