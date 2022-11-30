<template>
  <section class="wap-hero">
    <h2
      class="title"
      :style="info.title.style"
      @change="updateContent('title')"
      @click="$emit('select', { cmpId, name: 'title' })"
      contenteditable>
      {{ info.title.content.text }}
    </h2>
    <p
      class="text"
      :style="info.text.style"
      @change="updateContent('text')"
      @click="$emit('select', { cmpId, name: 'text' })"
      contenteditable>
      {{ info.text.content.text }}
    </p>
    <button
      class="btn"
      :style="info.btn.style"
      @click="$emit('select', { cmpId, name: 'btn' })"
      @change="updateContent('btn')">
      {{ info.btn.content.text }}
    </button>
  </section>
</template>

<script>
export default {
  props: ['info', 'cmpId', 'style'],
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
