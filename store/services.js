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
	async getItems({commit},{
		skip = 0,
		skipFromFull = 0,
		take = 25,
		user_id = null,
		state = null,
		from = null,
		expand = null,
		alias = null,
		name = null
	}) {
		const getParams = params({user_id,state,expand,from,name,alias,skipFromFull,skip,take});
		const services = await this.$axios.$get(`services?${getParams}`);

		if(state === 'new'){
			commit('setServicesNew', services.services);
			commit('setAmountNew', services.meta.total);
		} else {
			commit('setServices', services.services);
			commit('setAmount', services.meta.total);
		}
	},
	async addItems({commit},{
		skip = 0,
		user_id = null,
		state = null,
		from = null,
		expand = null,
		alias = null,
		name = null
	}) {
		const getParams = params({user_id,state,expand,from,skip,name,alias});
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
	async getItem({commit},{id,expand = null}) {
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
