<template>
  <div className="upload-preview">
    asdasd
    <img v-if="imgUrl" :src="imgUrl" :style="{ maxWidth: '200px', float: 'right' }" />
    <label for="imgUpload">{{ uploadMsg }}</label>
    <input type="file" style="padding: 50px; background-color: red;" @change="uploadImg" accept="img/*" id="imgUpload" />
  </div>
</template>

<script>
import { uploadService } from '../../services/upload.service.js'

export default {
  data() {
    return {
      imgUrl: null,
      height: 500,
      width: 500,
      isUploading: false
    }
  },
  methods: {
    async uploadImg(ev) {
      console.log('ev:', ev)
      this.isUploading = true
      const { secure_url, height, width } = await uploadService.uploadImg(ev)
      this.isUploading = false
      this.imgUrl = secure_url
      this.height = height
      this.width = width
      this.$emit('uploaded', this.imgUrl)
    }
  },
  computed: {
    uploadMsg() {
      if (this.imgUrl) return 'Upload Another?'
      return this.isUploading ? 'Uploading....' : 'Upload Image'
    }
  }
}
</script>

<style>
.upload-preview {
  padding: 100px;
  background-color: blue;
}
</style>
