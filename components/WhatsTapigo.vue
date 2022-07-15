<template>
  <section>
    <div v-if="$device.isDesktop">
      <span class="block mx-auto my-12 w-[10px] h-[10px] rounded-full bg-gray-300"></span>
      <div class="w-[100%] border border-solid border-[#D9DBE9] rounded-lg">
        <label for="state" class="px-4 flex justify-between items-center">
          <div class="button text-base py-4">Что такое Тапиго</div>
          <div class="rotate-180">
            <ArrowClick/>
          </div>
        </label>
        <input type="checkbox" id="state" hidden>
        <div class="content">
          <div class="inner">
            <p class="text-[15px] leading-normal">Тапиго — это платформа, которая позволяет вам из одного места решать разные задачи используя все преимущества единого аккаунта. Для людей и для компаний.</p>
          </div>
        </div>
      </div>
      <span class="block mx-auto mt-12 w-[10px] h-[10px] rounded-full bg-gray-300"></span>
    </div>


    <div v-if="$device.isMobile" class="mt-7 w-[100%] border-2 border-solid border-[#D9DBE9] rounded-lg">
      <label for="state" class="px-2 flex justify-between items-center">
        <div class="button text-sm py-4">Что такое Тапиго</div>
        <div class="rotate-180">
          <ArrowClick/>
        </div>
      </label>
      <input type="checkbox" id="state" hidden>
      <div class="content">
        <div class="inner">
          <p class="text-xs leading-snug">Тапиго — это платформа, которая позволяет вам из одного места решать разные задачи используя все преимущества единого аккаунта. Для людей и для компаний.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ArrowClick from "./icons/ArrowClick";
export default {
  name: "WhatsTapigo",
  components: {ArrowClick},
}
</script>

<style scoped>
.button {
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
}
.content {
  width: 100%;
  overflow: hidden;
  max-height: 0;
  transition: all 0.3s ease-in-out;
  font-size: 18pt;
  overflow: hidden;
  box-sizing: border-box;
}
#state:checked ~ .content {
  max-height: 150px;
}
.inner {
  margin: 16px;
}
</style>
