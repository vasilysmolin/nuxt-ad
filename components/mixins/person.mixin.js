export default {
    methods: {
        profile(){
            return this.$auth.user?.profile;
        },
        getInn(){
            return this.$auth.user?.profile?.person?.inn;
        },
        isPerson() {
            return this.$auth.user?.profile?.isPerson;
        },
        getType(user) {
            return user?.profile?.isPerson ? 'Юридическое лицо' : 'Физическое лицо';
        },
        checkStepPerson() {
            return this.isPerson && this.$auth.user.inn !== null && this.$auth.user.phone !== null;
        },
        checkStepIndividual() {
            return !this.isPerson && this.$auth.user.name !== null && this.$auth.user.phone !== null;
        },
        checkSteps() {
            return this.checkStepPerson || this.checkStepIndividual;
        }
    }
};
