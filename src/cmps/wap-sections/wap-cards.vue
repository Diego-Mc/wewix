<template>
  <!-- $emit('select', { cmpId}) -->
  <draggable
    class="list-group wap-cards"
    :class="'type-' + typeId"
    @click.stop="onCmpClick"
    :style="options.style"
    :component-data="{
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    v-model="cards"
    v-bind="dragOptions"
    @start="drag = true"
    @end="onDrop"
    item-key="order"
    :group="'cards-' + cmpId">
    <template #item="{ element }">
      <div>
        <component
          :is="element.type"
          :key="element.id"
          :options="element.options"
          :info="element.info"
          :cmpId="cmpId"
          :childCmpId="element.id"
          @select="emitSelect"
          :typeId="element.typeId"
          />
      </div>
    </template>
  </draggable>
</template>

<script>
import wapCard from '../wap-items/wap-card.vue'
import draggable from 'vuedraggable'
import { eventBus } from '../../services/event-bus.service'
export default {
  props: ['info', 'cmpId', 'options', 'cmps', 'typeId'],

  data() {
    return {
      cards: this.cmps,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
      drag: false,
    }
  },
  components: {
    wapCard,
    draggable,
  },
  methods: {
    emitSelect(data) {
      this.$emit('select', data)
    },
    onDrop() {
      this.drag = false
      eventBus.emit('onInnerCmpDrop', {
        cmpId: this.cmpId,
        cmps: [...this.cards],
      })
    },
    onCmpClick() {
      eventBus.emit('select', { cmpId: this.cmpId })
    },
  },
}
</script>
