<template>
  <article class="form-input">
    <label class="label" :class="{ selected: focused }">
      {{tag}}
    </label>
    <i class="bi bi-arrow-right send-btn"></i>
    <input
      @input="changeTxt"
      v-model="txt"
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
      txt: '',
      opts: {
        label: '',
        labelOnFocus: '',
      },
    }
  },
  props: {
    type: String,
    modelValue: String,
    tag:String,
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
      default:
        this.opts.label = 'Enter' + this.type
        this.opts.labelOnFocus = this.type
    }
  },
  methods: {
  
    changeTxt() {
      this.$emit('update:modelValue', this.txt)
    },
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
