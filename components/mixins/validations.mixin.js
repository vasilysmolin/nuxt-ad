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
    nameErrors: {
      get() {
        if (!this.$v.data.name?.$dirty) {
          return '';
        }

        if (!this.$v.data.name.required) {
          return this.$t('validation.nameRequired');
        }

        if (!this.$v.data.name.maxLength) {
          return this.$t('validation.nameMax');
        }
        if (!this.$v.data.name.minLength) {
          return this.$t('validation.nameMin');
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    cityErrors: {
      get() {
        if (!this.$v.result?.city_id?.$dirty) {
          return '';
        }

        if (!this.$v.result?.city_id.required) {
          return this.$t('validation.cityRequired');
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    descriptionErrors: {
      get() {
        if (!this.$v.data.description?.$dirty) {
          return '';
        }

        if (!this.$v.data.description.required) {
          return this.$t('validation.descriptionRequired');
        }

        if (!this.$v.data.description.maxLength) {
          return this.$t('validation.descriptionMax');
        }
        if (!this.$v.data.description.minLength) {
          return this.$t('validation.descriptionMin');
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    priceErrors() {
      if (!this.$v.data.price?.$dirty) {
        return '';
      }

      if (!this.$v.data.price.required) {
        return this.$t('validation.priceRequired');
      }
      if (!this.$v.data.price.maxLength) {
        return this.$t('validation.priceMax');
      }
      if (!this.$v.data.price.minLength) {
        return this.$t('validation.priceMin');
      }
      if (!this.$v.data.price.numeric) {
        return this.$t('validation.priceNum');
      }

      return '';
    },
    category_idErrors() {
      if (!this.$v.data.category_id?.$dirty) {
        return '';
      }

      if (!this.$v.data.category_id.required) {
        return this.$t('validation.catRequired');
      }
      if (!this.$v.data.category_id.numeric) {
        return this.$t('validation.catRequired');
      }
      return '';
    },
    photosErrors: {
      get() {
        if (!this.$v.data.photos?.$dirty) {
          return '';
        }

        if (!this.$v.data.photos.required) {
          return this.$t('validation.photoRequired');
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
  },
};
