<template>
  <section
    class="wap-hero"
    @click.stop="eventBus.emit('select', { cmpId })"
    :style="options.style">
    <video
      src="https://knowledge.s.dance.app/videos/hero_home_alt_15s_16_9.webm,"
      autoplay
      loop
      playsinline
      muted></video>
    <h2
      class="title"
      @input="updateContent('title',$event)"
      :style="info.title.options.style"
      @click.stop="eventBus.emit('select', { cmpId, elType: 'title' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info.title.content.text }}
    </h2>
    <p
      class="text"
      @input="updateContent('text',$event)"
      :style="info.text.options.style"
      @click.stop="eventBus.emit('select', { cmpId, elType: 'text' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info.text.content.text }}
    </p>
    <button
      class="btn"
      :style="info.btn.options.style"
      @click.stop="eventBus.emit('select', { cmpId, elType: 'btn' })">
      <span
        :contenteditable="$store.getters.isEditMode"
        @input="updateContent('btn',$event)">
        {{ info.btn.content.text }}
      </span>
    </button>
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
export default {
  props: ['info', 'cmpId', 'options'],
  methods: {
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
      })
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped></style>
