<template>
    <section class="cmp-edit-section edit-map-section">
        <h6 class="edit-type-label">MAP DATA</h6>
        <el-input @input="handleMapInput(searchTxt)" v-model="searchTxt" class="w-50 m-2" size="large"
            placeholder="Please Input" :prefix-icon="Search" />
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
export default {
    data() {
        return {
            updatedMapData: null,
            location: null,
            isMapLocationLoader: false,
            searchTxt: ''
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
                    this.$notify({
                        title: 'The map failed to load, please try again ',
                        type: 'error',
                    })
                    throw new Error("Map Has'nt been loaded")
                }

                // Handle state when getting data
                this.$notify({
                        title: 'The map is loaded and ready to use',
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
  
<style lang="scss" scoped>
</style>
