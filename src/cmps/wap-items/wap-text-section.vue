<template>
  <section class="text-section">
    <h2
      class="title"
      @input="updateContent('title', $event)"
      :style="info.title.options.style"
      @click.stop="onElClick('title')"
      :contenteditable="$store.getters.isEditMode">
      {{ info.title.content.text }}
    </h2>
    <p
      class="text"
      @input="updateContent('text', $event)"
      :style="info.text.options.style"
      @click.stop="onElClick('text')"
      :contenteditable="$store.getters.isEditMode">
      {{ info.text.content.text }}
    </p>
    <button
      v-if="info.btn"
      class="btn"
      @input="updateContent('btn', $event)"
      :style="info.btn.options.style"
      @click.stop="onElClick('btn')">
      {{ info.btn.content.text }}
    </button>
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service';
export default {
  props: ['info', 'cmpId', 'childCmpId', 'options'],
  methods: {
    updateContent(elType,e) {
      this.$emit('cmpUpdated', { cmpId:this.cmpId, elType, content: e.target.innerText })
    },
    onElClick(elType){
      eventBus.emit('select', { cmpId:this.cmpId, childCmpId:this.childCmpId, elType})
    },
  },
}
</script>

<style lang="scss" scoped></style>
