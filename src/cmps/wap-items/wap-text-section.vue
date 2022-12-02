<template>
  <section class="text-section" :class="'type-' + typeId">
    <span
      v-if="info.tag"
      class="tag"
      :style="info?.tag?.options.style"
      @click.stop="$emit('select', { cmpId, elType: 'tag' })"
      @change="updateContent('tag')"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.tag?.content.text }}
    </span>

    <h2
      v-if="info.title"
      class="title"
      @change="updateContent('title')"
      :style="info?.title?.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'title' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.title?.content.text }}
    </h2>
    <h2
      v-if="info.subtitle"
      class="subtitle"
      @change="updateContent('subtitle')"
      :style="info?.subtitle?.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'subtitle' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.subtitle?.content.text }}
    </h2>
    <p
      v-if="info.text"
      class="text"
      @change="updateContent('text')"
      :style="info?.text?.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'text' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.text?.content.text }}
    </p>
    <p
      v-if="info.details"
      class="details"
      @change="updateContent('details')"
      :style="info?.details?.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'details' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.details?.content.text }}
    </p>
    <button
      v-if="info.btn"
      class="btn"
      :style="info?.btn?.options.style"
      @click.stop="$emit('select', { cmpId, childCmpId, elType: 'btn' })"
      @change="updateContent('btn')">
      {{ info?.btn?.content.text || 'Find us' }}
    </button>
  </section>
</template>

<script>
export default {
  props: ['info', 'cmpId', 'childCmpId', 'options', 'typeId'],
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
