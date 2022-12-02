<template>
  <section
    v-if="info.img"
    class="img-section"
    :class="'type-' + typeId"
    @click.stop="$emit('select', { cmpId, childCmpId, elType: 'img' })">
    <!-- :src="info?.img?.options.meta.src" -->
    <img :src="info?.img?.options.meta.src" />
  </section>
</template>

<script>
export default {
  props: ['info', 'cmpId', 'childCmpId', 'options', 'typeId'],
  methods: {},
  created() {
    console.log(this.info, 'HR')
  },
}
</script>

<style lang="scss" scoped></style>
