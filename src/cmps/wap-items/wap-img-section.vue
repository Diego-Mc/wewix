<template>
  <section
    class="img-section"
    @click.stop="$emit('select', { cmpId, childCmpId, elType: 'img' })">
    <img :src="info.img.options.meta.src" />
  </section>
</template>

<script>
export default {
  props: ['info', 'cmpId', 'childCmpId', 'options'],
  methods: {},
  created() {
    console.log(this.info, 'HR')
  },
}
</script>

<style lang="scss" scoped></style>
