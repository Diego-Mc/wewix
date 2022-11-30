<template>
  <section class="wap-section" @click.stop="$emit('select', { cmpId })">
    <section class="text-section">
      <h2
        class="title"
        :style="info.title.options.style"
        @change="updateContent('title')"
        @click.stop="$emit('select', { cmpId, elType: 'title' })"
        contenteditable>
        Move your way
        {{ info.title.content.text }}
      </h2>
      <p
        class="text"
        :style="info.text.options.style"
        @change="updateContent('text')"
        @click.stop="$emit('select', { cmpId, elType: 'text' })"
        contenteditable>
        Choose the electric ride that suid tour lifestyle
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
    <section class="img-section">
      <img
        src="https://dance.co/_next/image?url=%2Fimages%2Fhome%2Fhome-care%402x.jpg&w=1200&q=75" />
    </section>
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
