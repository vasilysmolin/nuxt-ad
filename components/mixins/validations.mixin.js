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
    urlErrors: {
      get() {
        if (!this.$v.url?.$dirty) {
          return '';
        }
        if (!this.$v.url.required) {
          return this.$t('validation.urlRequired');
        }
        if (!this.$v.url.url) {
          return this.$t('validation.urlUrl');
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
        //
        // if (!this.$v.data.name.required) {
        //   return this.$t('validation.nameRequired');
        // }

        if (!this.$v.data.name.maxLength) {
          return this.$t('validation.nameMax');
        }
        // if (!this.$v.data.name.minLength) {
        //   return this.$t('validation.nameMin');
        // }

        return '';
      },
      set(text) {
        return text;
      }
    },
    dateErrors: {
      get() {
        if (!this.$v.data.date_build?.$dirty) {
          return '';
        }

        if (!this.$v.data.date_build.required) {
          return this.$t('validation.nameRequired');
        }

        // if (!this.$v.data.name.maxLength) {
        //   return this.$t('validation.nameMax');
        // }
        // if (!this.$v.data.name.minLength) {
        //   return this.$t('validation.nameMin');
        // }

        return '';
      },
      set(text) {
        return text;
      }
    },
    phoneErrors: {
      get() {
        if (!this.$v.data.phone?.$dirty) {
          return '';
        }

        if (!this.$v.data.phone.required) {
          return this.$t('validation.phoneRequired');
        }

        if (!this.$v.data.phone.maxLength) {
          return this.$t('validation.phoneMax');
        }
        if (!this.$v.data.phone.minLength) {
          return this.$t('validation.phoneMin');
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    cityErrors: {
      get() {
        if (!this.$v.data?.city_id.$dirty) {
          return '';
        }

        if (!this.$v.data?.city_id.required) {
          return this.$t('validation.cityRequired');
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    addressErrors: {
      get() {
        if (!this.$v.data?.street.$dirty) {
          return '';
        }

        if (!this.$v.data?.street.required) {
          return this.$t('validation.addressRequired');
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
    additionallyErrors: {
      get() {
        if (!this.$v.data.additionally?.$dirty) {
          return '';
        }

        if (!this.$v.data.additionally.required) {
          return this.$t('validation.descriptionRequired');
        }

        if (!this.$v.data.additionally.maxLength) {
          return this.$t('validation.descriptionMax');
        }
        if (!this.$v.data.additionally.minLength) {
          return this.$t('validation.descriptionMin');
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    demandsErrors: {
      get() {
        if (!this.$v.data.demands?.$dirty) {
          return '';
        }

        if (!this.$v.data.demands.required) {
          return this.$t('validation.descriptionRequired');
        }

        if (!this.$v.data.demands.maxLength) {
          return this.$t('validation.descriptionMax');
        }
        if (!this.$v.data.demands.minLength) {
          return this.$t('validation.descriptionMin');
        }

        return '';
      },
      set(text) {
        return text;
      }
    },
    dutiesErrors: {
      get() {
        if (!this.$v.data.duties?.$dirty) {
          return '';
        }

        if (!this.$v.data.duties.required) {
          return this.$t('validation.descriptionRequired');
        }

        if (!this.$v.data.duties.maxLength) {
          return this.$t('validation.descriptionMax');
        }
        if (!this.$v.data.duties.minLength) {
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
    priceSquareErrors() {
      if (!this.$v.data.price_per_square?.$dirty) {
        return '';
      }

      if (!this.$v.data.price_per_square.required) {
        return this.$t('validation.priceRequired');
      }
      if (!this.$v.data.price_per_square.maxLength) {
        return this.$t('validation.priceMax');
      }
      if (!this.$v.data.price_per_square.minLength) {
        return this.$t('validation.priceMin');
      }
      if (!this.$v.data.price_per_square.numeric) {
        return this.$t('validation.priceNum');
      }

      return '';
    },
    minPriceErrors() {
      if (!this.$v.data.min_price?.$dirty) {
        return '';
      }

      if (!this.$v.data.min_price.required) {
        return this.$t('validation.priceRequired');
      }
      if (!this.$v.data.min_price.maxLength) {
        return this.$t('validation.priceMax');
      }
      if (!this.$v.data.min_price.minLength) {
        return this.$t('validation.priceMin');
      }
      if (!this.$v.data.min_price.numeric) {
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
    experienceErrors() {
      if (!this.$v.data.experience?.$dirty) {
        return '';
      }
      if (!this.$v.data.experience.required) {
        return this.$t('validation.selectRequired');
      }
      return '';
    },
    educationErrors() {
      if (!this.$v.data.education?.$dirty) {
        return '';
      }
      if (!this.$v.data.education.required) {
        return this.$t('validation.selectRequired');
      }
      return '';
    },
    scheduleErrors() {
      if (!this.$v.data.schedule?.$dirty) {
        return '';
      }
      if (!this.$v.data.schedule.required) {
        return this.$t('validation.selectRequired');
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
