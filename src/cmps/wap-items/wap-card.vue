<template>
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
