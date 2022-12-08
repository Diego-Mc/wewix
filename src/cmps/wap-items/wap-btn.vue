<template>
  <button
    class="btn"
    :class="'type-' + typeId"
    v-if="info.btn"
    :style="info?.btn?.options.style"
    @click.stop="emitSelect('btn', $event)">
    <span
      @input="updateContent('btn', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.btn?.content.text }}
    </span>
  </button>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'

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
}
</script>

<style lang="scss" scoped></style>
