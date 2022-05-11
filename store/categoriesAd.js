import {params} from "../helper/requestParams";

export const state = () => ({
	categoriesAds: [],
	categoryAds: {},
});

export const mutations = {
	setcategoriesAds(state, categoriesAds) {
		state.categoriesAds = categoriesAds;
	},
	setcategoryAds(state, categoriesAds) {
		state.categoryAds = categoriesAds;
	},
	addcategoriesAds(state, categoriesAds) {
		state.categoriesAds.push(...categoriesAds);
	},
	removecategoriesAds(state){
		state.categoriesAds = [];
	},
};

export const actions = {
	async getItems({commit}) {
		const categoriesAds = await this.$axios.$get('category-declarations?skip=0&take=100');
		commit('setcategoriesAds', categoriesAds.catalog_ad_categories);
	},
	async addItems({commit},{skip = 0}) {
		const categoriesAds = await this.$axios.$get(`category-declarations?skip=${skip}&take=25`);
		commit('addcategoriesAds', categoriesAds.catalog_ad_categories);
	},
	async removeItems({commit}) {
		commit('removecategoriesAds');
	},
	async getItem({commit},{id,expand = null}) {
		const getParams = params({expand});
		const catAd = await this.$axios.$get( `category-declarations/${id}?${getParams}`);
		commit('setcategoryAds', catAd);
	}
};

export const getters = {
	categoriesAds: s => s.categoriesAds,
	categoryAds: s => s.categoryAds,
};
