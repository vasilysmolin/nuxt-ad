import { params } from '../helper/requestParams';

export const state = () => ({
	users: [],
	amount: null,
	amountNew: null,
	usersBlock: [],
	usersNew: [],
	user: {},
});

export const mutations = {
	setusers(state, users) {
		state.users = users;
	},
	setusersnew(state, users) {
		state.usersNew = users;
	},
	addusers(state, users) {
		state.users.push(...users);
	},
	addusersnew(state, users) {
		state.usersNew.push(...users);
	},
	removeusers(state){
		state.users = [];
	},
	setuser(state, user) {
		state.user = user;
	},
	setAmountNew(state, amount) {
		state.amountNew = amount;
	},
	setAmount(state, amount) {
		state.amount = amount;
	},
};

export const actions = {
	async getItems({commit},{state = null, type = null}) {
		const getParams = params({type,state});
		const users = await this.$axios.$get(`users?skip=0&take=25${getParams}`);
		if(state === 'new'){
			commit('setusersnew', users.users);
			commit('setAmountNew', users.meta.total);
		} else {
			commit('setusers', users.users);
			commit('setAmount', users.meta.total);
		}

	},
	async addItems({commit},{skip = 0,state = null, type = null}) {
		const getParams = params({skip, type, state});
		const users = await this.$axios.$get(`users?&take=25${getParams}`);
		if(type === 'new'){
			commit('addusersnew', users.users);
		} else {
			commit('addusers', users.users);
		}

	},
	async removeItems({commit}) {
		commit('removeusers');
	},
	async getItem({commit},{id}) {
		const user = await this.$axios.$get( 'users/' + id);
		commit('setuser', user);
	}
};

export const getters = {
	users: s => s.users,
	usersBlock: s => s.usersBlock,
	usersNew: s => s.usersNew,
	user: s => s.user,
	amount: s => s.amount,
	amountNew: s => s.amountNew,
};
