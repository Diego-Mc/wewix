<template>
  <article class="wap-card">
    <img
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'img' })"
      class="card-img"
      src="https://dance.co/_next/image?url=%2Fimages%2Frides%2Febikes%2Fone-step-card%402x.png&w=750&q=75" />
    <span
      class="details"
      :style="info.details.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'details' })">
      {{ info.details.content.text }}
      <span
        class="tag"
        :style="info.tag.options.style"
        @click.stop="$emit('select', { cmpId, childCmpId, elType: 'tag' })">
        {{ info.tag.content.text }}
      </span>
    </span>

    <h3
      class="title"
      :style="info.title.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'title' })">
      {{ info.title.content.text }}
    </h3>

    <p
      class="text"
      :style="info.text.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'text' })">
      {{ info.text.content.text }}
    </p>

    <button
      class="btn"
      :style="info.btn.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'btn' })">
      {{ info.btn.content.text }}
    </button>
  </article>
</template>

<script>
export default {
  props: ['info', 'cmpId', 'options', 'childCmpId'],
  methods: {
    updateContent(elType) {
      this.$emit('update', {
        cmpId: this.cmpId,
        elType,
        content: info.text.content,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
