<template>
  <section>
    <NavLoc/>
    <div class="container flex flex-col items-center mt-[20px]">
      <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
        <section class="flex flex-col items-start mb-5 w-[95%] sm:w-[27rem]">
          <article class="flex justify-between w-full">
            <p class="text-xs text-[#A0A3BD]">Юридическое лицо</p>
            <p class="text-xs text-[#D9DBE9] uppercase">инн<span class="pl-1">5905287782</span></p>
          </article>
          <h1 class="mt-2 w-full text-xl text-black font-black leading-none truncate">Заправкин</h1>
        </section>
        <form class=" w-[95%]">
          <div class="flex flex-col items-center w-full">
            <div class="form-floating mb-4 w-full sm:w-[27rem]">
              <input type="email" class="form-control
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
                     placeholder="Ваш телефон" value="info@za-pravkin.ru">
              <label for="floatingInput" class="text-[#6E7191]">Ваша почта</label>
            </div>

            <div class="form-floating w-full sm:w-[27rem]">
              <input type="text" class="form-control
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
    focus:text-black focus:bg-white focus:border-black focus:outline-hidden" id="floatingPassword"
                     placeholder="Ваш телефон" value="+7 (342) 270-03-50">
              <label for="floatingPassword" class="text-[#6E7191]">Ваш телефон</label>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import NavLoc from "../components/NavLoc";
export default {
  name: 'Profile',
  components: {NavLoc},
}


</script>
