<template>
  <!-- <div v-if="type1">
    <h1 @change="doSomething">Header</h1>
  </div>
  <div v-if="type2">
    <h1 @change="doSomething">Header</h1>
  </div> -->
  <header class="wap-header">
    <section class="logo">
      <section class="img-wrapper">
        <img :src="info.img.style.imgSrc" />
      </section>
      <h1
        class="title"
        :style="info.title.style"
        @change="updateContent('title')"
        contenteditable>
        {{ info.title.content.text }}
      </h1>
    </section>
    <nav :style="info.nav.style">
      <ul>
        <li v-for="nav in info.nav.content">
          {{ nav }}
        </li>
      </ul>
    </nav>
    <button class="btn" :style="info.btn.style" @change="updateContent('btn')">
      {{ info.btn.content.text }}
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
  created() {
    console.log(this.info)
  },
}
</script>

<style lang="scss" scoped></style>

<!-- TODO: This way or using separate files with dynamic component -->
