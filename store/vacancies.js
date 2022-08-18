import { params } from '../helper/requestParams';

export const state = () => ({
	vacancies: [],
	amount: null,
	amountNew: null,
	vacanciesNew: [],
	vacancy: {},
});

export const mutations = {
	setVacancies(state, vacancies) {
		state.vacancies = vacancies;
	},
	addVacancies(state, vacancies) {
		state.vacancies.push(...vacancies);
	},
	removeVacancies(state){
		state.vacancies = [];
	},
	setVacancy(state, vacancy) {
		state.vacancy = vacancy;
	},
	setVacanciesNew(state, vacancy) {
		state.vacanciesNew = vacancy;
	},
	addVacanciesNew(state, vacancies) {
		state.vacanciesNew.push(...vacancies);
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
		expand = null,
		from = null,
		name = null,
		querySearch = null,
		filtersArray = null,
		priceFrom = null,
		priceTo = null,
	}) {
		const getParams = params({user_id,state,expand,from,name,skipFromFull,skip,take,querySearch,priceFrom,priceTo,filtersArray});
		const vacancies = await this.$axios.$get(`vacancies?skip=0&take=25${getParams}`);

		if(state === 'new'){
			commit('setVacanciesNew', vacancies.jobs_vacancies);
			commit('setAmountNew', vacancies.meta.total);
		} else {
			commit('setVacancies', vacancies.jobs_vacancies);
			commit('setAmount', vacancies.meta.total);
		}
	},
	async addItems({commit},{skip = 0, user_id = null, state = null, expand = null, from = null, name = null}) {
		const getParams = params({user_id,state,expand,from,skip,name});
		const vacancies = await this.$axios.$get(`vacancies?take=25&${getParams}`);
		if(state === 'new'){
			commit('addVacanciesNew', vacancies.jobs_vacancies);
		} else {
			commit('addVacancies', vacancies.jobs_vacancies);
		}
	},
	async removeItems({commit}) {
		commit('removeVacancies');
	},
	async getItem({commit},{id,expand = null}) {
		const getParams = params({expand});
		const vacancy = await this.$axios.$get( `vacancies/${id}?${getParams}`);
		commit('setVacancy', vacancy);
	}
};

export const getters = {
	vacancies: s => s.vacancies,
	vacanciesNew: s => s.vacanciesNew,
	vacancy: s => s.vacancy,
	amount: s => s.amount,
	amountNew: s => s.amountNew,
};
