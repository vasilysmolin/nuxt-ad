export default {
    computed: {
        person: {
            get(){
                return this.$auth.user?.profile?.isPerson;
            },
            set(person){
                return person;
            }
        },
        isPerson: {
            get(){
                return this.person?.isPerson === true;
            },
            set(isPerson){
                return isPerson;
            }
        },
        inn: {
            get(){
               return this.person?.inn ?? null;
            },
            set(inn){
                return inn;
            }
        },
        checkStepPerson() {
            return this.isPerson && this.inn !== null && this.$auth.user.phone !== null;
        },
        checkStepIndividual() {
            return !this.isPerson && this.$auth.user.name !== null && this.$auth.user.phone !== null;
        },
        checkSteps() {
            return this.checkStepPerson || this.checkStepIndividual;
        }
    }
};
