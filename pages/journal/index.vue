<template>
  <section>
    <div v-if="$device.isDesktop" class="mx-auto mt-[70px] pb-[100px] max-w-3xl min-w-[950px]">
      <div class="mx-auto flex flex-col w-full">
        <nav class="flex justify-start items-center mb-1.5">
          <ul class="flex justify-center items-center flex-wrap text-[14px] list-reset">
            <li class="leading-6">
              <NuxtLink :to="`/`" class="text-gray-500 hover:text-black">Журнал</NuxtLink>
            </li>
            <li><span class="px-2 text-gray-500">/</span></li>
            <li class="leading-6">
              <p class="text-black">Статьи</p>
            </li>
          </ul>
        </nav>
        <section class="mt-[15px] mx-auto columns-[450px] gap-[50px] w-full">

          <article class="def group mb-[50px] align-top inline-block w-[450px] self-start rounded-lg bg-white">
            <NuxtLink :to="`/articles/5`">
              <section class="flex flex-col">
                <section class="w-full h-[450px] rounded-t-lg" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/journal_static/262.png)"></section>
                <section class="my-5 flex flex-col px-5">
                  <h2 class="font-black text-2xl leading-7">
                    Оружие против боли и микробов
                  </h2>
                </section>
              </section>
            </NuxtLink>
          </article>

          <article class="abs group mb-[50px] align-top inline-block w-[450px] rounded-lg">
            <NuxtLink :to="`/articles/4`">
              <section class="flex flex-col">
                <section class="relative w-full h-[600px] text-white rounded-lg" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/journal_static/261.png)">
                  <section class="absolute bottom-7 left-5 right-5">
                    <h2 class="font-black text-2xl leading-7">Бомбардировка Хиросимы и Нагасаки</h2>
                    <h3 class="mt-5">В момент создания атомной бомбы не обсуждались политические и другие аспекты. Всё изменилось после смерти Рузвельта, в конце апреля 1945 года, когда работы были ...</h3>
                  </section>
                </section>
              </section>
            </NuxtLink>
          </article>

          <article class="def group mb-[50px] align-top inline-block w-[450px] rounded-lg bg-white">
            <NuxtLink :to="`/articles/3`">
              <section class="flex flex-col">
                <section class="w-full h-[450px] rounded-t-lg" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/journal_static/260.png)"></section>
                <section class="my-5 flex flex-col px-5">
                  <h2 class="font-black text-2xl leading-7">
                    Боги викингов и религиозные обряды
                  </h2>
                </section>
              </section>
            </NuxtLink>
          </article>

          <article class="abs group mb-[50px] align-top inline-block w-[450px] rounded-lg">
            <NuxtLink :to="`/articles/2`">
              <section class="flex flex-col">
                <section class="relative w-full h-[600px] text-white rounded-lg" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/journal_static/259.png)">
                  <section class="absolute bottom-7 left-5 right-5">
                    <h2 class="font-black text-2xl leading-7">Карельская сказка «Зять Хома»</h2>
                    <h3 class="mt-5">Высоко ценилось умение рассказывать сказки, особенно этим славился карельский народ, где слава о хорошем сказочнике простиралась далеко за сотню вёрст. Сказочника звали в народе ...</h3>
                  </section>
                </section>
              </section>
            </NuxtLink>
          </article>

          <article class="def group mb-[50px] align-top inline-block w-[450px] rounded-lg bg-white">
            <NuxtLink :to="`/articles/1`">
              <section class="flex flex-col">
                <section class="w-full h-[450px] rounded-t-lg" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/journal_static/258.png)"></section>
                <section class="my-5 flex flex-col px-5">
                  <h2 class="font-black text-2xl leading-7">
                    Художник, прославивший австрийское искусство
                  </h2>
                </section>
              </section>
            </NuxtLink>
          </article>


        </section>
      </div>
    </div>

    <div v-if="$device.isMobile" class="mx-auto mt-[70px] pb-[80px] w-full min-w-[320px]">
        <nav class="px-5 flex justify-start items-center mb-1.5">
          <ul class="flex justify-center items-center flex-wrap text-[14px] list-reset">
            <li class="leading-6">
              <NuxtLink :to="`/`" class="text-gray-500 hover:text-black">Журнал</NuxtLink>
            </li>
            <li><span class="px-2 text-gray-500">/</span></li>
            <li class="leading-6">
              <p class="text-black">Статьи</p>
            </li>
          </ul>
        </nav>
        <section class="mt-[15px] mx-auto px-2.5 flex flex-col justify-center items-start max-w-[450px] items-start">

          <article class="def group mb-[20px] inline-block w-full rounded-lg bg-white">
            <NuxtLink :to="`/articles/5`">
              <section class="flex flex-col">
                <section class="w-full h-[450px] rounded-t-lg bg-cover bg-center" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/journal_static/262.png)"></section>
                <section class="mt-3 mb-5 flex flex-col px-3">
                  <h2 class="font-black text-xl leading-6">
                    Оружие против боли и микробов
                  </h2>
                </section>
              </section>
            </NuxtLink>
          </article>

          <article class="abs group mb-[20px] inline-block w-full rounded-lg">
            <NuxtLink :to="`/articles/4`">
              <section class="flex flex-col">
                <section class="relative w-full h-[600px] text-white rounded-lg bg-cover bg-center" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/journal_static/261.png)">
                  <section class="absolute bottom-7 left-3 right-3">
                    <h2 class="font-black text-xl leading-6">Бомбардировка Хиросимы и Нагасаки</h2>
                    <h3 class="mt-5">В момент создания атомной бомбы не обсуждались политические и другие аспекты. Всё изменилось после смерти Рузвельта, в конце апреля 1945 года, когда работы были ...</h3>
                  </section>
                </section>
              </section>
            </NuxtLink>
          </article>

          <article class="def group mb-[20px] inline-block w-full rounded-lg bg-white">
            <NuxtLink :to="`/articles/3`">
              <section class="flex flex-col">
                <section class="w-full h-[450px] rounded-t-lg bg-cover bg-center" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/journal_static/260.png)"></section>
                <section class="mt-3 mb-5 flex flex-col px-3">
                  <h2 class="font-black text-xl leading-6">
                    Боги викингов и религиозные обряды
                  </h2>
                </section>
              </section>
            </NuxtLink>
          </article>

          <article class="abs group mb-[20px] inline-block w-full rounded-lg">
            <NuxtLink :to="`/articles/2`">
              <section class="flex flex-col">
                <section class="relative w-full h-[600px] text-white rounded-lg bg-cover bg-center" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/journal_static/259.png)">
                  <section class="absolute bottom-7 left-3 right-3">
                    <h2 class="font-black text-xl leading-6">Карельская сказка «Зять Хома»</h2>
                    <h3 class="mt-5">Высоко ценилось умение рассказывать сказки, особенно этим славился карельский народ, где слава о хорошем сказочнике простиралась далеко за сотню вёрст. Сказочника звали в народе ...</h3>
                  </section>
                </section>
              </section>
            </NuxtLink>
          </article>

          <article class="def group mb-[20px] inline-block w-full rounded-lg bg-white">
            <NuxtLink :to="`/articles/1`">
              <section class="flex flex-col">
                <section class="w-full h-[450px] rounded-t-lg bg-cover bg-center" style="background-image: url(https://storage.yandexcloud.net/backgrounds-images/journal_static/258.png)"></section>
                <section class="mt-3 mb-5 flex flex-col px-3">
                  <h2 class="font-black text-xl leading-6">
                    Художник, прославивший австрийское искусство
                  </h2>
                </section>
              </section>
            </NuxtLink>
          </article>

        </section>
    </div>
  </section>
</template>

<script>
import WhatsTapigo from "../../components/WhatsTapigo";
import SearchColorGlobalMobile from "../../components/SearchColorGlobalMobile";
import ListServicesJobs from "../../components/ListServicesJobs";
import GoSearchDesktop from "../../components/GoSearchDesktop";
import BNewLetters from "../../components/blocks/BNewLetters";
import IconListServicesIndexUslugi from "../../components/icons/IconListServicesIndexUslugi";
import IconListServicesIndexCatalog from "../../components/icons/IconListServicesIndexCatalog";

export default {
  components: {
    GoSearchDesktop,
    SearchColorGlobalMobile,
    ListServicesJobs,
    BNewLetters,
    WhatsTapigo,
    IconListServicesIndexUslugi,
    IconListServicesIndexCatalog
  },
  head: {
    title: "Журнал Тапиго",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
  methods: {
    linkHub() {
      var host = window.location.host
      if (this.$auth.loggedIn) {
        document.location.href = `${process.env.HUB_URL}/profile`;
      } else {
        document.location.href = process.env.AUTH_URL;
      }
    },
    showGoSearch() {
      this.$modal.show('GoSearch');
    },
    uslugi() {
      document.location.href = process.env.USLUGI_URL;
    },
    catalog() {
      document.location.href = process.env.CATALOG_URL;
    },
  }
}
</script>
