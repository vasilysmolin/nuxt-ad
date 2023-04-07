<template>
  <modal name="SellerModal" :min-width="320" :max-width="1024" :max-height="800" width="100%" height="100%"
         :adaptive="true">
    <section class="flex flex-col justify-center items-center w-full">
      <div class="mt-20 mb-20 w-[75%] text-center">
        <h1 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 text-xl">Укажите данные продавца</h1>
      </div>
      <div>
        <form class="w-[95%]">

          <div class="flex flex-col items-center w-full">

            <div class="mb-4 w-full sm:w-[27rem]">
                          <textarea
                              class="form-control forms-textarea"
                              rows="5"
                              name="description"
                              id="description"
                              placeholder="О продавце"
                              v-model="data.description"
                          >{{ data.description }}</textarea>
              <span v-if="descriptionErrors" class="form-errors">
                    {{ descriptionErrors }}
                    </span>
            </div>

            <div class="grid grid-cols-3 gap-4 w-full sm:w-[27rem]">

              <div class="mb-4 w-full">
                <label>Логотип</label>
                <img :src="data.logo" class="w-full h-auto rounded" alt="">
              </div>
            </div>

            <div class="form-floating mb-6 w-full sm:w-[27rem]">

              <input type="file" @change="onLogoChange" name="label" accept="image/*">
              <span v-if="logoErrors" class="form-errors w-full mb-2">{{ logoErrors }}</span>
            </div>

            <div class="grid grid-cols-3 gap-4 w-full sm:w-[27rem]">
              <label>Фон</label>
              <div class="mb-4 w-full">
                <img :src="data.background_image" class="w-full h-auto rounded" alt="">
              </div>
            </div>

            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="file" @change="onBackChange" name="background" accept="image/*">
              <span v-if="background_imageErrors" class="form-errors w-full mb-2">{{ background_imageErrors }}</span>
            </div>


            <button :disabled="isDisabled"
                    class="btn btn-primary inline-block px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    @click.prevent="submitted">Сохранить
            </button>

          </div>
        </form>
      </div>
    </section>
  </modal>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import * as _ from "lodash";
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';
import Validations from "~/components/mixins/validations.mixin"
import {maxLength, minLength, required} from "vuelidate/lib/validators";

export default {
  name: 'SellerModal',
  mixins: [CategoriesMixin, Validations],
  async mounted() {
    await this.getSeller({id: this.$auth.user.id}).then(() => {
      this.data = _.cloneDeep(this.sellerHouse);
    });
  },
  data() {
    return {
      data: {
        logo: null,
        background_image: null,
        description: null,
      },
      background: null,
      labels: null,
      isDisabled: false,
    }
  },
  validations: {
    data: {
      logo: {
        required,
      },
      background_image: {
        required,
      },
      description: {
        required,
        maxLength: maxLength(1000),
        minLength: minLength(5)
      },
    },

  },
  computed: {
    ...mapGetters({
      sellerHouse: 'sellerHouse/seller',
    }),
  },
  methods: {
    ...mapActions({
      getSeller: 'sellerHouse/getItem',
    }),
    hide() {
      this.$modal.hide('SellerModal');
    },
    onLogoChange(e) {
      const files = e.target.files;
      let $this = this;
      this.labels = files;
      _.each(files, function (file) {
        $this.data.logo = URL.createObjectURL(file);
      });
    },
    onBackChange(e) {
      const files = e.target.files;
      let $this = this;
      this.background = files;
      _.each(files, function (file) {
        $this.data.background_image = URL.createObjectURL(file);
      });
    },
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.isDisabled = true;
      let data = new FormData();
      if (!_.isEmpty(this.labels)) {
        for (let i = 0; i < this.labels.length; i++) {
          data.append('label', this.labels[i]);
        }
      }
      if (!_.isEmpty(this.background)) {
        for (let i = 0; i < this.background.length; i++) {
          data.append('background', this.background[i]);
        }
      }

      data.append('description', this.data.description);
      if (this.data.id) {
        data.append('_method', 'put');
        this.$axios.$put(`seller-houses/${this.data.id}`, data).then(() => {
          this.getSeller({id: this.$auth.user.id}).then(() => {
            this.data = this.sellerHouse;
          });
        }).catch((error) => {
        });
      } else {
        this.$axios.$post(`seller-houses`, data).then(() => {
          this.getSeller({id: this.$auth.user.id}).then(() => {
            this.data = this.sellerHouse;
          });
        }).catch((error) => {
        });
      }
      this.$modal.hide('SellerModal');

    },

  },
}
</script>
