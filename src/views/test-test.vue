<template>
  <div>
    <wap-header :cmpId="id" :info="info" :options="options" />
    <wap-hero :cmpId="id" :info="info" :options="options" />
    <wap-section :cmpId="id" :info="info" :options="options" />
    <wap-cards :cmpId="id" :info="info" :options="options" :cmps="cmps" />
    <wap-form :cmpId="id" :info="info" :options="options" />
  </div>
</template>

<script>
import wapHeader from '../cmps/wap-sections/wap-header.vue'
import wapHero from '../cmps/wap-sections/wap-hero.vue'
import wapCards from '../cmps/wap-sections/wap-cards.vue'
import wapSection from '../cmps/wap-sections/wap-section.vue'
import wapForm from '../cmps/wap-sections/wap-form.vue'
export default {
  data() {
    return {
      id: 'wc02',
      type: 'wap-header',
      options: {
        meta: {},
        style: {
          backgroundColor: '',
          fontFamily: '',
          color: '',
        },
      },
      info: {
        title: {
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
          },
          content: {
            text: 'Dance',
          },
        },
        text: {
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
          },
          content: {
            text: 'Dance',
          },
        },
        nav: {
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
          },
          content: {
            nav1: 'Concierge',
            nav2: 'Rides',
            nav3: 'For Business',
          },
        },
        btn: {
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
          },
          content: { text: 'Start now', link: '#wc03' },
        },
      },
      cmps: [
        {
          id: 'wc02',
          type: 'wap-card',
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
          },
          info: {
            img: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {},
            },
            details: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'From $39/mo',
              },
            },
            tag: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Automn offer',
              },
            },
            title: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Dance One Step',
              },
            },
            text: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Ebike',
              },
            },
            nav: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                nav1: 'Concierge',
                nav2: 'Rides',
                nav3: 'For Business',
              },
            },
            btn: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: { text: 'See details', link: '#wc03' },
            },
          },
        },
        {
          id: 'wc02',
          type: 'wap-card',
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
          },
          info: {
            img: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {},
            },
            details: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'From $39/mo',
              },
            },
            tag: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Automn offer',
              },
            },
            title: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Dance One Step',
              },
            },
            text: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Ebike',
              },
            },
            nav: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                nav1: 'Concierge',
                nav2: 'Rides',
                nav3: 'For Business',
              },
            },
            btn: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: { text: 'See details', link: '#wc03' },
            },
          },
        },
        {
          id: 'wc02',
          type: 'wap-card',
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
          },
          info: {
            img: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {},
            },
            details: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'From $39/mo',
              },
            },
            tag: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Automn offer',
              },
            },
            title: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Dance One Step',
              },
            },
            text: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Ebike',
              },
            },
            nav: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                nav1: 'Concierge',
                nav2: 'Rides',
                nav3: 'For Business',
              },
            },
            btn: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: { text: 'See details', link: '#wc03' },
            },
          },
        },
      ],
    }
  },
  components: {
    wapHeader,
    wapHero,
    wapCards,
    wapSection,
    wapForm,
  },
}
</script>

<options lang="scss" scoped></options>
