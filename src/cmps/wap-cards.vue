<template>
  <section class="wap-cards">
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

    <article class="wap-card">
      <img
        class="card-img"
        src="https://dance.co/_next/image?url=%2Fimages%2Frides%2Febikes%2Fone-step-card%402x.png&w=750&q=75" />
      <span class="card-details">
        From $39/mo <span class="tag">Automn offer</span>
      </span>
      <h3 class="card-title">Dance One Step</h3>
      <p class="card-desc">Ebike</p>
      <button class="btn card-btn">See details</button>
    </article>
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
