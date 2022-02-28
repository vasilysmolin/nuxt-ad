export const state = () => ({
	resumes: [],
	resumesNew: [],
	resume: {},
});

export const mutations = {
	setResumes(state, resumes) {
		state.resumes = resumes;
	},
	addResumes(state, resumes) {
		state.resumes.push(...resumes);
	},
	removeresumes(state){
		state.resumes = [];
	},
	setresume(state, resume) {
		state.resume = resume;
	},
	setResumesNew(state, resumes) {
		state.resumesNew = resumes;
	},
	addResumesNew(state, resumes) {
		state.resumesNew.push(...resumes);
	},
};

export const actions = {
	async getItems({commit},{userID = null,status = 'active'}) {
		const resumes = await this.$axios.$get(`resume?skip=0&take=25&user_id=${userID}&status=${status}`);
		if(status === 'new'){
			commit('setResumesNew', resumes.jobs_resumes);
		} else {
			commit('setResumes', resumes.jobs_resumes);
		}
	},
	async addItems({commit},{skip = 0,userID = null,status = 'active'}) {
		const resumes = await this.$axios.$get(`resume?skip=${skip}&take=25&user_id=${userID}&status=${status}`);
		if(status === 'new'){
			commit('addResumesNew', resumes.jobs_resumes);
		} else {
			commit('addResumes', resumes.jobs_resumes);
		}
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
	resumesNew: s => s.resumesNew,
	resume: s => s.resume,
};
