<template>
  <section class="wap-cards">
    <component
      v-for="cmp in cmps"
      :is="cmp.type"
      :key="cmp.id"
      :options="cmp.options"
      :info="cmp.info"
      :cmpId="cmp.id" />
  </section>
</template>

<script>
import wapCard from '../wap-items/wap-card.vue'
export default {
  props: ['info', 'cmpId', 'options', 'cmps'],
  methods: {
    updateContent(name) {
      this.$emit('update', { cmpId, name, content: info.text.content })
    },
  },
  created() {
    console.log(this.info, this.cmps)
  },
  components: {
    wapCard,
  },
}
</script>

<style lang="scss" scoped></style>
