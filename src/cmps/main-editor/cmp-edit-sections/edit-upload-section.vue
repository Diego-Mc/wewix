<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">CUSTOM IMAGE</h6>
    <el-upload
      class="editor-upload-section"
      drag
      :before-upload="setData"
      :http-request="
        () => {
          this.getRequest()
        }
      "
      :on-error="handleError"
      :on-success="handleSuccess">
      <i class="upload-icon bi bi-cloud-arrow-up-fill"></i>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </el-upload>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  props: ['initialValue'],
  data() {
    return {
      file: null,
    }
  },
  components: {},
  methods: {
    setData(file) {
      this.file = file
    },
    handleError(ev) {
      // Todo user msg
      console.log('error', ev)
    },
    handleSuccess(ev) {
      // Todo user msg
      console.log('succsess', ev)
    },
    async getRequest() {
      // console.log(JSON.stringify(import.meta.env.VITE_UPLOAD_PRESET))
      const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
      const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME
      const FORM_DATA = new FormData()

      // Building the request body
      FORM_DATA.append('file', this.file)
      FORM_DATA.append('UPLOAD_PRESET', UPLOAD_PRESET)
      try {
        const { data } = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          FORM_DATA
        )

        this.$emit('select', { key: 'src', val: data.url })
      } catch (err) {
        throw new Error(`${err}, Cannot Upload Image`)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
