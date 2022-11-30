<template>
  <!-- $emit('select', { cmpId}) -->
  <draggable class="list-group wap-cards" :component-data="{
    type: 'transition-group',
    name: !drag ? 'flip-list' : null,
  }" v-model="cards" v-bind="dragOptions" @start="drag = true" @end="onDrop" @log="console.log('wa')" item-key="order"
    group="section">
    <template #item="{ element }">
      <div>
        <component :is="element.type" :key="element.id" :options="element.options" :info="element.info" :cmpId="cmpId"
          :childCmpId="element.id" @select="emitSelect" />
      </div>
    </template>
  </draggable>
</template>

<script>
import wapCard from '../wap-items/wap-card.vue'
import draggable from 'vuedraggable'
import { eventBus } from '../../services/event-bus.service'
export default {
  props: ['info', 'cmpId', 'options', 'cmps'],

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
      eventBus.emit('onInnerCmpDrop', { cmpId: this.cmpId, cmps: [...this.cards] })
    },
    updateContent(elType) {
      this.$emit('update', { cmpId, elType, content: info.text.content })
    },
  },
}
</script>
