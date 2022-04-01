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
	async getItems({commit},{userID = null, status = 'active', expand = null, from = null}) {
		const getParams = params({userID,status,expand,from});
		const vacancies = await this.$axios.$get(`vacancies?skip=0&take=25${getParams}`);

		if(status === 'new'){
			commit('setVacanciesNew', vacancies.jobs_vacancies);
			commit('setAmountNew', vacancies.meta.total);
		} else {
			commit('setVacancies', vacancies.jobs_vacancies);
			commit('setAmount', vacancies.meta.total);
		}
	},
	async addItems({commit},{skip = 0, userID = null, status = 'active', expand = null, from = null}) {
		const getParams = params({userID,status,expand,from,skip});
		const vacancies = await this.$axios.$get(`vacancies?take=25&${getParams}`);
		if(status === 'new'){
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
