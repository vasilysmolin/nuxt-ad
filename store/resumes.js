export const state = () => ({
	resumes: [],
	resumesNew: [],
	amount: null,
	amountNew: null,
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
	setAmountNew(state, amount) {
		state.amountNew = amount;
	},
	setAmount(state, amount) {
		state.amount = amount;
	},
};

export const actions = {
	async getItems({commit},{userID = null,status = 'active', from = null}) {
		const resumes = await this.$axios.$get(`resume?skip=0&take=25&user_id=${userID}&status=${status}&from=${from}`);
		if(status === 'new'){
			commit('setResumesNew', resumes.jobs_resumes);
			commit('setAmountNew', resumes.meta.total);
		} else {
			commit('setResumes', resumes.jobs_resumes);
			commit('setAmount', resumes.meta.total);
		}
	},
	async addItems({commit},{skip = 0,userID = null,status = 'active', from = null}) {
		const resumes = await this.$axios.$get(`resume?skip=${skip}&take=25&user_id=${userID}&status=${status}&from=${from}`);
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
	amount: s => s.amount,
	amountNew: s => s.amountNew,
};
