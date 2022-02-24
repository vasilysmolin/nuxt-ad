export const state = () => ({
	schedule: {},
});

export const mutations = {
	setSchedule(state, schedule) {
		state.schedule = schedule;
	},
	removeSchedule(state){
		state.schedule = {};
	},
};

export const actions = {
	async getItems({commit}) {
		const schedule = await this.$axios.$get('select/schedules');
		commit('setSchedule', schedule);
	},
	async removeItems({commit}) {
		commit('removeSchedule');
	},
};

export const getters = {
	schedule: s => s.schedule,
};
