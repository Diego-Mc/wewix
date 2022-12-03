<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">CUSTOM IMAGE</h6>
    <el-upload
      class="editor-upload-section"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      multiple>
      <i class="upload-icon bi bi-cloud-arrow-up-fill"></i>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </el-upload>
  </section>
</template>

<script>
export default {
  props: ['initialValue'],
  data() {
    return {}
  },
  components: {},
  methods: {
    // handleBtnSelect(radius) {
    //   console.log('radius selected, emitting @select', {
    //     key: 'radius',
    //     val: radius,
    //   })
    //   this.$emit('select', { key: 'radius', val: radius })
    // },
  },
}
</script>

<style lang="scss" scoped></style>
