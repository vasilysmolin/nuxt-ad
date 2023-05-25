import {params} from '../helper/requestParams';

export const state = () => ({
	ads: [],
	page: null,
	ad: null,
});

export const mutations = {
	setads(state, ads) {
		state.ads = ads;
	},
	addads(state, ads) {
		state.ads.push(...ads);
	},
	removeads(state) {
		state.ads = [];
	},
	setPage(state, amount) {
		state.page = amount;
	},
};

export const actions = {

	async getItems({commit}, {
		page = 1,
	}) {
		const getParams = params({
			page,
		});
		const ads = await this.$axios.$get(`my/ads?${getParams}`);

		commit('setads', ads.data);
		commit('setPage', ads.current_page);
	},

	async addItems({commit}, {
		page = 1,
	}) {
		const getParams = params({
			page,
		});
		const ads = await this.$axios.$get(`my/ads?${getParams}`);
		commit('addads', ads.data);
		commit('setPage', ads.current_page);
	},

	async getItem({commit}, {id, expand = null, querySearch = null}) {
		const getParams = params({expand, querySearch});
		const ad = await this.$axios.$get(`my/ads/${id}?${getParams}`);
		commit('setad', ad);
	},
};

export const getters = {
	ads: (s) => s.ads,
	ad: (s) => s.ad,
	page: (s) => s.page,
};
