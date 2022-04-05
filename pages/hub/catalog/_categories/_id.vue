<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-bold text-center leading-none truncate">Редактировать
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
            </div>

            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="price"
                     placeholder="Зарплата"
                     v-model="data.price">
              <label for="price" class="text-[#6E7191]">Стоимость</label>
            </div>
            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="sale_price"
                     placeholder="Зарплата"
                     v-model="data.sale_price">
              <label for="sale_price" class="text-[#6E7191]">Стоимость со скидкой</label>
            </div>
            <div class="grid grid-cols-3 gap-4 flex items-center">
              <div class="mb-4" v-for="photo in data.photos">
                <img :src="photo" class="max-w-full h-auto rounded-lg" alt="">
              </div>
            </div>
            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="file" @change="onFileChange" name="files" multiple accept="image/*">
            </div>

            <button class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    @click.prevent="submitted">Сохранить
            </button>
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
    }
  },
  validations: {
    data: {
      name: {
        required,
        maxLength: maxLength(255),
        minLength: minLength(2)
      },
    },

  },
  async mounted() {
    await this.$store.dispatch('ads/getItem', {id: this.$route.params.id, expand: 'profile.user'});
    this.data = _.cloneDeep(this.$store.getters['ads/ad']);
    if(this.category.length === 0) {
      await this.$store.dispatch('categoriesAd/getItems');
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
        if (!this.$v.data.name.$dirty) {
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
  },
  methods: {
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
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
