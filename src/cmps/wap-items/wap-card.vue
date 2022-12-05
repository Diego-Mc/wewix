<template>
  <article :style="options.style" class="wap-card" :class="'type-' + typeId" >
    <img
      v-if="info.img"
      :style="info?.img?.options.style"
      @click.stop="emitSelect('img',$event)"
      class="card-img"
      :src="info?.img?.options.meta.src" />
    <span
      v-if="info.details"
      class="details"
      :style="info?.details?.options.style">
      <span
        @click.stop="emitSelect('details')"
        @input="updateContent('details', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info?.details?.content.text }}
      </span>
      <span
        v-if="info.tag"
        class="tag"
        :style="info?.tag?.options.style"
        @click.stop="emitSelect('tag')"
        @input="updateContent('tag', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info?.tag?.content.text }}
      </span>
    </span>

    <h3
      v-if="info.title"
      class="title"
      :style="info?.title?.options.style"
      @click.stop="emitSelect('title')"
      @input="updateContent('title', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.title?.content.text }}
    </h3>

    <p
      v-if="info.text"
      class="text"
      :style="info?.text?.options.style"
      @click.stop="emitSelect('text')"
      @input="updateContent('text', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.text?.content.text }}
    </p>

    <button
      class="btn"
      v-if="info.btn"
      :style="info?.btn?.options.style"
      @click.stop="emitSelect('btn')">
      <span
        @input="updateContent('btn', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info?.btn?.content.text }}
      </span>
    </button>
  </article>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'

export default {
  props: ['info', 'cmpId', 'options', 'childCmpId', 'typeId'],
  methods: {
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
        childCmpId: this.childCmpId,
      })
    },
    emitSelect(elType,e) {
      console.log(window.getComputedStyle(e.target))
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
