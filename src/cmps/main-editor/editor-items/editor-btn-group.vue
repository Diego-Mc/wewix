<template>
  <section class="editor-btn" :style="{ gap, flexDirection: dir }">
    <label :class="info.type" :style="style" v-for="opt in opts" :key="opt.val">
      <i v-if="opt.icon" :class="'icon bi bi-' + opt.icon"></i>
      <span class="text" v-if="opt.text">{{ opt.text }}</span>
      <span class="sample" :style="opt.style" v-if="opt.sample">{{
        opt.sample
      }}</span>
      <small class="small" v-if="opt.small">{{ opt.small }}</small>
      <input
        :value="opt.val"
        :name="info?.key"
        type="checkbox"
        v-model="val"
        @change="reportVal(val)" />
    </label>
  </section>
</template>

<script>
export default {
  props: ['opts', 'initialValue', 'info', 'dir', 'gap', 'style', 'title'],
  data() {
    return {
      val: [this.initialValue] || [],
      // opts: [ //this is an example for the prop data
      //   {
      //     val: 'mobile',

      //     icon: '',

      //     sample: 'Aa',
      //     small: 'System',
      //   },
      // ],
    }
  },
  methods: {
    reportVal() {
      if (this.val.length > 1) {
        if (this.val[0] === this.val[1]) this.val = []
        else this.val = [this.val[1]]
      }
      this.$emit('setVal', { key: this.info?.key, val: this.val[0] })
    },
  },
}
</script>

<style lang="scss" scoped></style>
