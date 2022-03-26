export const state = () => ({
	services: [],
	amount: null,
	amountNew: null,
	servicesNew: [],
	service: {},
});

export const mutations = {
	setServices(state, services) {
		state.services = services;
	},
	addServices(state, services) {
		state.services.push(...services);
	},
	removeServices(state){
		state.services = [];
	},
	setService(state, service) {
		state.service = service;
	},
	setServicesNew(state, service) {
		state.servicesNew = service;
	},
	addServicesNew(state, services) {
		state.servicesNew.push(...services);
	},
	setAmountNew(state, amount) {
		state.amountNew = amount;
	},
	setAmount(state, amount) {
		state.amount = amount;
	},
};

export const actions = {
	async getItems({commit},{userID = null, status = 'active', from = null}) {
		const services = await this.$axios.$get(`services?skip=0&take=25&user_id=${userID}&status=${status}&from=${from}`);

		if(status === 'new'){
			commit('setServicesNew', services.services);
			commit('setAmountNew', services.meta.total);
		} else {
			commit('setServices', services.services);
			commit('setAmount', services.meta.total);
		}
	},
	async addItems({commit},{skip = 0, userID = null, status = 'active', from = null}) {
		const services = await this.$axios.$get(`services?skip=${skip}&take=25&user_id=${userID}&status=${status}&from=${from}`);
		if(status === 'new'){
			commit('addServicesNew', services.services);
		} else {
			commit('addServices', services.services);
		}
	},
	async removeItems({commit}) {
		commit('removeServices');
	},
	async getItem({commit},{id}) {
		const service = await this.$axios.$get( 'services/' + id);
		commit('setService', service);
	}
};

export const getters = {
	services: s => s.services,
	servicesNew: s => s.servicesNew,
	service: s => s.service,
	amount: s => s.amount,
	amountNew: s => s.amountNew,
};
