<template>
  <section v-if="isLoading">

    <div v-if="$device.isDesktop">
      <section class="mt-12 py-5 px-3 flex flex-col justify-center items-center w-full rounded bg-[#eeeeee]">
        <h2 class="max-w-[650px] text-base text-center">Тапиго обновляется каждый день — новые инструменты, новые сервисы, полезные лайфхаки и многое другое. Два раза в неделю анонсы без спама.</h2>
        <section class="mt-7 p-1.5 relative flex flex-wrap items-stretch w-full bg-white border border-solid rounded border-gray-300">
          <input v-model="data.email" type="email"
                 class="form-control relative mr-2 flex-auto block px-1 py-2.5 text-base font-regular bg-white bg-clip-padding transition ease-in-out m-0 focus:outline-none focus:ring-0"
                 placeholder="Ваша почта" aria-label="Поиск" aria-describedby="button-addon2">
          <button @click.prevent="submitted"
                  class="btn inline-block px-10 py-1 bg-blue-900 text-white font-bold text-sm tracking-wider rounded hover:bg-black focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                  type="button" id="button-addon2">Подписка
          </button>
          <span v-if="success" class="absolute top-0 bottom-0 left-0 right-0 p-4 inline-block w-full border-2 border-solid border-[#00A05D] bg-[#F7F7FC] font-medium text-green-700 rounded text-[15px] text-center">
            Отлично! Вы оформили подписку на новости сервисов и анонсы Тапиго!
            </span>
        </section>
      </section>
    </div>

    <div v-if="$device.isMobile">
      <section class="mt-7 py-4 px-2 flex flex-col justify-center items-center w-full rounded bg-[#eeeeee]">
        <h2 class="max-w-[100%] text-xs text-center">Тапиго обновляется каждый день — новые инструменты, сервисы, полезные советы.<span class="block mt-2">Два раза в неделю анонсы без спама.</span></h2>
        <section class="mt-5 p-1.5 relative flex flex-wrap items-stretch w-full bg-white rounded">
          <input v-model="data.email" type="email"
                 class="form-control relative mr-2 flex-auto block px-1 py-2.5 text-sm font-regular bg-white bg-clip-padding transition ease-in-out m-0 focus:outline-none focus:ring-0"
                 placeholder="Ваша почта" aria-label="Поиск" aria-describedby="button-addon2">
          <button @click.prevent="submitted"
                  class="btn inline-block px-4 py-1 bg-blue-900 text-white font-bold text-sm tracking-wider rounded hover:bg-black focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                  type="button" id="button-addon2">Подписка
          </button>
          <span v-if="success" class="absolute top-0 bottom-0 left-0 right-0 p-2  inline-block w-full border-2 border-solid border-[#00A05D] bg-[#F7F7FC] font-bold text-green-700 rounded text-xs text-center">
            Отлично! Вы оформили подписку на новости сервисов и анонсы Тапиго!
            </span>
        </section>
      </section>
    </div>

  </section>
</template>

<script>
import {maxLength, minLength, numeric, required} from "vuelidate/lib/validators";

export default {
  name: "BAmount",
  data() {
    return {
      isLoading: false,
      success: false,
      data: {
        email: null,
        refer: 'catalog', // job catalog service Это значение надо будет пропсом прокидывать
      }
    }
  },
  validations: {
    data: {
      email: {
        required,
        maxLength: maxLength(255),
        minLength: minLength(2)
      },
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.isLoading = true;
    });
  },
  props: {
    refer: String,
  },
  computed: {
  },
  methods: {
    submitted() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      this.$axios.$post(`newsletters`, this.data).then(() => {
        // this.$router.push({name: 'uslugi'});
        console.log('успех');
        this.success = true;
        this.data.email = null;
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });

    },
  },

}
</script>
