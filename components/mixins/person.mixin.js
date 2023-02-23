import {mapGetters} from "vuex";

export default {
    mounted() {
    },
    computed: {
        ...mapGetters({
            currentAccount: 'users/currentAccount',
        }),
        check() {
            return this.checkPerson(this.user);
        },
        checkCity() {
            return this.user?.city;
        },
    },
    methods: {
        profile() {
            return this.$auth.user?.profile;
        },
        getInn() {
            return this.$auth.user?.profile?.person?.inn;
        },
        isPerson() {
            return this.$auth.user?.profile?.isPerson;
        },
        isCurrentAccount() {
            return this.currentAccount?.profile?.isPerson;
        },
        getType(user) {
            return user?.profile?.isPerson ? 'Юридическое лицо' : 'Физическое лицо';
        },
        checkPerson(user) {
            return user?.profile?.isPerson;
        },
        getEntityName(user) {
            return user?.profile?.person?.name;
        },
        getEntityInn(user) {
            return user?.profile?.person?.inn;
        },
        checkStepPerson() {
            return this.isPerson && this.$auth.user.inn !== null && this.$auth.user.phone !== null;
        },
        checkStepIndividual() {
            return !this.isPerson && this.$auth.user.name !== null && this.$auth.user.phone !== null;
        },
        checkSteps() {
            return this.checkStepPerson || this.checkStepIndividual;
        },
    },
};
