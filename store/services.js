import { params } from '../helper/requestParams';

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
	async getItems({commit},{userID = null, state = 'active', from = null, expand = null}) {
		const getParams = params({userID,state,expand,from});
		const services = await this.$axios.$get(`services?skip=0&take=25${getParams}`);

		if(state === 'new'){
			commit('setServicesNew', services.services);
			commit('setAmountNew', services.meta.total);
		} else {
			commit('setServices', services.services);
			commit('setAmount', services.meta.total);
		}
	},
	async addItems({commit},{skip = 0, userID = null, state = 'active', from = null, expand = null}) {
		const getParams = params({userID,state,expand,from,skip});
		const services = await this.$axios.$get(`services?take=25${getParams}`);
		if(state === 'new'){
			commit('addServicesNew', services.services);
		} else {
			commit('addServices', services.services);
		}
	},
	async removeItems({commit}) {
		commit('removeServices');
	},
	async getItem({commit},{id,expand}) {
		const getParams = params({expand});
		const service = await this.$axios.$get( `services/${id}?${getParams}`);
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
