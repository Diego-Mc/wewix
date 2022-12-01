<template>
  <article class="wap-card">
    <img
      :style="info.img.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'img' })"
      class="card-img"
      :src="info.img.options.meta.src" />
    <span class="details" :style="info.details.options.style">
      <span
        @click.stop="$emit('select', { cmpId, childCmpId, elType: 'details' })"
        @blur="updateContent('details', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info.details.content.text }}
      </span>
      <span
        class="tag"
        :style="info.tag.options.style"
        @click.stop="$emit('select', { cmpId, childCmpId, elType: 'tag' })"
        @blur="updateContent('tag', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info.tag.content.text }}
      </span>
    </span>

    <h3
      class="title"
      :style="info.title.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'title' })"
      @blur="updateContent('title', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info.title.content.text }}
    </h3>

    <p
      class="text"
      :style="info.text.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'text' })"
      @blur="updateContent('text', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info.text.content.text }}
    </p>

    <button
      class="btn"
      :style="info.btn.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'btn' })">
      <span
        @blur="updateContent('btn', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info.btn.content.text }}
      </span>
    </button>
  </article>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'

export default {
  props: ['info', 'cmpId', 'options', 'childCmpId'],
  methods: {
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
        childCmpId: this.childCmpId,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
