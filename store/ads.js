import { params } from '../helper/requestParams';

export const state = () => ({
	ads: [],
	adsFull: [],
	amount: null,
	amountNew: null,
	adsNew: [],
	ad: {},
});

export const mutations = {
	setads(state, ads) {
		state.ads = ads;
	},
	setAdsFull(state, adsFull) {
		state.adsFull = adsFull;
	},
	addads(state, ads) {
		state.ads.push(...ads);
	},
	removeads(state){
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
};

export const actions = {
	async getItems({commit},{
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
		const getParams = params({user_id,state,expand,from,name,alias,filtersArray,querySearch,skipFromFull,skip,take,priceFrom,priceTo});
		const ads = await this.$axios.$get(`declarations?${getParams}`);

		if(state === 'new'){
			commit('setadsNew', ads.catalog_ads);
			commit('setAmountNew', ads.meta.total);
		} else {
			commit('setads', ads.catalog_ads);
			commit('setAmount', ads.meta.total);
		}
	},
	// async getItemsFull({commit},{
	// 	querySearch = null,
	// }) {
	// 	const getParams = params({querySearch});
	// 	const adsFull = await this.$axios.$get(`declarations-full?take=10${getParams}`);
	// 	commit('setAdsFull', adsFull.catalog_ads);
	// },
	async addItems({commit},{
		skip = 0,
		user_id = null,
		state = null,
		from = null,
		expand = null,
		name = null,
		alias = null,
		querySearch = null,
	}) {
		const getParams = params({user_id,state,expand,from,skip,name,alias,querySearch});
		const ads = await this.$axios.$get(`declarations?take=25${getParams}`);
		if(state === 'new'){
			commit('addadsNew', ads.catalog_ads);
		} else {
			commit('addads', ads.catalog_ads);
		}
	},
	async removeItems({commit}) {
		commit('removeads');
	},
	async getItem({commit},{id,expand = null, querySearch = null}) {
		const getParams = params({expand, querySearch});
		const ad = await this.$axios.$get( `declarations/${id}?${getParams}`);
		commit('setad', ad);
	}
};

export const getters = {
	ads: s => s.ads,
	adsFull: s => s.adsFull,
	adsNew: s => s.adsNew,
	ad: s => s.ad,
	amount: s => s.amount,
	amountNew: s => s.amountNew,
};
