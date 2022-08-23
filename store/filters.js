// import { params } from '../helper/requestParams';

export const state = () => ({
	filter: null,
	parameters: {},
	type: null,
});

export const mutations = {
	setFilter(state, filter) {
		state.filter = filter;
	},
	setType(state, type) {
		state.type = type;
	},
	setParameters(state, parameters) {
		state.parameters = parameters;
	},
};

export const actions = {
	setItems({commit},{filter, type}) {
		commit('setFilter', filter);
		commit('setType', type);
	},
	setParameters({commit},{parameters}) {
		commit('setParameters', parameters);
	},
};

export const getters = {
	filter: s => s.filter,
	parameters: s => s.parameters,
	type: s => s.type,
};
