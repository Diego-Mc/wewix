<template>
  <section
    class="text-section"
    :class="'type-' + typeId"
    :style="options.style">
    <span
      v-if="info.tag"
      class="tag"
      @input="updateContent('tag', $event)"
      :style="info?.tag?.options.style"
      @click.stop="emitSelect('tag', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.tag?.content.text }}
    </span>

    <section v-if="info.img" class="img" :style="info?.title?.options.style">
      <img
        :src="info?.img?.options?.meta.src"
        @click.stop="emitSelect('img', $event)" />
    </section>

    <div class="titles-wrapper">
      <h2
        v-if="info.title"
        class="title"
        @input="updateContent('title', $event)"
        :style="info?.title?.options.style"
        @click.stop="emitSelect('title', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info?.title?.content.text }}
      </h2>
      <h2
        v-if="info.subtitle"
        class="subtitle"
        @input="updateContent('subtitle', $event)"
        :style="info?.subtitle?.options.style"
        @click.stop="emitSelect('subtitle', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info?.subtitle?.content.text }}
      </h2>
    </div>
    <p
      v-if="info.text"
      class="text"
      @input="updateContent('text', $event)"
      :style="info?.text?.options.style"
      @click.stop="emitSelect('text', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.text?.content.text }}
    </p>
    <p
      v-if="info.details"
      class="details"
      @input="updateContent('details', $event)"
      :style="info?.details?.options.style"
      @click.stop="emitSelect('details', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.details?.content.text }}
    </p>
    <button
      v-if="info.btn"
      class="btn"
      @input="updateContent('btn', $event)"
      :style="info?.btn?.options.style"
      @click.stop="btnClicked($event)">
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
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
        childCmpId: this.childCmpId,
        elDom: e,
      })
    },
    emitSelect(elType, e) {
      console.log('wap-text section', this.cmpId)
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType,
        elDom: e,
      })
    },
    btnClicked(ev) {
      if (!this.$store.getters.isEditMode && this.info.btn.options.meta.href) {
        location.href = '//' + this.info.btn.options.meta.href
      } else {
        this.emitSelect('btn', ev)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
