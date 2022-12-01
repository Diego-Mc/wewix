<template>
  <section
    class="img-section"
    @click.stop="$emit('select', { cmpId, elType: 'img' })">
    <img :src="info.img.options.meta.src" />
  </section>
</template>

<script>
export default {
  props: ['info', 'cmpId', 'options'],
  methods: {
    updateContent(elType) {
      this.$emit('update', { cmpId, elType, content: info.text.content })
    },
  },
  created() {
    console.log(this.info, 'HR')
  },
}
</script>

<style lang="scss" scoped></style>
