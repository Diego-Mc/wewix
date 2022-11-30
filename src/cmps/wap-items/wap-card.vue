<template>
  <article class="wap-card">
    <img
      class="card-img"
      src="https://dance.co/_next/image?url=%2Fimages%2Frides%2Febikes%2Fone-step-card%402x.png&w=750&q=75" />
    <span class="details" :style="info.details.options.style">
      {{ info.details.content.text }}
      <span class="tag" :style="info.tag.options.style">{{
        info.tag.content.text
      }}</span>
    </span>
    <h3 class="title" :style="info.title.options.style">
      {{ info.title.content.text }}
    </h3>
    <p class="text" :style="info.text.options.style">
      {{ info.text.content.text }}
    </p>
    <button class="btn" :style="info.btn.options.style">
      {{ info.btn.content.text }}
    </button>
  </article>
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
    console.log(this.info)
  },
}
</script>

<style lang="scss" scoped></style>
