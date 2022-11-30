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
      <article class="form-input">
        <label class="label" :class="{ selected: focused }">
          {{ focused ? 'Email' : 'your@example.com' }}
        </label>
        <input
          @focusin="focused = true"
          @focusout="focused = false"
          class="input email"
          type="text" />
      </article>
      <!-- <button class="btn" :style="info.btn.options.style">
        {{ info.btn.content.text }}
      </button> -->
    </form>
  </article>
</template>

<script>
export default {
  props: ['info', 'cmpId', 'options'],
  data() {
    return {
      focused: false,
    }
  },
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
