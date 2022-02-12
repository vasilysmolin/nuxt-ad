<template>
<!--  <label>{{ label }}</label>-->
  <select class="form-control">
    <option v-for="(item,index) in items" :value="item.id" :key="item.id" :selected="item.id === select">
      {{ item.name }}
    </option>
  </select>
</template>
<script>
import * as _ from "lodash";

export default {
  // inheritAttrs: false,
  name: 'BSelect',
  data() {
    return {
      // select: this.default,
      // open: false,
    };
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    // value: {
    //   type: [String, Number],
    //   default: '',
    // },
    items: {
      type: Array,
      default: () => [],
    },
    // itemText: {
    //   type: String,
    //   default: 'text',
    // },
    // returnObject: {
    //   type: Boolean,
    //   default: false,
    // },
    select: {
      type: [String, Number],
      default: '',
    },
  },
  computed: {
    // selected() {
    //   return this.items.some((item) => {
    //     return typeof item === 'object'
    //         ? item[this.itemValue] === this.value
    //         : item === this.value;
    //   });
    // },
    attrs: {
      get(){
        return this.$model;
      },
      set(model){
        return model
      }
    },
    // listeners() {
    //   const listeners = { ...this.$listeners };
    //   listeners.change = this.updateSelect;
    //   return listeners;
    // },
  },
  // methods: {
  //   updateSelect(event) {
  //     const value = event.target.value;
  //     if (this.returnObject && typeof this.items[0] === 'object') {
  //       const item = this.items.find((el) => el[this.itemValue] === value);
  //       this.$emit('change', item);
  //     } else {
  //       this.$emit('change', value);
  //     }
  //     event.target.value =
  //         typeof this.value === 'object' ? this.value[this.itemValue] : this.value;
  //   },
  //   getValue(item) {
  //     if (typeof item !== 'object') {
  //       return item;
  //     } else {
  //       return item[this.itemValue];
  //     }
  //   },
  //   getText(item) {
  //     if (typeof item !== 'object') {
  //       return item;
  //     } else {
  //       return item[this.itemText];
  //     }
  //   },
  // },
};
</script>
