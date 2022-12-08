<template>
  <article :style="options.style" class="wap-card" :class="'type-' + typeId">
    <img
      v-if="info.img"
      :style="info?.img?.options.style"
      @click.stop="emitSelect('img', $event)"
      class="card-img"
      :src="info?.img?.options.meta.src" />
    <span
      v-if="info.details"
      class="details"
      :style="info?.details?.options.style">
      <span
        @click.stop="emitSelect('details', $event)"
        @input="updateContent('details', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info?.details?.content.text }}
      </span>
      <span
        v-if="info.tag"
        class="tag"
        :style="info?.tag?.options.style"
        @click.stop="emitSelect('tag', $event)"
        @input="updateContent('tag', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info?.tag?.content.text }}
      </span>
    </span>

    <h3
      v-if="info.title"
      class="title"
      :style="info?.title?.options.style"
      @click.stop="emitSelect('title', $event)"
      @input="updateContent('title', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.title?.content.text }}
    </h3>
    <h3
      v-if="info.subtitle"
      class="subtitle"
      :style="info?.subtitle?.options.style"
      @click.stop="emitSelect('subtitle', $event)"
      @input="updateContent('subtitle', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.subtitle?.content.text }}
    </h3>

    <p
      v-if="info.text"
      class="text"
      :style="info?.text?.options.style"
      @click.stop="emitSelect('text', $event)"
      @input="updateContent('text', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.text?.content.text }}
    </p>
    <p
      v-if="info.text1"
      class="text1"
      :style="info?.text1?.options.style"
      @click.stop="emitSelect('text1', $event)"
      @input="updateContent('text1', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.text1?.content.text }}
    </p>
    <p
      v-if="info.text2"
      class="text2"
      :style="info?.text2?.options.style"
      @click.stop="emitSelect('text2', $event)"
      @input="updateContent('text2', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.text2?.content.text }}
    </p>
    <p
      v-if="info.text3"
      class="text3"
      :style="info?.text3?.options.style"
      @click.stop="emitSelect('text3', $event)"
      @input="updateContent('text3', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.text3?.content.text }}
    </p>
    <p
      v-if="info.text4"
      class="text4"
      :style="info?.text4?.options.style"
      @click.stop="emitSelect('text4', $event)"
      @input="updateContent('text4', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.text4?.content.text }}
    </p>

    <button
      class="btn"
      v-if="info.btn"
      :style="info?.btn?.options.style"
      @click.stop="emitSelect('btn', $event)">
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
        elDom: e,
      })
    },
    emitSelect(elType, e) {
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType,
        elDom: e,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
