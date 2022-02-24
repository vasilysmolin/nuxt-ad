export const state = () => ({
	education: {},
});

export const mutations = {
	setEducation(state, education) {
		state.education = education;
	},
	removeEducation(state){
		state.education = {};
	},
};

export const actions = {
	async getItems({commit}) {
		const education = await this.$axios.$get('select/educations');
		commit('setEducation', education);
	},
	async removeItems({commit}) {
		commit('removeEducation');
	},
};

export const getters = {
	education: s => s.education,
};
