<template>
  <draggable
    class="list-group wap-section"
    :style="options.style"
    :component-data="{
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    v-model="sections"
    v-bind="dragOptions"
    @start="drag = true"
    @end="onDrop"
    @log="console.log('wi')"
    item-key="order"
    group="section">
    <template #item="{ element }">
      <component
        :is="element.type"
        :key="element.id"
        :options="element.options"
        :info="element.info"
        :cmpId="cmpId"
        :childCmpId="element.id"
        @select="emitSelect" />
    </template>
  </draggable>
</template>

<script>
import wapImgSection from '../wap-items/wap-img-section.vue'
import wapTextSection from '../wap-items/wap-text-section.vue'
import draggable from 'vuedraggable'
import { eventBus } from '../../services/event-bus.service'
export default {
  props: ['info', 'cmpId', 'options', 'cmps'],

  data() {
    return {
      sections: this.cmps,
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
    wapImgSection,
    wapTextSection,
    draggable,
  },
  methods: {
    emitSelect(data) {
      this.$emit('select', data)
    },
    onDrop() {
      this.drag = false
      console.log(this.cards)
      eventBus.emit('onInnerCmpDrop', { cmpId: this.cmpId, cmps: this.cards })
    },
    updateContent(elType) {
      this.$emit('update', { cmpId, elType, content: info.text.content })
    },
  },
}
</script>

<style lang="scss" scoped></style>
