<template>
  <LettersOfficeList/>
</template>

<script>
import LettersOfficeList from "~/components/office/settings/newsLetters/LettersOfficeList";
export default {
  components: {LettersOfficeList},
  layout: 'office',
  head: {
    title: "Office",
    meta: [
      {hid: 'description', name: 'description', content: 'Список'}
    ]
  },
}
</script>

