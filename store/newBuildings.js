import {params} from '../helper/requestParams';

export const state = () => ({
	realties: [],
	realtiesSearch: [],
	realtiesFull: [],
	amount: null,
	amountSearch: null,
	amountNew: null,
	categoryAlias: null,
	realtiesNew: [],
	realty: {},
});

export const mutations = {
	setrealties(state, realties) {
		state.realties = realties;
	},
	setRealtiesSearch(state, realties) {
		state.realtiesSearch = realties;
	},
	setAmountSearch(state, amount) {
		state.amountSearch = amount;
	},
	setrealtiesFull(state, realtiesFull) {
		state.realtiesFull = realtiesFull;
	},
	realtydrealties(state, realties) {
		state.realties.push(...realties);
	},
	removerealties(state) {
		state.realties = [];
	},
	setrealty(state, realty) {
		state.realty = realty;
	},
	setrealtiesNew(state, realty) {
		state.realtiesNew = realty;
	},
	realtydrealtiesNew(state, realties) {
		state.realtiesNew.push(...realties);
	},
	setAmountNew(state, amount) {
		state.amountNew = amount;
	},
	setAmount(state, amount) {
		state.amount = amount;
	},
	setrealtyCategory(state, categoryAlias) {
		state.categoryAlias = categoryAlias;
	},
	addRealty(state, realties) {
		state.realties.push(...realties);
	},
	addRealtyNew(state, realties) {
		state.realtiesNew.push(...realties);
	},
};

export const actions = {
	async getItemsSearch({commit}, {
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
		const realties = await this.$axios.$get(`new-buildings?${getParams}`);

		commit('setRealtiesSearch', realties.realties);
		commit('setAmountSearch', realties.meta.total);

	},
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
		house_id = null,
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
			house_id,
			querySearch,
			skipFromFull,
			skip,
			take,
			priceFrom,
			priceTo,
		});
		const realties = await this.$axios.$get(`new-buildings?${getParams}`);

		if (state === 'new') {
			commit('setrealtiesNew', realties.realties);
			commit('setAmountNew', realties.meta.total);
		} else {
			commit('setrealties', realties.realties);
			commit('setAmount', realties.meta.total);
		}
	},
	async setrealtyCategory({commit}, {
		categoryAlias = null,
	}) {
		commit('setrealtyCategory', categoryAlias);
	},
	async realtydItems({commit}, {
		skip = 0,
		user_id = null,
		state = null,
		from = null,
		expand = null,
		name = null,
		alias = null,
		querySearch = null,
	}) {
		const getParams = params({
			user_id, state, expand, from, skip, name, alias, querySearch,
		});
		const realties = await this.$axios.$get(`new-buildings?take=25${getParams}`);
		if (state === 'new') {
			commit('realtydrealtiesNew', realties.realties);
		} else {
			commit('realtydrealties', realties.realties);
		}
	},
	async removeItems({commit}) {
		commit('removerealties');
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
		const ads = await this.$axios.$get(`new-buildings?take=25${getParams}`);
		if (state === 'new') {
			commit('addRealtyNew', ads.realties);
		} else {
			commit('addRealty', ads.realties);
		}
	},
	async getItem({commit}, {id, expand = null, querySearch = null}) {
		const getParams = params({expand, querySearch});
		const realty = await this.$axios.$get(`new-buildings/${id}?${getParams}`);
		commit('setrealty', realty);
	},
};

export const getters = {
	realties: (s) => s.realties,
	realtiesSearch: (s) => s.realtiesSearch,
	realtiesFull: (s) => s.realtiesFull,
	realtiesNew: (s) => s.realtiesNew,
	realty: (s) => s.realty,
	amount: (s) => s.amount,
	amountSearch: (s) => s.amountSearch,
	amountNew: (s) => s.amountNew,
	categoryAlias: (s) => s.categoryAlias,
};
