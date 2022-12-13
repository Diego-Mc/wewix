<template>
  <section class="cmp-edit-section edit-map-section">
    <h6 class="edit-type-label">MAP DATA</h6>
    <el-input
      @input="handleMapInput(searchTxt)"
      v-model="searchTxt"
      class="w-50 m-2 map-input"
      size="large"
      placeholder="Please Input"
      :prefix-icon="Search" />
    <div v-if="isMapLocationLoader">
      <span v-if="location">
        {{ location.title }}
      </span>
      <span v-else> Loading </span>
    </div>
  </section>
</template>

<script>
import { cmpEditorService } from '../../../services/cmp-editor.service'
import { utilService } from '../../../services/util.service'
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      updatedMapData: null,
      location: null,
      isMapLocationLoader: false,
      searchTxt: '',
    }
  },
  components: {},
  methods: {
    handleMapInput(locationName) {
      this.isMapLocationLoader = true
      this.getMapData(locationName)
    },

    async getMapData(locationName) {
      try {
        this.location = await cmpEditorService.getMapData(locationName)
        if (!this.location) {
          ElMessage({
            message: 'The map failed to load, please try again ',
            type: 'error',
          })
          throw new Error("Map Has'nt been loaded")
        }

        // Handle state when getting data
        ElMessage({
          message: 'The map is loaded and ready to use',
          type: 'success',
        })
        this.$emit('select', { key: 'mapData', val: this.location })
      } catch (err) {
        this.closeMapLocationLoader()
        console.log(err)
      }
    },

    closeMapLocationLoader() {
      this.isMapLocationLoader = false
    },
  },
  created() {
    this.getMapData = utilService.debounce(this.getMapData)
  },
}
</script>

<style>
.map-input .el-input__wrapper {
  border-radius: 8px !important;
}
.map-input:is(:focus, :focus-visible) {
  outline-color: #00c2a6 !important;
}
</style>
