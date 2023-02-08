<template>
  <section class="wap-map" @click.stop="emitSelect({ cmpId }, $event)">
    <GoogleMap
      :api-key="apiKey"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="18">
      <Marker :options="marker" />
    </GoogleMap>
  </section>
</template>

<script>
//v-for="m in markers"
//@click="center = m.position"
console.log(import.meta.env)
import { GoogleMap, Marker } from 'vue3-google-map'
import { eventBus } from '../../services/event-bus.service'
export default {
  props: {
    cmpId: String,
    options: Object,
  },
  components: { GoogleMap, Marker },
  data() {
    return {
      // center: { lat: 31.7683, lng: 35.2137 },
      // markers: [,
      // ],
      apiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
    }
  },
  computed: {
    center() {
      return this.options?.meta?.mapData?.position?.lat
        ? this.options.meta.mapData.position
        : { lat: 32.0853, lng: 34.7818 }
    },

    marker() {
      return this.options?.meta?.mapData?.position?.lat
        ? this.options.meta.mapData
        : {
            title: 'Tel-Aviv',
            label: 'TLV',
            position: { lat: 32.0853, lng: 34.7818 },
          }
    },
  },

  methods: {
    log() {},
    emitSelect(cmpInfo) {
      eventBus.emit('select', cmpInfo)
    },
  },
}
</script>

<style></style>
