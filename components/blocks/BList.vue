<template>
  <section v-if="lists" class="flex flex-col mt-4 p-5 w-[95%] rounded-lg sm:max-w-screen-sm bg-white">
    <h2 class="text-lg font-bold text-black">{{ title }}</h2>
    <p v-for="item in lists" class="mt-1 text-sm sm:text-base text-gray-600">{{item.name}}: {{item.value}}</p>
  </section>
</template>

<script>
import AuthModal from "../../components/AuthModal";

export default {
  name: "BList",
  data() {
    return {
      isLoading: false,
    }
  },
  components: {AuthModal},
  mounted() {
    this.$nextTick(function () {
      this.isLoading = true;
    });
    console.log(this.lists);
  },
  props: {
    title: String,
    lists: Array,
  },
  computed: {
  },
  methods: {
  },

}
</script>
