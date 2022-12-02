<template>
  <section
    v-if="info.img"
    class="img-section"
    :class="'type-' + typeId"
    @click.stop="onSelect">
    <!-- :src="info?.img?.options.meta.src" -->
    <img :src="info?.img?.options.meta.src" />
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'

export default {
  props: ['info', 'cmpId', 'childCmpId', 'options', 'typeId'],
  methods: {
    onSelect() {
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType: 'img',
      })
    },
  },
  created() {
    console.log(this.info, 'HR')
  },
}
</script>

<style lang="scss" scoped></style>
