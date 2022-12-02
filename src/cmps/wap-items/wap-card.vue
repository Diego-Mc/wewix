<template>
  <article class="wap-card">
    <img
      :style="info.img.options.style"
      @click.stop="onElClick('img')"
      class="card-img"
      :src="info.img.options.meta.src" />
    <span class="details" :style="info.details.options.style">
      <span
        @click.stop="onElClick('details')"
        @input="updateContent('details', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info.details.content.text }}
      </span>
      <span
        class="tag"
        :style="info.tag.options.style"
        @click.stop="onElClick('tag')"
        @input="updateContent('tag', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info.tag.content.text }}
      </span>
    </span>

    <h3
      class="title"
      :style="info.title.options.style"
      @click.stop="onElClick('title')"
      @input="updateContent('title', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info.title.content.text }}
    </h3>

    <p
      class="text"
      :style="info.text.options.style"
      @click.stop="onElClick('text')"
      @input="updateContent('text', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info.text.content.text }}
    </p>

    <button
      class="btn"
      :style="info.btn.options.style"
      @click.stop="onElClick('btn')">
      <span
        @input="updateContent('btn', $event)"
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
