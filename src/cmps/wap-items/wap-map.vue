<!-- AIzaSyBOnIuYA6sTb4lF2WYWYJIUouv3HjIx2mg -->
<template>
    <GoogleMap
      api-key="AIzaSyDKvG9VduLBhsz5HMIEo1Q9RQaX6B24Mck"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="10"
    >
      <Marker v-for="m in markers" :options="m" @click="center = m.position" />
    </GoogleMap>
  </template>

  <script>
  import { GoogleMap, Marker } from 'vue3-google-map'
  
  export default {
    props: {},
    components: { GoogleMap, Marker },
    data() {
      return {
        center: { lat: 31.7683, lng: 35.2137 },
        markers: [
          {
            title: 'Tel-Aviv',
            label: 'TLV',
            position: { lat: 32.0853, lng: 34.7818 },
          },
          {
            title: 'Jerusalem',
            position: { lat: 31.7683, lng: 35.2137 },
          },
          {
            title: 'Rehovot',
            position: { lat: 31.8928, lng: 34.8113 },
          },
        ],
      }
    },
  }
  </script>
  