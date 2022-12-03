<template>
  <!-- $emit('select', { cmpId}) -->
  <draggable
    class="list-group wap-cards"
    :class="'type-' + typeId"
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
    :group="'cards-' + cmpId"
    @click.stop="onCmpClick({ cmpId})">
    <template #item="{ element }">
      <div>
        <component
          :is="element.type"
          :key="element.id"
          :options="element.options"
          :info="element.info"
          :cmpId="cmpId"
          :childCmpId="element.id"
          :typeId="element.typeId"
          @click.stop="onCmpClick({ cmpId, childCmpId: element.id })" />
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
    onDrop() {
      this.drag = false
      eventBus.emit('onInnerCmpDrop', {
        cmpId: this.cmpId,
        cmps: [...this.cards],
      })
    },
    onCmpClick(elInfo) {
      eventBus.emit('select', elInfo)
    },
  },
}
</script>
