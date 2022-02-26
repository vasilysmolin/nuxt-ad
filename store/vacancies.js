export const state = () => ({
	vacancies: [],
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
	}
};

export const actions = {
	async getItems({commit},{userID = null}) {
		const vacancies = await this.$axios.$get(`vacancies?skip=0&take=25&user_id=${userID}`);
		commit('setVacancies', vacancies.jobs_vacancies);
	},
	async addItems({commit},{skip = 0,userID = null}) {
		const vacancies = await this.$axios.$get(`vacancies?skip=${skip}&take=25&user_id=${userID}`);
		commit('addVacancies', vacancies.jobs_vacancies);
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
	vacancy: s => s.vacancy,
};
