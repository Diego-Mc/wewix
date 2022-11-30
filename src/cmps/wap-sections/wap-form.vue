<template>
  <article class="wap-form">
    <h3 class="title" :style="info.title.options.style">
      Stay up to speed
      {{ info.title.content.text }}
    </h3>
    <p class="text" :style="info.text.options.style">
      Sign up to get the latest Dance offers, updates, and tips straight to your
      inbox.
      {{ info.text.content.text }}
    </p>
    <form>
      <wap-form-item type="email" />
      <!-- <button class="btn" :style="info.btn.options.style">
        {{ info.btn.content.text }}
      </button> -->
    </form>
  </article>
</template>

<script>
import wapFormItem from '../wap-items/wap-form-item.vue'
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
  components: {
    wapFormItem,
  },
}
</script>

<style lang="scss" scoped></style>
