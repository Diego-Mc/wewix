<template>
  <section class="text-section">
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
