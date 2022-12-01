<template>
  <section
    class="wap-hero"
    @click.stop="$emit('select', { cmpId })"
    :style="options.style">
    <video
      src="https://knowledge.s.dance.app/videos/hero_home_alt_15s_16_9.webm"
      autoplay
      loop
      playsinline
      muted></video>
    <h2
      class="title"
      @change="updateContent('title')"
      :style="info.title.options.style"
      @click.stop="$emit('select', { cmpId, elType: 'title' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info.title.content.text }}
    </h2>
    <p
      class="text"
      @change="updateContent('text')"
      :style="info.text.options.style"
      @click.stop="$emit('select', { cmpId, elType: 'text' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info.text.content.text }}
    </p>
    <button
      class="btn"
      :style="info.btn.options.style"
      @click.stop="$emit('select', { cmpId, elType: 'btn' })">
      <span
        :contenteditable="$store.getters.isEditMode"
        @change="updateContent('btn')">
        {{ info.btn.content.text }}
      </span>
    </button>
  </section>
</template>

<script>
export default {
  props: ['info', 'cmpId', 'options'],
  methods: {
    updateContent(elType) {
      this.$emit('update', { cmpId, elType, content: info.text.content })
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped></style>
