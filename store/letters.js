// import {params} from "../helper/requestParams";

export const state = () => ({
	letters: [],
	amount: null,
});

export const mutations = {
	setletters(state, letters) {
		state.letters = letters;
	},
	addletters(state, letters) {
		state.letters.push(...letters);
	},
	removeletters(state){
		state.letters = {};
	},
	setColor(state, color) {
		state.color = color;
	},
	setAmount(state, amount) {
		state.amount = amount;
	},
};

export const actions = {
	async getItems({commit}) {
		const letters = await this.$axios.$get('newsletters');
		commit('setletters', letters.newsletters);
		commit('setAmount', letters.meta.total);
	},
	async addItems({commit},{skip = 0}) {
		const letters = await this.$axios.$get(`newsletters?skip=${skip}&take=25`);
		commit('addletters', letters.newsletters);
	},
	async removeItems({commit}) {
		commit('removeletters');
	},
};

export const getters = {
	letters: s => s.letters,
};
