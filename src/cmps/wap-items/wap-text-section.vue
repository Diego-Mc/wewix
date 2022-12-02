<template>
  <section class="text-section" :class="'type-' + typeId">
    <span
      v-if="info.tag"
      class="tag"
      :style="info?.tag?.options.style"
      @click.stop="$emit('select', { cmpId, elType: 'tag' })"
      @change="updateContent('tag')"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.tag?.content.text }}
    </span>

    <h2
      v-if="info.title"
      class="title"
      @input="updateContent('title', $event)"
      :style="info?.title?.options.style"
      @click.stop="onElClick('title')"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.title?.content.text }}
    </h2>
    <h2
      v-if="info.subtitle"
      class="subtitle"
      @change="updateContent('subtitle')"
      :style="info?.subtitle?.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'subtitle' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.subtitle?.content.text }}
    </h2>
    <p
      v-if="info.text"
      class="text"
      @input="updateContent('text', $event)"
      :style="info?.text?.options.style"
      @click.stop="onElClick('text')"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.text?.content.text }}
    </p>
    <p
      v-if="info.details"
      class="details"
      @change="updateContent('details')"
      :style="info?.details?.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'details' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.details?.content.text }}
    </p>
    <button
      v-if="info.btn"
      class="btn"
      @input="updateContent('btn', $event)"
      :style="info?.btn?.options.style"
      @click.stop="onElClick('btn')">
      {{ info?.btn?.content.text || 'Find us' }}
    </button>
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
export default {
  props: ['info', 'cmpId', 'childCmpId', 'options', 'typeId'],
  methods: {
    updateContent(elType, e) {
      this.$emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
      })
    },
    onElClick(elType) {
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
