import {params} from '../helper/requestParams';

export const state = () => ({
	houses: [],
	housesFull: [],
	amount: null,
	amountNew: null,
	categoryAlias: null,
	housesNew: [],
	house: {},
});

export const mutations = {
	sethouses(state, houses) {
		state.houses = houses;
	},
	setAmountSearch(state, amount) {
		state.amountSearch = amount;
	},
	housedhouses(state, houses) {
		state.houses.push(...houses);
	},
	removehouses(state) {
		state.houses = [];
	},
	sethouse(state, house) {
		state.house = house;
	},
	sethousesNew(state, house) {
		state.housesNew = house;
	},
	setAmountNew(state, amount) {
		state.amountNew = amount;
	},
	setAmount(state, amount) {
		state.amount = amount;
	},
	sethouseCategory(state, categoryAlias) {
		state.categoryAlias = categoryAlias;
	},
	addhouse(state, houses) {
		state.houses.push(...houses);
	},
	addhouseNew(state, houses) {
		state.housesNew.push(...houses);
	},
};

export const actions = {
	async getItems({commit}, {
		skip = 0,
		skipFromFull = 0,
		take = 25,
		user_id = null,
		state = null,
		from = null,
		expand = null,
		name = null,
		alias = null,
		category_ids = null,
		filtersArray = null,
		priceFrom = null,
		priceTo = null,
		querySearch = null,
	}) {
		const getParams = params({
			user_id,
			state,
			expand,
			from,
			name,
			alias,
			filtersArray,
			category_ids,
			querySearch,
			skipFromFull,
			skip,
			take,
			priceFrom,
			priceTo,
		});
		const houses = await this.$axios.$get(`houses?${getParams}`);

		if (state === 'new') {
			commit('sethousesNew', houses.houses);
			commit('setAmountNew', houses.meta.total);
		} else {
			commit('sethouses', houses.houses);
			commit('setAmount', houses.meta.total);
		}
	},
	async sethouseCategory({commit}, {
		categoryAlias = null,
	}) {
		commit('sethouseCategory', categoryAlias);
	},

	async removeItems({commit}) {
		commit('removehouses');
	},
	async addItems({commit}, {
		skip = 0,
		user_id = null,
		state = null,
		from = null,
		expand = null,
		category_ids = null,
		name = null,
		alias = null,
		querySearch = null,
	}) {
		const getParams = params({
			user_id, state, expand, from, skip, name, alias, querySearch, category_ids
		});
		const ads = await this.$axios.$get(`houses?take=25${getParams}`);
		if (state === 'new') {
			commit('addhouseNew', ads.houses);
		} else {
			commit('addhouse', ads.houses);
		}
	},
	async getItem({commit}, {id, expand = null, querySearch = null}) {
		const getParams = params({expand, querySearch});
		const house = await this.$axios.$get(`houses/${id}?${getParams}`);
		commit('sethouse', house);
	},
};

export const getters = {
	houses: (s) => s.houses,
	housesFull: (s) => s.housesFull,
	housesNew: (s) => s.housesNew,
	house: (s) => s.house,
	amount: (s) => s.amount,
	amountNew: (s) => s.amountNew,
	categoryAlias: (s) => s.categoryAlias,
};
