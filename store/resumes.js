import { params } from '../helper/requestParams';

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
	async getItems({commit},{userID = null,state = 'active', from = null, expand = null}) {
		const getParams = params({userID,state,expand,from});
		const resumes = await this.$axios.$get(`resume?skip=0&take=25${getParams}`);
		if(state === 'new'){
			commit('setResumesNew', resumes.jobs_resumes);
			commit('setAmountNew', resumes.meta.total);
		} else {
			commit('setResumes', resumes.jobs_resumes);
			commit('setAmount', resumes.meta.total);
		}
	},
	async addItems({commit},{skip = 0,userID = null,state = 'active', from = null, expand = null}) {
		const getParams = params({userID,state,expand,from,skip});
		const resumes = await this.$axios.$get(`resume?take=25${getParams}`);
		if(state === 'new'){
			commit('addResumesNew', resumes.jobs_resumes);
		} else {
			commit('addResumes', resumes.jobs_resumes);
		}
	},
	async removeItems({commit}) {
		commit('removeresumes');
	},
	async getItem({commit}, {id,expand}) {
		const getParams = params({expand});
		commit('setresume', {});
		if (id) {
			await this.$axios.$get( `resume/${id}?${getParams}`).then((response) => {
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
