<template>
  <section>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <section class="flex flex-col items-start mb-5 w-[95%] sm:w-[27rem]">
          <article class="flex justify-between w-full">
            <p class="text-xs text-[#A0A3BD]">{{isPerson() ? 'Юридическое лицо' : 'Физическое лицо'}}</p>
            <p v-if="check" class="text-xs text-[#D9DBE9] uppercase">инн<span class="pl-1">{{ person.inn }}</span></p>
          </article>
          <h1 v-if="check" class="mt-2 w-full text-xl text-black font-bold leading-none truncate">{{ getEntityName(user) }}</h1>
          <h1 v-else class="mt-2 w-full text-xl text-black font-bold leading-none truncate">{{user.name}}</h1>
        </section>
        <form class="w-[95%]">
          <div class="flex flex-col items-center w-full">
            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="email" v-model="user.email" class="form-control
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

            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <the-mask :mask="['+7 (###) ###-##-##']" v-model="user.phone"
                        id="floatingPassword"
                        type="text"
                        class="form-control
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
    focus:text-black focus:bg-white focus:border-black focus:outline-hidden"
                        placeholder="Ваш телефон" />
              <label class="text-[#6E7191]">Ваш телефон</label>
            </div>

            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="text" v-on:input="debounceInput" v-model="query" class="form-control
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
                     placeholder="Ваш город">
              <label for="floatingInput" class="text-[#6E7191]">Ваш город</label>
              <span v-if="!success" class="form-errors w-full mb-2">
                Подскажите ваш город, так намного удобнее пользоваться сервисами
              </span>
              <!--
              <span v-if="successChange" class="form-success w-full mb-2">
                Город успешно добавлен
              </span>
              -->
            </div>
          </div>
          <article class="relative mx-auto w-full sm:w-[27rem] bg-white z-50">
            <ul class="pt-1 px-3 w-full leading-8" v-if="cities.length > 0">
              <li @click="saveCity(city)" style="list-style-type: none;" v-for="city in cities" :key="city.id" >
                <nuxt-link to="#" class="text-blue-700 hover:text-black">
                {{ city.name }}
              </nuxt-link>
              </li>
            </ul>
          </article>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import NavLocProfile from "../../components/NavLocProfile";
import Person from "~/components/mixins/person.mixin";
import * as _ from "lodash";
import {mapActions, mapGetters} from "vuex";
export default {
  name: 'Profile',
  components: {NavLocProfile},
  layout: 'hub',
  head: {
    title: "Профиль пользователя Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  mixins: [Person],
  data() {
    return {
      query: null,
      success: false,
      successChange: false,
      user: {
        name: null,
        phone: null,
        city: {
          name: null,
        }
      },
      person: {
        inn: null,
        name: 'тест',
      }
    }
  },
  middleware: ['redirect', 'person'],
  mounted() {
    this.user = _.cloneDeep(this.$auth.user);
    if(this.checkCity) {
      this.query = this.user?.city?.name;
      this.success = true;
    }
    this.person.inn = _.clone(this.getInn());
  },
  computed: {
    ...mapGetters({
      cities: 'cities/citiesFull',
    }),
    check(){
      return this.checkPerson(this.user);
    },
    checkCity(){
      return this.user?.city;
    },
  },
  methods: {
    ...mapActions({
      getItems: 'cities/getItemsFull',
      removeItemsFull: 'cities/removeItemsFull',
    }),
    saveCity(city){
      this.$axios.$put(`users/${this.user.id}`, {city_id: city.id}).then(() => {
        const user = this.$auth.fetchUser().then((res) => {
          this.$auth.setUser(res.data);
          this.successChange = true;

        });
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
      this.query = city.name;
      this.removeItemsFull();
    },
    debounceInput: _.debounce(function (e) {
      this.getItems({query: this.query}).then((res) => {
      }).catch((error) => {
        // console.log(error.response.data.errors);
        // this.$v.nameErrors = 'какой-то текст';
      });
      }, 500)
    },

}


</script>
