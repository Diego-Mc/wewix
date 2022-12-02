<template>
  <draggable
    class="list-group wap-section"
    @click.stop="onElClick({ cmpId})"
    :style="options.style"
    :component-data="{
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    v-model="cmps"
    v-bind="dragOptions"
    @start="drag = true"
    @end="onDrop"
    item-key="order"
    group="section">
    <template #item="{ element }">
      <div>
        <component
          :is="element.type"
          :key="element.id"
          :options="element.options"
          :info="element.info"
          :cmpId="cmpId"
          :childCmpId="element.id"
          @select="emitSelect" />
      </div>
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
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: '',
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
      eventBus.emit('onInnerCmpDrop', {
        cmpId: this.cmpId,
        cmps: [...this.cmps],
      })
    },
    updateContent(elType) {
      this.$emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        // content: info.text.content,
      })
    },
    onElClick(elInfo) {
      eventBus.emit('select', elInfo)
    },
  },
}
</script>

<style lang="scss" scoped></style>
