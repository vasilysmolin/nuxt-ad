<template>
  <section>
    <div class="container items-center flex flex-col mt-[20px]">

      <div class="flex flex-col px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <form class="w-[95%] items-center " v-if="feedsArray.length === 0">
          <div class="flex flex-col items-center w-full">
            <h1 class="mb-4 w-full text-xl text-black font-bold text-left leading-none truncate">
              {{ $t('feed.h1') }}</h1>
            <p class="mb-5">{{ $t('feed.text') }}</p>
          </div>

          <div class="flex flex-col items-center w-full mb-4">
            <div class="mb-4 w-full sm:w-[27rem]">
              <select class="form-select form-select-lg mt-2 forms-select" v-model="type">

                <option v-for="(item, index) in ['cian', 'avito', 'yandex']"
                        :value="item"
                        :key="index"
                        :selected="item === type"
                >
                  {{ item }}
                </option>
              </select>
            </div>
            <div class="mb-4 w-full sm:w-[27rem]">
              <BInput
                  v-model="url"
                  type="text"
                  :error="''"
                  :placeholder="$t('profile.feed')"
              />
            </div>
            <span v-if="urlErrors" class="form-errors">
            {{ urlErrors }}
            </span>
            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <button type="button" @click.prevent="saveParser"
                      class="inline-block px-7 py-4 bg-blue-900 text-white font-bold text-normal tracking-wider leading-snug rounded hover:bg-black focus:bg-black focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
                {{ $t('feed.add') }}
              </button>
              <span v-if="errorText" class="form-errors">
                {{ errorText }}
              </span>
            </div>

          </div>
        </form>
        <template class="text-left">
          <h1 class="mb-4 w-full text-xl text-black font-bold text-left leading-none truncate">{{ $t('feed.h2') }}</h1>
          <ul v-if="feedsArray.length > 0" class="flex flex-col items-start">
            <li v-for="(feed, index) in feedsArray" :key="feed.id">
              {{ index + 1 }}. {{ feed.name }} {{ feed.url }}
              <button class="text-red-600" @click.prevent="removeFeed(feed,index)">X</button>
            </li>
          </ul>
          <span v-if="successText" class="text-green-500">
                {{ successText }}
              </span>
        </template>
      </div>


    </div>
  </section>
</template>

<script>
import NavLocProfile from "~/components/NavLocProfile";
import BInput from "~/components/blocks/BInput";
import Person from "~/components/mixins/person.mixin";
import AddInviteModal from "~/components/AddInviteModal";
import DelAcc from "~/components/icons/DelAcc";
import {required, url} from "vuelidate/lib/validators";
import Validations from "~/components/mixins/validations.mixin"
import {mapActions, mapGetters} from "vuex";
import * as _ from "lodash";

export default {
  name: 'Profile',
  components: {DelAcc, NavLocProfile, BInput, AddInviteModal},
  mixins: [Validations, Person],
  layout: 'hub',
  head: {
    title: "Настройки пользователя Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  data() {
    return {
      url: null,
      type: 'cian',
      successText: null,
      errorText: null,
      name: 'cian',
      feedsArray: [],
    }
  },
  validations: {
    url: {
      required,
      url
    },
  },

  middleware: ['redirect', 'person'],
  async mounted() {
    if (this.feeds.length === 0) {
      await this.getItems({}).then(() => {
        this.feedsArray = this.feeds;
      });
    }
  },
  computed: {
    ...mapGetters({
      feeds: 'feeds/feeds',
    }),

  },
  methods: {
    ...mapActions({
      getItems: 'feeds/getItems',
    }),
    removeFeed(feed, indexFeed) {
      this.$axios.$delete(`feeds/${feed.id}`).then((res) => {
        _.remove(this.feedsArray, function (item, index) {
          return index === indexFeed;
        });
        this.feedsArray = [];
      }).catch((error) => {
        console.log(error.response.data.errors);
      });
    },
    saveParser() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      let data = new FormData();
      data.append('url', this.url);
      data.append('type', this.type);
      data.append('name', this.name);
      const $this = this;
      this.$axios.$post(`feeds`, data).then((res) => {
        $this.$axios.$post(`realties/import`, {'id': res.id}).then((res) => {
          this.successText = 'Объекты импортируются в течении пары минут';
          this.errorText = null;
          this.getItems({}).then(() => {
            this.feedsArray = this.feeds;

          });
        }).catch((error) => {
          this.errorText = 'Нужно удалить прошлый фид';
          this.successText = null;
        });
      }).catch((error) => {
        this.errorText = 'Нужно удалить прошлый фид';
        this.successText = null;
      });
    },
  },

}


</script>
