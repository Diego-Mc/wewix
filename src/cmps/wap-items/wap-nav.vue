<template>
  <nav
    v-if="info.nav"
    :class="'type-' + typeId"
    :style="info?.nav?.options.style"
    @click.stop="emitSelect('nav',$event)">
    <ul>
      <li
        class="nav"
        v-for="nav in info?.nav?.content"
        @input="updateContent('btn', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ nav }}
      </li>
    </ul>
  </nav>
  <Slide v-if="info.nav" noOverlay right class="burger">
    <li v-for="nav in info?.nav?.content">
      {{ nav }}
    </li>
  </Slide>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
import { Slide } from 'vue3-burger-menu'

export default {
  props: ['info', 'cmpId', 'options', 'childCmpId', 'typeId'],
  methods: {
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
        childCmpId: this.childCmpId,
        elDom: e,

      })
    },
    emitSelect(elType, e) {
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType,
        elDom: e,
      })
    },
  },
  components: {
    Slide,
  },
}
</script>

<style lang="scss" scoped></style>
