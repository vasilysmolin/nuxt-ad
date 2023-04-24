<template>
    <section class="journal-index">
        <div class="wrapper">
            <div>
                <nav>
                    <ul itemscope itemtype="http://schema.org/BreadcrumbList">
                        <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                            <NuxtLink :to="`/`" title="Журнал" itemprop="item">
                                <span itemprop="name">Журнал</span>
                                <meta itemprop="position" content="1">
                            </NuxtLink>
                        </li>
                        <li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
                            <span itemprop="name">Статьи</span>
                            <meta itemprop="position" content="2">
                        </li>
                    </ul>
                </nav>

                <section itemscope itemtype="http://schema.org/Blog" class="preview">

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting">
                        <NuxtLink :to="`/articles/anesthesia`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/262.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Оружие против боли и микробов</h2>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting" class="abs">
                        <NuxtLink :to="`/articles/atomic_hiroshima`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/261.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Бомбардировка Хиросимы и Нагасаки</h2>
                                    <h3 itemprop="description">В момент создания атомной бомбы не обсуждались политические и другие аспекты.
                                        Всё изменилось после смерти Рузвельта, в конце апреля 1945 года, когда работы
                                        были ...</h3>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting">
                        <NuxtLink :to="`/articles/vikings_gods`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/260.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Боги викингов и религиозные обряды</h2>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting" class="abs">
                        <NuxtLink :to="`/articles/karelia_fable`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/259.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Карельская сказка «Зять Хома»</h2>
                                    <h3 itemprop="description">Высоко ценилось умение рассказывать сказки, особенно этим славился карельский
                                        народ, где слава о хорошем сказочнике простиралась далеко за сотню вёрст.
                                        Сказочника звали в народе ...</h3>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting">
                        <NuxtLink :to="`/articles/artist_25`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/258.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Художник, прославивший австрийское искусство</h2>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting">
                        <NuxtLink :to="`/articles/test_leibovitch`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/238.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Шкала Лейбовича и болезнь упущенных возможностей</h2>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting" class="abs">
                        <NuxtLink :to="`/articles/music_7`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/201.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Солирующие музыкальные инструменты оркестра</h2>
                                    <h3 itemprop="description">Начиная с середины XX столетия классическая музыка исполняется на современных
                                        музыкальных инструментах, а это уже совсем иное ...</h3>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting" class="abs">
                        <NuxtLink :to="`/articles/test_omura`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/185.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Детектор лжи — тест Омура</h2>
                                    <h3 itemprop="description">Тест «Кольцо Омуры» опирается на определённые манипуляции, которые вызывают в
                                        теле чёткие ответные реакции мышц. Если мышцы реагируют ...</h3>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting">
                        <NuxtLink :to="`/articles/fast`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/172.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Приметы и обычаи Великого поста на Руси</h2>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting">
                        <NuxtLink :to="`/articles/king`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/142.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Царство ужаса и террора Ивана Грозного</h2>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting" class="abs">
                        <NuxtLink :to="`/articles/time_money`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/50.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Да, это банально: время — деньги</h2>
                                    <h3 itemprop="description">Нет ничего продолжительнее времени, так как оно мера вечности; нет ничего короче
                                        его, так как его недостает для всех наших начинаний…</h3>
                                </section>
                            </section>
                        </NuxtLink>
                    </article>

                    <article itemprop="blogPosts" itemscope itemtype="http://schema.org/BlogPosting">
                        <NuxtLink :to="`/articles/diary`">
                            <section class="block">
                                <img itemprop="image" src="https://storage.yandexcloud.net/backgrounds-images/journal_static/31.png"
                                     alt="">
                                <section class="content">
                                    <h2 itemprop="headline">Психоаналитик внутри каждого из нас</h2>
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
export default {
    head: {
        title: "Материалы, проекты и подкасты без политики | Журнал Тапиго",
        meta: [
            {
                hid: 'description',
                name: 'description',
                content: ''
            },
            {
                hid: 'og:type',
                property: 'og:type',
                content: 'website'
            },
            {
                hid: 'og:title',
                property: 'og:title',
                content: 'Материалы, проекты и подкасты без политики | Журнал Тапиго'
            },
            {
                hid: 'og:image',
                property: 'og:image',
                content: 'https://storage.yandexcloud.net/backgrounds-images/journal_static/opengraph/articles/tapigo.png'
            },
            {
                hid: 'og:url',
                property: 'og:url',
                content: 'https://journal.tapigo.ru'
            },
        ]
    },
}
</script>
