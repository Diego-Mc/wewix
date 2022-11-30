<template>
  <section class="text-section">
    <h2
      class="title"
      :style="info.title.options.style"
      @change="updateContent('title')"
      @click.stop="$emit('select', { cmpId, elType: 'title' })"
      contenteditable>
      {{ info.title.content.text }}
    </h2>
    <p
      class="text"
      :style="info.text.options.style"
      @change="updateContent('text')"
      @click.stop="$emit('select', { cmpId, elType: 'text' })"
      contenteditable>
      {{ info.text.content.text }}
    </p>
    <button
      v-if="info.btn"
      class="btn"
      :style="info.btn.options.style"
      @click.stop="$emit('select', { cmpId, elType: 'btn' })"
      @change="updateContent('btn')">
      {{ info.btn.content.text }}
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
  created() {
    console.log(this.info)
  },
}
</script>

<style lang="scss" scoped></style>
