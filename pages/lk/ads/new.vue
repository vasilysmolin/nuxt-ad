<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <h1 class="mb-4 w-full text-xl text-black font-black text-center leading-none truncate">{{
            $t('catalog.new')
          }}</h1>

        <form class="w-[95%]">

          <div class="flex flex-col items-center w-full">

            <div class="mb-4 w-full sm:w-[27rem]">
                  <textarea
                      class="form-control forms-textarea"
                      rows="5"
                      name="description"
                      id="description"
                      placeholder="Описание"
                      v-model="data.text"
                  >{{ data.text }}</textarea>
            </div>

            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="text"
                     class="form-control forms-input" id="price"
                     placeholder="Зарплата"
                     v-model="data.name">
              <label for="price" class="text-[#6E7191]">Название</label>
            </div>

            <div class="grid grid-cols-3 gap-4 w-full sm:w-[27rem]">
              <div class="mb-4 w-full" v-for="photo in data.images">
                <img :src="photo" class="w-full h-auto rounded" alt="">
              </div>
            </div>
            <div class="form-floating mb-6 w-full sm:w-[27rem]">
              <input type="file" @change="onFileChange" name="files" multiple accept="image/*">
            </div>
            <button :disabled="isDisabled" class="btn btn-primary inline-block px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                    @click.prevent="submitted">Разместить
            </button>

          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import * as _ from 'lodash';
import {maxLength, minLength, required} from 'vuelidate/lib/validators';

export default {
  name: "NewAd",
  layout: 'default',
  middleware: ['auth'],
  head: {
    title: "Разместить объявление",
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Список'
      }
    ]
  },
  data() {
    return {
      query: '',
      data: {
        name: '',
        text: null,
        images: [],
      },
      files: [],
      isDisabled: false,
    }
  },
  beforeDestroy() {
    this.parameters = {};
  },
  validations: {
    data: {
      name: {
        required,
        maxLength: maxLength(70),
        minLength: minLength(5)
      },
      photos: {
        required,
      },
      text: {
        required,
        maxLength: maxLength(1000),
        minLength: minLength(5)
      },
    },

  },
  async mounted() {
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
      data.append('text', this.data.text);
      this.$axios.$post(`ads`, data).then(() => {
        this.$router.push({path: 'ads'});
      }).catch((error) => {
      });

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
