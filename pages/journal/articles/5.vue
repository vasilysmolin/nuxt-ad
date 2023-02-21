<template>
  <section>
    <div v-if="$device.isDesktopOrTablet" class="mx-auto mt-[70px] pb-[100px] max-w-3xl min-w-[950px]">
      <div class="mx-auto flex flex-col w-full">
        <nav class="flex justify-start items-center mb-1.5">
          <ul class="flex justify-center items-center flex-wrap text-[14px] list-reset">
            <li class="leading-6">
              <NuxtLink :to="`/`" class="text-gray-500 hover:text-black">Журнал</NuxtLink>
            </li>
            <li><span class="px-2 text-gray-500">/</span></li>
            <li class="leading-6">
              <NuxtLink :to="`/`" class="text-gray-500 hover:text-black">Статьи</NuxtLink>
            </li>
            <li><span class="px-2 text-gray-500">/</span></li>
            <li class="leading-6">
              <p class="text-black">Оружие против боли и микробов</p>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
</template>