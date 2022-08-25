<template>

<div class="form-floating mb-4 w-full sm:w-[27rem]">
      <input
          v-on="listeners"
          v-on:keyup.enter="submitted"
          :value="value"
          type="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
        focus:text-black focus:bg-white focus:border-black focus:outline-hidden" id="floatingInput"
          :placeholder="placeholder"
      />
      <label for="floatingInput" class="text-[#6E7191]">{{ placeholder }}</label>
      <span v-if="error" class="form-errors">
            {{ error }}
            </span>
    </div>
</template>

<script>

export default {
  name: "BInput",
  data() {
    return {}
  },
  mounted() {
  },
  props: {
    autofocus: {
      type: Boolean,
      default: false,
    },
    white: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: false,
    },
    clear: {
      type: Boolean,
      default: false,
    },
    submitted: {
      type: Function,
      default: () => {
      }
    }
  },
  computed: {
    listeners() {
      return {
        input: (event) => {
          this.$emit('input', event.target.value);
        },
      };
    },
  },
  methods: {
    onClearClick() {
      this.$emit('input', '');
    },
  },
}
</script>
