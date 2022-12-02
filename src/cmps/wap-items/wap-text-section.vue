<template>
  <section class="text-section">
    <h2
      class="title"
      @input="updateContent('title', $event)"
      :style="info.title.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'title' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info.title.content.text }}
    </h2>
    <p
      class="text"
      @input="updateContent('text', $event)"
      :style="info.text.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'text' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info.text.content.text }}
    </p>
    <button
      v-if="info.btn"
      class="btn"
      @input="updateContent('btn', $event)"
      :style="info.btn.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'btn' })">
      {{ info.btn.content.text }}
    </button>
  </section>
</template>

<script>
export default {
  props: ['info', 'cmpId', 'childCmpId', 'options'],
  methods: {
    updateContent(elType,e) {
      this.$emit('cmpUpdated', { cmpId:this.cmpId, elType, content: e.target.innerText })
    },
  },
  created() {
    console.log(this.info)
  },
}
</script>

<style lang="scss" scoped></style>
