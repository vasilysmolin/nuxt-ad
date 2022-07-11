<template>
  <section v-if="isLoading" >

    <form class="flex-auto w-[95%]">
      <div class="flex flex-col items-left w-full p-4 mt-7 rounded-lg border-solid border-[#D9DBE9] border-2">
        <h1 class="text-xl mb-5">Подписка на рассылку</h1>
        <div class="form-floating mb-4 w-full sm:w-[27rem]">
          <input type="email" v-model="data.email" class="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-black
        bg-[#EFF0F6] bg-clip-padding
        border border-solid border-[#EFF0F6]
        rounded-lg
        transition
        ease-in-out
        m-0
        focus:text-black focus:bg-white focus:border-black focus:outline-hidden" id="floatingInput"
                 placeholder="Ваш телефон">
          <label for="floatingInput" class="text-[#6E7191]">Ваша почта</label>
        </div>
        <button class="btn btn-primary inline-block px-7 py-4 bg-blue-600 text-white font-bold text-normal
        tracking-wider leading-snug rounded hover:bg-blue-700 focus:bg-blue-700 focus:outline-none
        focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                @click.prevent="submitted">Подписаться
        </button>
        <span v-if="success" class="caption-2 px-1 mt-2 pt-s text-green-500">
            Подписка успешно оформленна!
            </span>
      </div>
    </form>
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
      this.$axios.$post(`newletters`, this.data).then(() => {
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
