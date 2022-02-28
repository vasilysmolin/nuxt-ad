export const state = () => ({
	states: {},
});

export const mutations = {
	setStates(state, states) {
		state.states = states;
	},
	removeStates(state){
		state.states = {};
	},
};

export const actions = {
	async getItems({commit}) {
		const states = await this.$axios.$get('select/states');
		commit('setStates', states);
	},
	async removeItems({commit}) {
		commit('removeStates');
	},
};

export const getters = {
	states: s => s.states,
};
