<template>
  <section class="container flex flex-col items-center mt-[20px] pb-10">
    <form class="w-[95%]">

      <div class="flex flex-col items-center w-full">

        <div class="mb-4 w-full sm:w-[27rem]">
                  <textarea
                      class="form-control forms-textarea"
                      rows="5"
                      name="description"
                      id="description"
                      placeholder="Описание"
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

          <input type="file" @change="onLogoChange" name="label" multiple accept="image/*">
          <span v-if="logoErrors" class="form-errors w-full mb-2">{{ photosErrors }}</span>
        </div>

        <div class="grid grid-cols-3 gap-4 w-full sm:w-[27rem]">
          <label>Фон</label>
          <div class="mb-4 w-full">
            <img :src="data.background_image" class="w-full h-auto rounded" alt="">
          </div>
        </div>

        <div class="form-floating mb-6 w-full sm:w-[27rem]">
          <input type="file" @change="onBackChange" name="background" multiple accept="image/*">
          <span v-if="background_imageErrors" class="form-errors w-full mb-2">{{ photosErrors }}</span>
        </div>


        <button :disabled="isDisabled"
                class="btn btn-primary inline-block px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                @click.prevent="submitted">Сохранить
        </button>

      </div>
    </form>
    <template v-if="sellerHouse.id">
      <section class="flex flex-col w-[95%] sm:max-w-screen-sm">
        <article v-for="house in houses" :key="house.id" class="flex flex-col mb-[10px] p-3 rounded-lg bg-white">
          <div class="flex justify-between">
            <h2 class="first-letter:uppercase font-black text-[0.9375rem] leading-5 sm:text-lg">
              {{ house.name }}</h2>
          </div>
          <p class="text-sm">Статус: {{ getState(house) }}</p>
          <p class="text-sm">Позиция в каталоге: {{ house.sort }}</p>
          <div class="flex justify-between">
            <NuxtLink :to="getUrl(house)">
              <div class="flex justify-between mt-2 w-full">
                <button
                    class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                  Редактировать
                </button>
              </div>
            </NuxtLink>
            <NuxtLink :to="getUrlRealty(house)">
              <div class="flex justify-between mt-2 w-full">
                <button
                    class="inline-block px-3 py-1 border-2 border-gray-100 text-gray-400 font-medium text-xs leading-tight rounded hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                  Список квартир
                </button>
              </div>
            </NuxtLink>
          </div>
        </article>
        <button v-if="checkAmount" @click="addItems({ skip: houses.length, from: 'cabinet', category_ids: '382,381'})"
                type="button"
                class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          Смотреть дальше
        </button>
      </section>
      <NuxtLink :to="`/house/new`">
        <button type="button"
                class="w-full inline-block mt-6 px-6 py-2 border-2 border-blue-600 text-blue-600 font-bold text-normal leading-normal rounded hover:border-black hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
          Добавить дом
        </button>
      </NuxtLink>
    </template>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import CategoriesMixin from '~/components/mixins/categoriesRealty.mixin';
import Validations from "~/components/mixins/validations.mixin"
import {maxLength, minLength, required} from "vuelidate/lib/validators";
import * as _ from "lodash";

export default {
  name: "HouseHubList",
  mixins: [CategoriesMixin, Validations],
  props: {
    type: String,
  },
  validations: {
    data: {
      label: {
        required,
      },
      background: {
        required,
      },
      description: {
        required,
        maxLength: maxLength(1000),
        minLength: minLength(5)
      },
    },

  },
  data() {
    return {
      data: {
        description: null,
        label: [],
        logo: [],
        background_image: [],
        background: [],
      },
      isDisabled: false,
    }
  },
  async mounted() {
    await this.getItems({from: 'cabinet'});
    await this.getItemsState();
    await this.getSeller({id: this.$auth.user.id}).then(() => {
      this.data = _.cloneDeep(this.sellerHouse);
    });
  },
  computed: {
    ...mapGetters({
      houses: 'houses/houses',
      states: 'states/states',
      sellerHouse: 'sellerHouse/seller',
    }),
    checkAmount() {
      return this.houses.length < this.amount;
    }

  },
  methods: {
    ...mapActions({
      getItems: 'houses/getItems',
      addItems: 'houses/addItems',
      getItemsState: 'states/getItems',
      getSeller: 'sellerHouse/getItem',
    }),
    getUrl(house) {
      return `/house/${house.id}`;
    },
    getUrlRealty(house) {
      return `/house/${house.id}/new-build`;
    },
    getState(house) {
      return this.states[house?.state];
    },
    onLogoChange(e) {
      const files = e.target.label;
      let $this = this;
      this.label = files;
      _.each(files, function (file) {
        $this.data.label.push(URL.createObjectURL(file))
      });
    },
    onBackChange(e) {
      const files = e.target.background;
      let $this = this;
      this.background = files;
      _.each(files, function (file) {
        $this.data.background.push(URL.createObjectURL(file))
      });
    },
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.isDisabled = true;
      let data = new FormData();
      for (let i = 0; i < this.label.length; i++) {
        data.append('label[]', this.label[i]);
      }
      for (let i = 0; i < this.background.length; i++) {
        data.append('background[]', this.background[i]);
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


    },
  },

}
</script>
