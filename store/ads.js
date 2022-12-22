import {params} from '../helper/requestParams';

export const state = () => ({
	ads: [],
	adsSearch: [],
	adsFull: [],
	amount: null,
	amountSearch: null,
	amountNew: null,
	categoryAlias: null,
	adsNew: [],
	ad: {},
});

export const mutations = {
	setads(state, ads) {
		state.ads = ads;
	},
	setAdsSearch(state, ads) {
		state.adsSearch = ads;
	},
	setAdsFull(state, adsFull) {
		state.adsFull = adsFull;
	},
	addads(state, ads) {
		state.ads.push(...ads);
	},
	removeads(state) {
		state.ads = [];
	},
	setad(state, ad) {
		state.ad = ad;
	},
	setadsNew(state, ad) {
		state.adsNew = ad;
	},
	addadsNew(state, ads) {
		state.adsNew.push(...ads);
	},
	setAmountNew(state, amount) {
		state.amountNew = amount;
	},
	setAmount(state, amount) {
		state.amount = amount;
	},
	setAmountSearch(state, amount) {
		state.amountSearch = amount;
	},
	setAdCategory(state, categoryAlias) {
		state.categoryAlias = categoryAlias;
	},
};

export const actions = {
	async getItemsSearch({commit}, {
		skip = 0,
		skipFromFull = 0,
		take = 25,
		user_id = null,
		state = null,
		from = null,
		expand = null,
		name = null,
		alias = null,
		filtersArray = null,
		priceFrom = null,
		priceTo = null,
		querySearch = null,
	}) {
		const getParams = params({
			user_id,
			state,
			expand,
			from,
			name,
			alias,
			filtersArray,
			querySearch,
			skipFromFull,
			skip,
			take,
			priceFrom,
			priceTo,
		});
		const ads = await this.$axios.$get(`declarations?${getParams}`);

		commit('setAdsSearch', ads.catalog_ads);
		commit('setAmountSearch', ads.meta.total);

	},
	async getItems({commit}, {
		skip = 0,
		skipFromFull = 0,
		take = 25,
		user_id = null,
		state = null,
		from = null,
		expand = null,
		name = null,
		alias = null,
		filtersArray = null,
		priceFrom = null,
		priceTo = null,
		querySearch = null,
	}) {
		const getParams = params({
			user_id,
			state,
			expand,
			from,
			name,
			alias,
			filtersArray,
			querySearch,
			skipFromFull,
			skip,
			take,
			priceFrom,
			priceTo,
		});
		const ads = await this.$axios.$get(`declarations?${getParams}`);

		if (state === 'new') {
			commit('setadsNew', ads.catalog_ads);
			commit('setAmountNew', ads.meta.total);
		} else {
			commit('setads', ads.catalog_ads);
			commit('setAmount', ads.meta.total);
		}
	},
	async setAdCategory({commit}, {
		categoryAlias = null,
	}) {
		commit('setAdCategory', categoryAlias);
	},
	async addItems({commit}, {
		skip = 0,
		user_id = null,
		state = null,
		from = null,
		expand = null,
		name = null,
		alias = null,
		querySearch = null,
	}) {
		const getParams = params({
			user_id, state, expand, from, skip, name, alias, querySearch,
		});
		const ads = await this.$axios.$get(`declarations?take=25${getParams}`);
		if (state === 'new') {
			commit('addadsNew', ads.catalog_ads);
		} else {
			commit('addads', ads.catalog_ads);
		}
	},
	async removeItems({commit}) {
		commit('removeads');
	},
	async getItem({commit}, {id, expand = null, querySearch = null}) {
		const getParams = params({expand, querySearch});
		const ad = await this.$axios.$get(`declarations/${id}?${getParams}`);
		commit('setad', ad);
	},
};

export const getters = {
	ads: (s) => s.ads,
	adsSearch: (s) => s.adsSearch,
	adsFull: (s) => s.adsFull,
	adsNew: (s) => s.adsNew,
	ad: (s) => s.ad,
	amount: (s) => s.amount,
	amountSearch: (s) => s.amountSearch,
	amountNew: (s) => s.amountNew,
	categoryAlias: (s) => s.categoryAlias,
};
