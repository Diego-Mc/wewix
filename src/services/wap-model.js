import { wapUtils } from './wap-cmps.service'
const { getStyles, getMeta } = wapUtils

export default [
  {
    _id: '5e28393890dd7201a06d4e44',
    name: 'HairDresser Baluta Marketing Site',
    imgUrl:
      'http://res.cloudinary.com/webify/image/upload/v1580021948/coffe_yi0yzf.png',
    createdBy: {
      _id: '5e26e0b718a0891d4c995527',
      fullname: 'Hekro Special',
      imgUrl: 'img.jpg',
    },
    usersData: {
      contacts: [
        { email: 'user@user.com', msg: 'Please send me stuff', at: 123 },
      ],
      subscriptions: [{ email: 'user@user.com', at: 123 }],
    },
    cmps: [
      {
        id: 'wc02',
        type: 'wap-header',
        typeId: 1,
        options: {
          meta: {
            img: '',
            link: '',
          },
          style: {
            backgroundColor: '',
            fontFamily: '',
            color: '',
            borderRadius: '2em',
            fontWeight: '',
            fontSize: '',
          },
        },
        info: {
          title: {
            options: {
              meta: {
                img: '',
                link: '',
              },
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
            content: { text: 'Start now' },
          },
        },
      },
      {
        id: 'wc03',
        type: 'wap-hero',
        options: {
          meta: {},
          style: {
            fontWeight: '',
            fontSize: '',
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
              text: 'Your future\nis electric',
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
              text: 'Get your own ebike or emoped\nwith our flexible subscription',
            },
          },
          btn: {
            options: {
              meta: {
                href: '#',
              },
              style: {
                backgroundColor: '',
                fontFamily: '',
                color: '',
                borderRadius: '16px',
              },
            },
            content: { text: 'Start now' },
          },
        },
      },
      {
        id: 'wc03',
        type: 'wap-section',
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
              text: 'Move your way',
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
              text: 'Choose the electric ride that suid tour lifeoptions',
            },
          },
        },
      },
      {
        id: 'wc04',
        type: 'wap-cards',
        options: {
          meta: {},
          style: {
            backgroundColor: '',
            fontFamily: '',
            color: '',
          },
        },
        cmps: [
          {
            id: 'wc05',
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
            id: 'wc06',
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
                    fontFamily: '',
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
                  text: 'Dance One Line',
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
            id: 'wc07',
            type: 'wap-card',
            options: {
              meta: {},
              style: {
                color: '',
              },
            },
            info: {
              img: {
                options: {
                  meta: {},
                  style: {
                    backgroundColor: '',
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
      },
      {
        id: 'wc10',
        type: 'wap-video',
        options: {
          meta: {
            img: '',
            link: 'https://www.youtube.com/embed/sfabsNX61aU',
          },
          style: {},
        },
        info: {
          title: {
            options: {
              meta: {},
              style: {},
            },
            content: {},
          },
        },
      },
    ],
    isPublic: true,
  },
]
