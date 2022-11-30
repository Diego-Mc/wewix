<template>
  <section class="wap-cards">
    <component
      v-for="cmp in cmps"
      :is="cmp.type"
      :key="cmp.id"
      :options="cmp.options"
      :info="cmp.info"
      :cmpId="id" />
  </section>
</template>

<script>
import wapCard from './wap-items/wap-card.vue'
export default {
  props: ['info', 'cmpId', 'options', 'cmps'],
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
