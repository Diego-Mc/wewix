<template>
  <article class="wap-card">
    <img
      :style="info.img.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'img' })"
      class="card-img"
      :src="info.img.options.meta.src" />
    <span
      class="details"
      :style="info.details.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'details' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info.details.content.text }}
      <span
        class="tag"
        :style="info.tag.options.style"
        @click.stop="$emit('select', { cmpId, childCmpId, elType: 'tag' })"
        :contenteditable="$store.getters.isEditMode">
        {{ info.tag.content.text }}
      </span>
    </span>

    <h3
      class="title"
      :style="info.title.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'title' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info.title.content.text }}
    </h3>

    <p
      class="text"
      :style="info.text.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'text' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info.text.content.text }}
    </p>

    <button
      class="btn"
      :style="info.btn.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'btn' })">
      <span :contenteditable="$store.getters.isEditMode">
        {{ info.btn.content.text }}
      </span>
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
