<template>
  <article class="wap-card">
    <!-- <img
      class="card-img"
      src="https://dance.co/_next/image?url=%2Fimages%2Frides%2Febikes%2Fone-step-card%402x.png&w=750&q=75" />
    <span class="details">
      {{ info.content.details }} <span class="tag">{{ info.content.tag }}</span>
    </span>
    <h3 class="title">Dance One Step</h3>
    <p class="text">Ebike</p>
    <button class="btn">See details</button> -->
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
