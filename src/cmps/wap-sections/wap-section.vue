<template>
  <draggable
    class="list-group wap-section"
    :class="'type-' + typeId"
    @click.stop="$emit('select', { cmpId })"
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
    :group="'section-' + cmpId">
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
          @select="emitSelect" />
        <!--
        <video
          src="https://knowledge.s.dance.app/videos/hero_home_alt_15s_16_9.webm"
          autoplay
          loop
          playsinline
          muted></video>

        <span
          class="tag"
          :style="info?.tag?.options.style"
          @click.stop="$emit('select', { cmpId, elType: 'tag' })"
          @change="updateContent('tag')"
          :contenteditable="$store.getters.isEditMode">
          {{ info?.tag?.content.text }}This is tag
        </span>

        <h2
          class="title"
          @change="updateContent('title')"
          :style="info?.title?.options.style"
          @click.stop="$emit('select', { cmpId, elType: 'title' })"
          :contenteditable="$store.getters.isEditMode">
          {{ info?.title?.content.text }}
        </h2>

        <p
          class="text"
          @change="updateContent('text')"
          :style="info?.text?.options.style"
          @click.stop="$emit('select', { cmpId, elType: 'text' })"
          :contenteditable="$store.getters.isEditMode">
          {{ info?.text?.content.text }}
        </p>

        <button
          class="btn"
          :style="info?.btn?.options.style"
          @click.stop="$emit('select', { cmpId, elType: 'btn' })">
          <span
            :contenteditable="$store.getters.isEditMode"
            @change="updateContent('btn')">
            {{ info?.btn?.content.text }}
          </span>
        </button> -->
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
  props: ['info', 'cmpId', 'options', 'cmps', 'typeId'],

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
      this.$emit('update', { cmpId, elType, content: info.text.content })
    },
  },
}
</script>

<style lang="scss" scoped></style>
