<template>
  <!-- <div v-if="type1">
    <h1 @change="doSomething">Header</h1>
  </div>
  <div v-if="type2">
    <h1 @change="doSomething">Header</h1>
  </div> -->
  <header>
    <h1
      class="title"
      :style="info.title.style"
      @change="updateContent('title')"
      contenteditable>
      {{ info.title.content.text }}
    </h1>
    <p
      class="text"
      :style="info.text.style"
      @change="updateContent('text')"
      contenteditable>
      {{ info.text.content.text }}
    </p>
    <button class="btn" :style="info.btn.style" @change="updateContent('btn')">
      {{ info.text.content.text }}
    </button>
  </header>
</template>

<script>
export default {
  props: ['info', 'cmpId'],
  methods: {
    updateContent(name) {
      this.$emit('update', { cmpId, name, content: info.text.content })
    },
  },
}
</script>

<style lang="scss" scoped></style>

<!-- TODO: This way or using separate files with dynamic component -->
