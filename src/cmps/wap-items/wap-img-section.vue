<template>
  <section
    class="img-section"
    @click.stop="onSelect">
    <img :src="info.img.options.meta.src" />
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service';

export default {
  props: ['info', 'cmpId', 'childCmpId', 'options'],
  methods: {
    onSelect(){
      eventBus.emit('select', { cmpId:this.cmpId, childCmpId:this.childCmpId, elType: 'img' })
    }
  },
  created() {
    console.log(this.info, 'HR')
  },
}
</script>

<style lang="scss" scoped></style>
