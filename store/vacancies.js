export const state = () => ({
	vacancies: [],
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
};

export const actions = {
	async getItems({commit},{userID = null, status = 'active'}) {
		const vacancies = await this.$axios.$get(`vacancies?skip=0&take=25&user_id=${userID}&status=${status}`);

		if(status === 'new'){
			commit('setVacanciesNew', vacancies.jobs_vacancies);
		} else {
			commit('setVacancies', vacancies.jobs_vacancies);
		}
	},
	async addItems({commit},{skip = 0, userID = null, status = 'active'}) {
		const vacancies = await this.$axios.$get(`vacancies?skip=${skip}&take=25&user_id=${userID}&status=${status}`);
		if(status === 'new'){
			commit('addVacanciesNew', vacancies.jobs_vacancies);
		} else {
			commit('addVacancies', vacancies.jobs_vacancies);
		}
	},
	async removeItems({commit}) {
		commit('removeVacancies');
	},
	async getItem({commit},{id}) {
		const vacancy = await this.$axios.$get( 'vacancies/' + id);
		commit('setVacancy', vacancy);
	}
};

export const getters = {
	vacancies: s => s.vacancies,
	vacanciesNew: s => s.vacanciesNew,
	vacancy: s => s.vacancy,
};
