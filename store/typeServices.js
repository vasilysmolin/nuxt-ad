export const state = () => ({
	types: {},
});

export const mutations = {
	setTypes(state, types) {
		state.types = types;
	},
	removeTypes(state){
		state.types = {};
	},
};

export const actions = {
	async getItems({commit}) {
		const types = await this.$axios.$get('select/type-services');
		commit('setTypes', types);
	},
	async removeItems({commit}) {
		commit('removeTypes');
	},
};

export const getters = {
	types: s => s.types,
};
