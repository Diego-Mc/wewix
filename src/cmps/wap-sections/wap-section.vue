<template>
  <section class="wap-section">
    <h2
      class="title"
      :style="info.title.style"
      @change="updateContent('title')"
      @click="$emit('select', { cmpId, name: 'title' })"
      contenteditable>
      Move your way
      {{ info.title.content.text }}
    </h2>
    <p
      class="text"
      :style="info.text.style"
      @change="updateContent('text')"
      @click="$emit('select', { cmpId, name: 'text' })"
      contenteditable>
      Choose the electric ride that suid tour lifestyle
      {{ info.text.content.text }}
    </p>
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
    console.log(this.info)
  },
}
</script>

<style lang="scss" scoped></style>
