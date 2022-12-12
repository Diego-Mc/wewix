<template>
  <section
    v-if="info.img"
    class="img-section"
    :class="'type-' + typeId"
    @click.stop="emitSelect($event)"
    :style="options.style">
    <div class="img-container">
      <img :src="info.img.options.meta.src" @click.stop="emitSelect($event)"/>
    </div>
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'

export default {
  props: ['info', 'cmpId', 'childCmpId', 'options', 'typeId'],
  methods: {
    emitSelect(e) {
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType: 'img',
        elDom:e
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
