<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-3 w-full text-xl text-black font-bold text-center leading-none truncate">Редактировать
          объявление</h1>

        <h2 class="mb-4 w-full text-base text-black font-bold text-center leading-none truncate">{{ data.name }}</h2>

        <form class="w-[95%]">

          <div class="flex flex-col items-center w-full">

            <div class="mb-4 w-full sm:w-[27rem]" v-for="(item, index) in items" :key="index">
              <label v-if="item.title.length > 0" for="name" class="pl-4 text-gray-500">{{ item.title }}</label>
              <select @change="setCategory($event, index)"  class="form-select form-select-lg mt-2 forms-select">
                <option v-for="category in item.categories"
                        :value="category.id"
                        :key="category.id"
                        :selected="category.id === category_id[index]"
                >
                  {{ category.name }}
                </option>
              </select>
              <span v-if="category_idErrors" class="caption-2 px-1 pt-s c-error">
            {{ category_idErrors }}
            </span>
            </div>

            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="name"
                     placeholder="Название вакансии"
                     v-model="data.name">
              <label for="name" class="text-[#6E7191]">Название объявления</label>
              <span v-if="nameErrors" class="caption-2 px-1 pt-s c-error">
            {{ nameErrors }}
            </span>
            </div>

            <div class="mb-4 w-full sm:w-[27rem]">
                  <textarea
                      class="form-control forms-textarea"
                      rows="5"
                      name="description"
                      id="description"
                      placeholder="Описание"
                      v-model="data.description"
                  >{{ data.description }}</textarea>
              <span v-if="descriptionErrors" class="caption-2 px-1 pt-s c-error">
            {{ descriptionErrors }}
            </span>
            </div>

            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="price"
                     placeholder="Зарплата"
                     v-model="data.price">
              <label for="price" class="text-[#6E7191]">Стоимость</label>
              <span v-if="priceErrors" class="caption-2 px-1 pt-s c-error">
            {{ priceErrors }}
            </span>
            </div>
            <!--
            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="sale_price"
                     placeholder="Зарплата"
                     v-model="data.sale_price">
              <label for="sale_price" class="text-[#6E7191]">Стоимость со скидкой</label>
            </div>
            -->
            <div class="grid grid-cols-3 gap-4 flex items-center">
              <div class="mb-4" v-for="photo in data.photos">
                <img :src="photo" class="max-w-full h-auto rounded-lg" alt="">
              </div>
            </div>
            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="file" @change="onFileChange" name="files" multiple accept="image/*">
            </div>

            <button :disabled="isDisabled" class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    @click.prevent="submitted">Сохранить
            </button>

            <button v-if="data.state === 'active'" @click.prevent="up" class="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800">Поднять</button>

            <button @click.prevent="deleted" class="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800">Удалить</button>

            <div v-if="checkState()">
              <button v-if="data.state !== 'active'" @click.prevent="active" class="h-10 px-5 m-2 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800">Активировать</button>
              <button v-else @click.prevent="pause"  class="h-10 px-5 m-2 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-800">На паузу</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import * as _ from 'lodash';
import {maxLength, minLength, required, integer, numeric} from 'vuelidate/lib/validators';
// import {mapGetters} from "vuex";
import CategoriesMixin from '~/components/mixins/categories.mixin';

export default {
  name: "VObject",
  layout: 'hub',
  head: {
    title: "Редактировать объявление на Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  mixins: [CategoriesMixin],
  data() {
    return {
      data: {
      },
      files: [],
      isDisabled: false,
    }
  },
  validations: {
    data: {
      name: {
        required,
        maxLength: maxLength(255),
        minLength: minLength(2)
      },
      category_id: {
        required,
        numeric,
      },
      description: {
        required,
        maxLength: maxLength(2000),
        minLength: minLength(5)
      },
      price: {
        required,
        numeric,
        maxLength: maxLength(1000),
        minLength: minLength(1)
      },
    },

  },
  async mounted() {
    await this.$store.dispatch('ads/getItem', {id: this.$route.params.id, expand: 'profile.user'});
    this.data = _.cloneDeep(this.$store.getters['ads/ad']);
    if(this.category.length === 0) {
      await this.$store.dispatch('categoriesAd/getItems', {from: 'cabinet'});
    }
    this.items = this.iterator(this.category);
    this.category_id = this.index(this.items);
  },
  computed: {
    category: {
      get() {
        return _.cloneDeep(this.$store.getters['categoriesAd/categoriesAds']);
      },
      set(category) {
        return category
      }
    },
    nameErrors: {
      get() {
        if (!this.$v.data.name?.$dirty) {
          return '';
        }

        if (!this.$v.data.name.required) {
          return 'Введите название';
        }

        if (!this.$v.data.name.maxLength) {
          return 'Превышена допустимая длина названия';
        }
        if (!this.$v.data.name.minLength) {
          return 'Ошибка, минимальное значение';
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
          return 'Введите название';
        }

        if (!this.$v.data.description.maxLength) {
          return 'Превышена допустимая длина названия';
        }
        if (!this.$v.data.description.minLength) {
          return 'Ошибка, минимальное значение';
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
        return 'Введите цену';
      }

      if (!this.$v.data.price.maxLength) {
        return 'Превышена допустимая длина названия';
      }
      if (!this.$v.data.price.minLength) {
        return 'Ошибка, минимальное значение';
      }
      if (!this.$v.data.price.numeric) {
        return 'Укажите только числа, без других символов';
      }

      return '';
    },
    category_idErrors() {
      if (!this.$v.data.category_id?.$dirty) {
        return '';
      }

      if (!this.$v.data.category_id.required) {
        return 'Выберите категорию';
      }
      if (!this.$v.data.category_id.numeric) {
        return 'Неверный формат категории';
      }

      return '';
    },
  },
  methods: {
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.isDisabled = true;
      let data = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        data.append('files[]', this.files[i]);
      }
      data.append('name', this.data.name);
      data.append('description', this.data.description);
      data.append('price', this.data.price);
      data.append('sale_price', this.data.sale_price);
      data.append('category_id', this.data.category_id);
      data.append('_method', 'put');
      this.$axios.$post(`declarations/${this.$route.params.id}`, data).then(() => {
          this.$router.push({name: 'catalog'});
        console.log('успех')
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
    deleted() {
      this.$axios.$delete(`declarations/${this.$route.params.id}`).then(() => {
        this.$router.push({name: 'catalog'});
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
    active() {
      this.$axios.$put(`declarations/${this.$route.params.id}/state`,{state: 'active'}).then(() => {
        this.$router.push({name: 'catalog'});
      }).catch((error) => {
      });

    },
    pause() {
      this.$axios.$put(`declarations/${this.$route.params.id}/state`,{state: 'pause'}).then(() => {
        this.$router.push({name: 'catalog'});
      }).catch((error) => {
      });

    },
    up() {
      this.$axios.$put(`declarations/${this.$route.params.id}/sort`,{}).then(() => {
        this.$router.push({name: 'catalog'});
      }).catch((error) => {
      });
    },
    checkState() {
      return this.data.state === 'active' || this.data.state === 'pause';
    },
    isParent(category) {
      return category.parent_id === null;
    },
    onFileChange(e) {
      const files = e.target.files;
      let $this = this;
      this.files = files;
      _.each(files, function(file){
        $this.data.photos.push(URL.createObjectURL(file))
      });
    },
  },
}
</script>
