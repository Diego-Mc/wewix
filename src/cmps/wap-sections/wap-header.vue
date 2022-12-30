<template>
  <draggable
    class="list-group wap-header"
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
    item-key="id"
    :group="'header-' + cmpId"
    @click.stop="onCmpClick({ cmpId })"
    :disabled="!this.$store.getters.isEditMode || this.$store.getters.isMobileEdit">
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
import wapLogo from '../wap-items/wap-logo.vue'
import wapNav from '../wap-items/wap-nav.vue'
import wapBtn from '../wap-items/wap-Btn.vue'
import draggable from 'vuedraggable'
import { eventBus } from '../../services/event-bus.service'
import { Slide } from 'vue3-burger-menu'
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
  methods: {
    // updateContent(elType, e) {
    //   eventBus.emit('cmpUpdated', {
    //     cmpId: this.cmpId,
    //     elType,
    //     content: e.target.innerText,
    //   })
    // },
    // emitSelect(elInfo) {
    //   eventBus.emit('select', elInfo)
    // },
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
  components: {
    Slide,
    wapNav,
    wapLogo,
    wapBtn,
    draggable,
  },
}
</script>

<style lang="scss" scoped></style>

<!-- TODO: This way or using separate files with dynamic component -->
