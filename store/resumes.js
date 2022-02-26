export const state = () => ({
	resumes: [],
	resume: {},
});

export const mutations = {
	setresumes(state, resumes) {
		state.resumes = resumes;
	},
	addresumes(state, resumes) {
		state.resumes.push(...resumes);
	},
	removeresumes(state){
		state.resumes = [];
	},
	setresume(state, resume) {
		state.resume = resume;
	}
};

export const actions = {
	async getItems({commit},{userID = null}) {
		const resumes = await this.$axios.$get(`resume?skip=0&take=25&user_id=${userID}`);
		commit('setresumes', resumes.jobs_resumes);
	},
	async addItems({commit},{skip = 0,userID = null}) {
		const resumes = await this.$axios.$get(`resume?skip=${skip}&take=25&user_id=${userID}`);
		commit('addresumes', resumes.jobs_resumes);
	},
	async removeItems({commit}) {
		commit('removeresumes');
	},
	async getItem({commit}, {id}) {
		commit('setresume', {});
		if (id) {
			await this.$axios.$get( 'resume/' + id).then((response) => {
				commit('setresume', response);
			});
		}
	}
};

export const getters = {
	resumes: s => s.resumes,
	resume: s => s.resume,
};
