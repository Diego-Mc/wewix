<template>
  <section v-if="info.img" class="img-section" @click.stop="onElClick">
    <div class="img-container">
      <img :src="info.img.options.meta.src" />
    </div>
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'

export default {
  props: ['info', 'cmpId', 'childCmpId', 'options', 'typeId'],
  methods: {
    onElClick() {
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType: 'img',
      })
    },
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
