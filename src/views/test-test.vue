<template>
  <div>
    <wap-header :cmpId="id" :info="info" :style="style" />
    <wap-hero :cmpId="id" :info="info" :style="style" />
    <wap-section :cmpId="id" :info="info" :style="style" />
    <wap-cards :cmpId="id" :info="info" :style="style" />
  </div>
</template>

<script>
import wapHeader from '../cmps/wap-header.vue'
import wapHero from '../cmps/wap-hero.vue'
import wapCards from '../cmps/wap-cards.vue'
import wapSection from '../cmps/wap-section.vue'
export default {
  data() {
    return {
      id: 'wc02',
      type: 'wap-header',
      style: {
        // backgroundColor: 'white',
      },
      info: {
        title: {
          style: {
            // backgroundColor: '',
            // fontFamily: 'Roboto',
            // color: 'black',
          },
          content: {
            text: 'Dance',
          },
        },
        text: {
          style: {
            // backgroundColor: '',
            // fontFamily: 'Roboto',
            // color: 'black',
          },
          content: {
            text: 'Dance',
          },
        },
        nav: {
          style: {
            // fontFamily: 'Roboto',
            // color: 'black',
            // fontWeight: '400',
          },
          content: {
            nav1: 'Concierge',
            nav2: 'Rides',
            nav3: 'For Business',
          },
        },
        btn: {
          style: {
            // backgroundColor: '#7140eb',
            // fontFamily: 'Roboto',
            // color: 'white',
            // borderRadius: '0.4rem',
          },
          content: { text: 'Start now', link: '#wc03' },
        },
      },
    }
  },
  components: {
    wapHeader,
    wapHero,
    wapCards,
    wapSection,
  },
}
</script>

<style lang="scss" scoped></style>
