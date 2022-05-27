import { params } from '../helper/requestParams';

export const state = () => ({
	cities: [],
	citiesFull: [],
	amount: null,
	city: {},
});

export const mutations = {
	setcities(state, cities) {
		state.cities = cities;
	},
	setCitiesFull(state, citiesFull) {
		state.citiesFull = citiesFull;
	},
	removeCitiesFull(state){
		state.citiesFull = [];
	},
	citydcities(state, cities) {
		state.cities.push(...cities);
	},
	removecities(state){
		state.cities = [];
	},
	setcity(state, city) {
		state.city = city;
	},
	setAmount(state, amount) {
		state.amount = amount;
	},
};

export const actions = {
	async getItems({commit},{
		user_id = null,
		state = null,
		from = null,
		expand = null,
		name = null,
		alias = null,
	}) {
		const getParams = params({user_id,state,expand,from,name,alias});
		const cities = await this.$axios.$get(`cities?skip=0&take=25${getParams}`);
		commit('setcities', cities.cities);
		commit('setAmount', cities.meta.total);

	},
	async getItemsFull({commit},{
		query = null,
	}) {
		const getParams = params({query});
		const citiesFull = await this.$axios.$get(`cities-full?take=10${getParams}`);
		commit('setCitiesFull', citiesFull.cities);
	},
	async citydItems({commit},{
		skip = 0,
		user_id = null,
		state = null,
		from = null,
		expand = null,
		name = null,
		alias = null,
	}) {
		const getParams = params({user_id,state,expand,from,skip,name,alias});
		const cities = await this.$axios.$get(`cities?take=25${getParams}`);
		commit('citydcities', cities.cities);

	},
	async removeItems({commit}) {
		commit('removecities');
	},
	async removeItemsFull({commit}) {
		commit('removeCitiesFull');
	},
	async getItem({commit},{id,expand = null}) {
		const getParams = params({expand});
		const city = await this.$axios.$get( `cities/${id}?${getParams}`);
		commit('setcity', city);
	}
};

export const getters = {
	cities: s => s.cities,
	citiesFull: s => s.citiesFull,
	citiesNew: s => s.citiesNew,
	city: s => s.city,
	amount: s => s.amount,
	amountNew: s => s.amountNew,
};
