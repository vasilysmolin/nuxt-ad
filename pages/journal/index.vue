<template>
    <section class="journal_index">
        <div class="wrapper">
            <div>

                <nav>
                    <ul>
                        <li>
                            <NuxtLink :to="`/`" class="text-gray-500 hover:text-black">Журнал</NuxtLink>
                        </li>
                        <li><span>/</span></li>
                        <li>Статьи</li>
                    </ul>
                </nav>

                <section class="preview">

                    <article>
                        <NuxtLink :to="`/articles/anesthesia`">
                            <section class="block">
                                <img src="https://storage.yandexcloud.net/backgrounds-images/journal_static/262.png"
                                     alt="">
                                <section class="content">
                                    <h2>Оружие против боли и микробов</h2>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article class="abs">
                        <NuxtLink :to="`/articles/atomic_hiroshima`">
                            <section class="block">
                                <img src="https://storage.yandexcloud.net/backgrounds-images/journal_static/261.png"
                                     alt="">
                                <section class="content">
                                    <h2>Бомбардировка Хиросимы и Нагасаки</h2>
                                    <h3>В момент создания атомной бомбы не обсуждались политические и другие аспекты.
                                        Всё изменилось после смерти Рузвельта, в конце апреля 1945 года, когда работы
                                        были ...</h3>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article>
                        <NuxtLink :to="`/articles/vikings_gods`">
                            <section class="block">
                                <img src="https://storage.yandexcloud.net/backgrounds-images/journal_static/260.png"
                                     alt="">
                                <section class="content">
                                    <h2>Боги викингов и религиозные обряды</h2>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article class="abs">
                        <NuxtLink :to="`/articles/karelia_fable`">
                            <section class="block">
                                <img src="https://storage.yandexcloud.net/backgrounds-images/journal_static/259.png"
                                     alt="">
                                <section class="content">
                                    <h2>Карельская сказка «Зять Хома»</h2>
                                    <h3>Высоко ценилось умение рассказывать сказки, особенно этим славился карельский
                                        народ, где слава о хорошем сказочнике простиралась далеко за сотню вёрст.
                                        Сказочника звали в народе ...</h3>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article>
                        <NuxtLink :to="`/articles/artist_25`">
                            <section class="block">
                                <img src="https://storage.yandexcloud.net/backgrounds-images/journal_static/258.png"
                                     alt="">
                                <section class="content">
                                    <h2>Художник, прославивший австрийское искусство</h2>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article>
                        <NuxtLink :to="`/articles/test_leibovitch`">
                            <section class="block">
                                <img src="https://storage.yandexcloud.net/backgrounds-images/journal_static/238.png"
                                     alt="">
                                <section class="content">
                                    <h2>Шкала Лейбовича и болезнь упущенных возможностей</h2>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>


                </section>
            </div>
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
