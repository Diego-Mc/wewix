<template>
  <article class="form-input">
    <label class="label" :class="{ selected: focused }">
      {{ labelText }}
    </label>
    <i class="bi bi-arrow-right send-btn"></i>
    <input
      v-if="type === 'email'"
      @focusin="focused = true"
      @focusout="focused = false"
      class="input email"
      type="text" />
  </article>
</template>

<script>
export default {
  data() {
    return {
      focused: false,
      opts: {
        label: '',
        labelOnFocus: '',
      },
    }
  },
  props: {
    type: String,
  },
  created() {
    switch (this.type) {
      case 'email':
        this.opts.label = 'your@email.com'
        this.opts.labelOnFocus = 'Email'
        break
      case 'password':
        this.opts.label = 'Enter your password'
        this.opts.labelOnFocus = 'Password'
        break
    }
  },
  computed: {
    labelText() {
      const { labelOnFocus, label } = this.opts
      return this.focused ? labelOnFocus : label
    },
  },
}
</script>

<style lang="scss" scoped></style>
