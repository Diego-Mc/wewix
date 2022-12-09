<template>
  <section class="editor-btn" :style="{ gap, flexDirection: dir }">
    <el-tooltip
      class="box-item"
      effect="light"
      :hide-after="0"
      :disabled="!opt.title"
      :content="opt.title?.text"
      :placement="opt.title?.placement"
      v-for="opt in opts"
      :key="opt.val">
      <label :class="info.type" :style="style">
        <i
          v-if="opt.icon"
          @mousedown.prevent="iconEvent(opt.icon)"
          :class="'icon bi bi-' + opt.icon"></i>
        <span class="text" v-if="opt.text">{{ opt.text }}</span>
        <span class="sample" :style="opt.style" v-if="opt.sample">{{
          opt.sample
        }}</span>
        <small class="small" v-if="opt.small">{{ opt.small }}</small>
        <div v-if="info?.key === 'theme'" class="theme-colors">
          <div class="colors-wrapper">
            <div class="color1" :class="opt.val"></div>
            <div class="color2" :class="opt.val"></div>
            <div class="color3" :class="opt.val"></div>
          </div>
        </div>
        <input
          :value="opt.val"
          :name="info?.key"
          type="checkbox"
          v-model="val"
          @change="reportVal(val)" />
      </label>
    </el-tooltip>
  </section>
</template>

<script>
import { eventBus } from '../../../services/event-bus.service'

export default {
  props: [
    'opts',
    'initialValue',
    'info',
    'dir',
    'gap',
    'style',
    'title',
    'modelValue',
  ],
  data() {
    return {
      val: [this.modelValue || this.initialValue],
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
    reportVal(ev) {
      if (this.info.type === 'click') this.val = []
      else if (this.val[0] === undefined) {
        if (this.info.type === 'radioDefault') this.val = [this.initialValue]
        if (this.info.type === 'radio') this.val = [this.val]
      }
      if (this.val.length > 1) {
        if (this.val[0] === this.val[1]) this.val = []
        else this.val = [this.val[1]]
      }
      this.$emit('update:modelValue', this.val[0])
      this.$emit('setVal', { key: this.info?.key, val: this.val[0] })
    },
    iconEvent(iconType) {
      if (iconType === 'arrow-return-left') eventBus.emit('undo')
      else if (iconType === 'arrow-return-right') eventBus.emit('redo')
      return true
    },
  },
}
</script>

<style lang="scss" scoped></style>
