import { params } from '../helper/requestParams';

export const state = () => ({
	filter: null,
	type: null,
});

export const mutations = {
	setFilter(state, filter) {
		state.filter = filter;
	},
	setType(state, type) {
		state.type = type;
	},
};

export const actions = {
	setItems({commit},{filter, type}) {
		commit('setFilter', filter);
		commit('setType', type);
	},
};

export const getters = {
	filter: s => s.filter,
	type: s => s.type,
};
