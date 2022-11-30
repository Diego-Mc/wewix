<template>
  <section class="wap-hero" @click.stop="$emit('select', { cmpId})">
    <h2
      class="title"
      :style="info.title.options.style"
      @change="updateContent('title')"
      @click.stop="$emit('select', { cmpId, name: 'title' })"
      contenteditable>
      {{ info.title.content.text }}
    </h2>
    <p
      class="text"
      :style="info.text.options.style"
      @change="updateContent('text')"
      @click.stop="$emit('select', { cmpId, name: 'text' })"
      contenteditable>
      {{ info.text.content.text }}
    </p>
    <button
      class="btn"
      :style="info.btn.options.style"
      @click.stop="$emit('select', { cmpId, name: 'btn' })"
      @change="updateContent('btn')">
      {{ info.btn.content.text }}
    </button>
  </section>
</template>

<script>
export default {
  props: ['info', 'cmpId', 'options'],
  methods: {
    updateContent(name) {
      this.$emit('update', { cmpId, name, content: info.text.content })
    },
  },
  created() { 
  },
}
</script>

<style lang="scss" scoped></style>
