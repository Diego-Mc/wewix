<template>
  <label class="color-picker-option" @click="emitColor">
    <div
      class="option"
      :class="{ selected: this.selected }"
      :style="{ backgroundColor: color }"></div>
    <input v-if="isPicker" type="color" v-model="color" @input="emitColor" />
    <svg
      v-if="isPicker"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      class="caret-icon"
      fill="#ffffff">
      <path
        d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
    </svg>
  </label>
</template>

<script>
export default {
  props: ['selected', 'initialValue', 'isPicker'],
  data() {
    return {
      color: this.initialValue ?? '#7eb2e4',
    }
  },
  methods: {
    doColor(cl) {
      this.color = cl
    },
    emitColor() {
      this.$emit('colorPicked', this.color)
    },
  },
}
</script>

<style lang="scss" scoped></style>
