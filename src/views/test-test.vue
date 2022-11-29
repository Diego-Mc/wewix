<template>
  <div>
    <h1>Hello</h1>
    <wap-header :cmpId="id" :info="info" />
  </div>
</template>

<script>
import wapHeader from '../cmps/wap-header.vue'
export default {
  data() {
    return {
      id: 'wc02',
      type: 'wap-header',
      info: {
        img: {
          style: {
            imgSrc:
              'https://www.freeiconspng.com/thumbs/black-icon/glossy-black-icon-3.png',
          },
          content: {},
        },
        title: {
          style: {
            backgroundColor: '#485124',
            fontFamily: 'Roboto',
            color: 'blue',
          },
          content: {
            text: 'Dance',
          },
        },
        nav: {
          style: {
            fontFamily: 'Roboto',
            color: 'blue',
          },
          content: {
            nav1: 'Concierge',
            nav2: 'Rides',
            nav3: 'For Business',
          },
        },
        btn: {
          style: {
            backgroundColor: '#485124',
            fontFamily: 'Roboto',
            color: 'blue',
          },
          content: { text: 'Start now', link: '#wc03' },
        },
      },
    }
  },
  components: {
    wapHeader,
  },
}
</script>

<style lang="scss" scoped></style>
