export const state = () => ({
	categoriesAds: [],
});

export const mutations = {
	setcategoriesAds(state, categoriesAds) {
		state.categoriesAds = categoriesAds;
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
		const categoriesAds = await this.$axios.$get('category-ads?skip=0&take=100');
		commit('setcategoriesAds', categoriesAds.catalog_ad_categories);
	},
	async addItems({commit},{skip = 0}) {
		const categoriesAds = await this.$axios.$get(`category-ads?skip=${skip}&take=25`);
		commit('addcategoriesAds', categoriesAds.catalog_ad_categories);
	},
	async removeItems({commit}) {
		commit('removecategoriesAds');
	},
};

export const getters = {
	categoriesAds: s => s.categoriesAds,
};
