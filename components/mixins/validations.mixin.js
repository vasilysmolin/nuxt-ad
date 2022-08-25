export default {
  computed: {
    emailErrors: {
      get() {
        if (!this.$v.email?.$dirty) {
          return '';
        }
        if (!this.$v.email.required) {
          return this.$t('validation.emailRequired');
        }
        if (!this.$v.email.email) {
          return this.$t('validation.email');
        }
        return '';
      },
      set(text) {
        return text;
      }
    },
    passwordErrors: {
      get() {
        if (!this.$v.password?.$dirty) {
          return '';
        }

        if (!this.$v.password.required) {
          return this.$t('validation.passwordRequired');
        }

        if (!this.$v.password.maxLength) {
          return this.$t('validation.passwordMax');
        }
        if (!this.$v.password.minLength) {
          return this.$t('validation.passwordMin');
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
  },
};
