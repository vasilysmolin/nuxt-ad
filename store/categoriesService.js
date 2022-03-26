export const state = () => ({
	categoriesServices: [],
});

export const mutations = {
	setCategoriesServices(state, categoriesServices) {
		state.categoriesServices = categoriesServices;
	},
	addCategoriesServices(state, categoriesServices) {
		state.categoriesServices.push(...categoriesServices);
	},
	removeCategoriesServices(state){
		state.categoriesServices = [];
	},
};

export const actions = {
	async getItems({commit}) {
		const categoriesServices = await this.$axios.$get('category-services?skip=0&take=100');
		commit('setCategoriesServices', categoriesServices.service_categories);
	},
	async addItems({commit},{skip = 0}) {
		const categoriesServices = await this.$axios.$get(`category-services?skip=${skip}&take=25`);
		commit('addCategoriesServices', categoriesServices.service_categories);
	},
	async removeItems({commit}) {
		commit('removeCategoriesServices');
	},
};

export const getters = {
	categoriesServices: s => s.categoriesServices,
};
