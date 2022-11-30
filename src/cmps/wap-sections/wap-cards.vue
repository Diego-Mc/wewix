<template>
  <section class="wap-cards">
    <wap-card />
    <wap-card />
    <wap-card />
    <wap-card />
  </section>
</template>

<script>
import wapCard from '../wap-items/wap-card.vue'
export default {
  props: ['info', 'cmpId', 'style'],
  methods: {
    updateContent(name) {
      this.$emit('update', { cmpId, name, content: info.text.content })
    },
  },
  created() {
    console.log(this.info)
  },
  components: {
    wapCard,
  },
}
</script>

<style lang="scss" scoped></style>
