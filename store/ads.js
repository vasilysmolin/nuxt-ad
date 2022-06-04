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
		user_id = null,
		state = null,
		from = null,
		expand = null,
		name = null,
		alias = null,
		filtersArray = null,
	}) {
		const getParams = params({user_id,state,expand,from,name,alias,filtersArray});
		const ads = await this.$axios.$get(`declarations?skip=0&take=25${getParams}`);

		if(state === 'new'){
			commit('setadsNew', ads.catalog_ads);
			commit('setAmountNew', ads.meta.total);
		} else {
			commit('setads', ads.catalog_ads);
			commit('setAmount', ads.meta.total);
		}
	},
	async getItemsFull({commit},{
		query = null,
	}) {
		const getParams = params({query});
		const adsFull = await this.$axios.$get(`declarations-full?take=10${getParams}`);
		commit('setAdsFull', adsFull.catalog_ads);
	},
	async addItems({commit},{
		skip = 0,
		user_id = null,
		state = null,
		from = null,
		expand = null,
		name = null,
		alias = null,
	}) {
		const getParams = params({user_id,state,expand,from,skip,name,alias});
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
	async getItem({commit},{id,expand = null}) {
		const getParams = params({expand});
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
