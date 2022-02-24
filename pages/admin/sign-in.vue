<template>
  <div class="container flex justify-center items-center min-h-screen">
    <div class="flex flex-col items-center px-5 py-7 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
      <EOffice/>
      <form class=" w-[95%]">
        <div class="flex flex-col items-center w-full">
          <div class="form-floating mb-4 w-full sm:w-[27rem]">
            <input v-model="email" type="email" class="form-control
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
            <label for="floatingInput" class="text-[#6E7191]">Почта</label>
          </div>

          <div class="form-floating mb-5 w-full sm:w-[27rem]">
            <input type="password" v-model="password" class="form-control
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
                   placeholder="Ваша почта">
            <label for="floatingPassword" class="text-[#6E7191]">Пароль</label>
          </div>
          <div class="flex space-x-2 justify-center">
            <button type="button" @click.prevent="submitted"
                    class="inline-block px-5 py-4 bg-blue-600 text-white font-bold text-base leading-snug rounded-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out">
              Войти в офис
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import NavLocRoot from "../../components/NavLocRoot";
import EOffice from "../../components/icons/EOffice";
export default {
  layout: 'office',
  components: {EOffice, NavLocRoot}
}
</script>
