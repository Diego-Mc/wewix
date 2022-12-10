<template>
  <draggable
    class="list-group wap-hero"
    :class="'type-' + typeId"
    @click.stop="emitSelect({ cmpId })"
    :style="options.style"
    :component-data="{
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    v-model="cmps"
    v-bind="dragOptions"
    @start="drag = true"
    @end="onDrop"
    item-key="id"
    :group="'hero-' + cmpId"
    :disabled="!this.$store.getters.isEditMode">
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
          @click.stop="emitSelect({ cmpId, childCmpId: element.id })" />
        <!-- <video
            src="https://knowledge.s.dance.app/videos/hero_home_alt_15s_16_9.webm,"
            autoplay
            loop
            playsinline
            muted></video>-->
      </div>
    </template>
  </draggable>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
import wapImgSection from '../wap-items/wap-img-section.vue'
import wapTextSection from '../wap-items/wap-text-section.vue'
import draggable from 'vuedraggable'

export default {
  props: ['info', 'cmpId', 'options', 'cmps', 'typeId'],
  methods: {
    onDrop() {
      this.drag = false
      eventBus.emit('onInnerCmpDrop', {
        cmpId: this.cmpId,
        cmps: [...this.cmps],
      })
    },
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
      })
    },
    emitSelect(elInfo) {
      eventBus.emit('select', elInfo)
    },
  },
  data() {
    return {
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
      drag: false,
    }
  },
  created() {},
  components: {
    wapImgSection,
    wapTextSection,
    draggable,
  },
}
</script>

<style lang="scss" scoped></style>
