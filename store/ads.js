export const state = () => ({
	ads: [],
	amount: null,
	amountNew: null,
	adsNew: [],
	ad: {},
});

export const mutations = {
	setads(state, ads) {
		state.ads = ads;
	},
	addads(state, ads) {
		state.ads.push(...ads);
	},
	removeads(state){
		state.ads = [];
	},
	setad(state, ad) {
		state.ad = ad;
	},
	setadsNew(state, ad) {
		state.adsNew = ad;
	},
	addadsNew(state, ads) {
		state.adsNew.push(...ads);
	},
	setAmountNew(state, amount) {
		state.amountNew = amount;
	},
	setAmount(state, amount) {
		state.amount = amount;
	},
};

export const actions = {
	async getItems({commit},{userID = null, status = 'active', from = null}) {
		const ads = await this.$axios.$get(`ads?skip=0&take=25&user_id=${userID}&status=${status}&from=${from}`);

		if(status === 'new'){
			commit('setadsNew', ads.catalog_ads);
			commit('setAmountNew', ads.meta.total);
		} else {
			commit('setads', ads.catalog_ads);
			commit('setAmount', ads.meta.total);
		}
	},
	async addItems({commit},{skip = 0, userID = null, status = 'active', from = null}) {
		const ads = await this.$axios.$get(`ads?skip=${skip}&take=25&user_id=${userID}&status=${status}&from=${from}`);
		if(status === 'new'){
			commit('addadsNew', ads.catalog_ads);
		} else {
			commit('addads', ads.catalog_ads);
		}
	},
	async removeItems({commit}) {
		commit('removeads');
	},
	async getItem({commit},{id}) {
		const ad = await this.$axios.$get( 'ads/' + id);
		commit('setad', ad);
	}
};

export const getters = {
	ads: s => s.ads,
	adsNew: s => s.adsNew,
	ad: s => s.ad,
	amount: s => s.amount,
	amountNew: s => s.amountNew,
};
