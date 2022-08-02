import {params} from "../helper/requestParams";

export const state = () => ({
	categoriesAds: [],
	categoriesAdsFull: [],
	categoryAds: {},
});

export const mutations = {
	setcategoriesAds(state, categoriesAds) {
		state.categoriesAds = categoriesAds;
	},
	setcategoriesAdsFull(state, categoriesAdsFull) {
		state.categoriesAdsFull = categoriesAdsFull;
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
	removecategoryAds(state){
		state.categoryAds = {};
	},
};

export const actions = {
	async getItems({commit},{
		from = null
	}) {
		const getParams = params({ from });
		const categoriesAds = await this.$axios.$get(`category-declarations?skip=0&take=100${getParams}`);
		commit('setcategoriesAds', categoriesAds.catalog_ad_categories);
	},
	async getItemsFull({commit},{
		from = null,
		querySearch = null
	}) {
		const getParams = params({ from,querySearch });
		const categoriesAdsFull = await this.$axios.$get(`category-declarations-full?take=5${getParams}`);
		commit('setcategoriesAdsFull', categoriesAdsFull.catalog_ad_categories);
	},
	async addItems({commit},{skip = 0}) {
		const categoriesAds = await this.$axios.$get(`category-declarations?skip=${skip}&take=25`);
		commit('addcategoriesAds', categoriesAds.catalog_ad_categories);
	},
	async removeItems({commit}) {
		commit('removecategoriesAds');
	},
	async removeItem({commit}) {
		commit('removecategoryAds');
	},
	async getItem({commit},{id,expand = null}) {
		const getParams = params({expand});
		const catAd = await this.$axios.$get( `category-declarations/${id}?${getParams}`);
		commit('setcategoryAds', catAd);
	},
	async setItem({commit},{cat}) {
		commit('setcategoryAds', cat);
	}
};

export const getters = {
	categoriesAds: s => s.categoriesAds,
	categoriesAdsFull: s => s.categoriesAdsFull,
	categoryAds: s => s.categoryAds,
};
