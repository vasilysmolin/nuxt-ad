export const state = () => ({
	users: [],
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
	}
};

export const actions = {
	async getItems({commit},{status = 'all', type = 'all'}) {
		const users = await this.$axios.$get(`users?skip=0&take=25&status=${status}&type=${type}`);
		if(status === 'new'){
			commit('setusersnew', users.users);
		} else {
			commit('setusers', users.users);
		}

	},
	async addItems({commit},{skip = 0,status = 'all', type = 'all'}) {
		const users = await this.$axios.$get(`users?skip=${skip}&take=25&status=${status}&type=${type}`);
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
};
