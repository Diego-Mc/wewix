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

export const wapsMap = new Map()
wapsMap.set('wap-header-1', {
  id: '',
  type: 'wap-header',
  typeId: 1,
  options: {
    meta: {},
    style: getStyles(),
  },
  info: {
    title: {
      options: {
        meta: {},
        style: getStyles('title'),
      },
      content: {
        text: 'Dance',
      },
    },
    nav: {
      options: {
        meta: {},
        style: getStyles('nav'),
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
        style: getStyles('btn'),
      },
      content: { text: 'Start now' },
    },
  },
})
wapsMap.set('wap-hero-1', {
  id: '',
  type: 'wap-hero',
  typeId: 1,
  options: {
    meta: {},
    style: getStyles(),
  },
  info: {
    title: {
      options: {
        meta: {},
        style: getStyles('title'),
      },
      content: {
        text: 'Your future\nis electric',
      },
    },
    text: {
      options: {
        meta: {},
        style: getStyles('text'),
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
        style: getStyles(btn),
      },
      content: { text: 'Start now' },
    },
  },
})
wapsMap.set('wap-section-1', {
  id: '',
  type: 'wap-section',
  typeId: 1,
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 1,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {},
            style: getStyles('img'),
          },
          content: {},
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Move your way',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Choose the electric ride that suid tour lifeoptions',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-img-section',
      typeId: 1,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://dance.co/_next/image?url=%2Fimages%2Fhome%2Fhome-care%402x.jpg&w=1200&q=75',
            },
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
  ],
})
wapsMap.set('wap-cards-1', {
  id: '',
  type: 'wap-cards',
  typeId: 1,
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-card',
      typeId: 1,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://dance.co/_next/image?url=%2Fimages%2Frides%2Febikes%2Fone-step-card%402x.png&w=1920&q=75',
            },
            style: getStyles('img'),
          },
          content: {},
        },
        details: {
          options: {
            meta: {},
            style: getStyles('details'),
          },
          content: {
            text: 'From $39/mo',
          },
        },
        tag: {
          options: {
            meta: {},
            style: getStyles('tag'),
          },
          content: {
            text: 'Automn offer',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Dance One Step',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Ebike',
          },
        },
        btn: {
          options: {
            meta: {},
            style: getStyles('btn'),
          },
          content: { text: 'See details' },
        },
      },
    },
    {
      id: '2',
      type: 'wap-card',
      typeId: 1,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://dance.co/_next/image?url=%2Fimages%2Frides%2Febikes%2Fdiamond-card%402x.png&w=1920&q=75',
            },
            style: getStyles('img'),
          },
          content: {},
        },
        details: {
          options: {
            meta: {},
            style: getStyles('details'),
          },
          content: {
            text: 'From $39/mo',
          },
        },
        tag: {
          options: {
            meta: {},
            style: getStyles('tag'),
          },
          content: {
            text: 'Automn offer',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Dance One',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Ebike',
          },
        },
        btn: {
          options: {
            meta: {},
            style: getStyles('btn'),
          },
          content: { text: 'See details' },
        },
      },
    },
    {
      id: '3',
      type: 'wap-card',
      typeId: 1,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://dance.co/_next/image?url=%2Fimages%2Frides%2Femoped%2Femoped-card%402x.png&w=1920&q=75',
            },
            style: getStyles('img'),
          },
          content: {},
        },
        details: {
          options: {
            meta: {},
            style: getStyles('details'),
          },
          content: {
            text: 'From $49/mo',
          },
        },
        tag: {
          options: {
            meta: {},
            style: getStyles('tag'),
          },
          content: {
            text: 'Automn offer',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Dance Moped',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Emoped',
          },
        },
        btn: {
          options: {
            meta: {},
            style: getStyles('btn'),
          },
          content: { text: 'See details', link: '#wc03' },
        },
      },
    },
  ],
})
wapsMap.set('wap-form-1', {
  id: '',
  type: 'wap-form',
  typeId: 1,
  options: {
    meta: {},
    style: getStyles(),
  },
  info: {
    title: {
      options: {
        meta: {},
        style: getStyles('title'),
      },
      content: {
        text: 'Stay up to speed',
      },
    },
    text: {
      options: {
        meta: {},
        style: getStyles('text'),
      },
      content: {
        text: 'Sign up to get the latest Dance offers, updates, and tips straight to your inbox.',
      },
    },
  },
})

//Template 2
//set id
wapsMap.set('wap-header-2', {
  id: '',
  type: 'wap-header',
  typeId: 1,
  options: {
    meta: {},
    style: {
      backgroundColor: '',
      fontFamily: '',
      color: '',
      fontWeight: '',
      fontSize: '',
    },
  },
  info: {
    // logo?
    img: {
      options: {
        meta: {
          src: '../assets/imgs/plantify-logo.svg',
        },
        style: {
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      content: {},
    },
    nav: {
      options: {
        meta: {},
        style: {
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      content: {
        nav1: 'Menu',
        nav2: 'Schedule',
        nav3: 'About',
        nav4: 'Catering',
        nav5: 'Contact',
      },
    },
    btn: {
      options: {
        meta: {},
        style: {
          backgroundColor: '',
          fontFamily: '',
          color: '',
          borderRadius: '2em',
          fontWeight: '',
          fontSize: '',
        },
      },
      content: { text: 'Find us' },
    },
  },
})

// this is temp's 2 hero section.
wapsMap.set('wap-section-2', {
  id: '',
  type: 'wap-section',
  typeId: 1,
  options: {
    meta: {},
    style: {
      backgroundColor: '',
      fontFamily: '',
      color: '',
      fontWeight: '',
      fontSize: '',
    },
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 1,
      options: {
        meta: {},
        style: {
          backgroundColor: '',
          fontFamily: '',
          color: '',
        },
      },
      info: {
        tag: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Food Truck',
          },
        },
        title: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'All plants.',
          },
        },
        // maybe remove
        subtitle: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'No animals.',
          },
          btn: {},
        },
        text: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Choose the electric ride that suid tour lifeoptions',
          },
        },
        btn: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Find Us',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-img-section',
      typeId: 1,
      options: {
        meta: {},
        style: {
          backgroundColor: '',
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      info: {
        img: {
          options: {
            meta: {
              src: '../assets/imgs/hero-2-img',
            },
            style: {},
          },
          content: {},
        },
      },
    },
  ],
})

wapsMap.set('wap-hero-2', {
  id: '',
  type: 'wap-hero',
  typeId: 1,
  options: {
    meta: {
      // download imgs from now?
      src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623cfb46d0ab4fab78e53577_Callout%20Photo.jpg',
    },
    style: {
      backgroundColor: '',
      fontFamily: '',
      color: '',
      fontWeight: '',
      fontSize: '',
    },
  },
  info: {
    tag: {
      options: {
        meta: {},
        style: {
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      content: {
        text: 'MAR 27, 2022',
      },
    },
    text: {
      options: {
        meta: {},
        style: {
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      content: {
        text: 'Golden Gate Park',
      },
    },
    // can i do something like that?
    text: {
      options: {
        meta: {},
        style: {
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      content: {
        text: '4976 Fulton Street San Francisco, CA 94121',
      },
    },
    text: {
      options: {
        meta: {
          href: '#',
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
      content: { text: '2:00 pm - 9:00 pm' },
    },
  },
})

wapsMap.set('wap-section-2', {
  id: '',
  type: 'wap-section',
  typeId: 1,
  options: {
    meta: {},
    style: {
      backgroundColor: '',
      fontFamily: '',
      color: '',
      fontWeight: '',
      fontSize: '',
    },
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 1,
      options: {
        meta: {},
        style: {
          backgroundColor: '',
          fontFamily: '',
          color: '',
        },
      },

      title: {
        options: {
          meta: {},
          style: {
            fontFamily: '',
            color: '',
            fontWeight: '',
            fontSize: '',
          },
        },
        content: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consequat netus tristique at sem ipsum fames.',
        },
      },
      // maybe remove
      text: {
        options: {
          meta: {},
          style: {
            fontFamily: '',
            color: '',
            fontWeight: '',
            fontSize: '',
          },
        },
        content: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consequat netus tristique at sem ipsum fames.',
        },
      },
      btn: {
        options: {
          meta: {},
          style: {
            fontFamily: '',
            color: '',
            fontWeight: '',
            fontSize: '',
          },
        },
        content: {
          text: 'View menu',
        },
      },
    },
    {
      id: '2',
      type: 'section-gallery-item',
      typeId: 1,
      options: {
        meta: {},
        style: {
          backgroundColor: '',
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      info: {
        img: {
          options: {
            meta: {
              src1: 'https://uploads-ssl.webflow.com/623b08ca224738c57f5fa0ea/623f1189632baa0fde4f93fb_Tacos-p-800.jpeg',
              src2: 'https://uploads-ssl.webflow.com/623b08ca224738c57f5fa0ea/623f1197a9384100846bb45b_Burgers.jpg',
            },
            style: {},
          },
          content: {},
        },
      },
    },
  ],
})
wapsMap.set('wap-cards-2', {
  id: '',
  type: 'wap-cards',
  typeId: 1,
  options: {
    meta: {
      src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623b0c7839281d050ca493ea_Green_Texture.jpg',
    },
    style: {
      backgroundColor: '',
      fontFamily: '',
      color: '',
      fontWeight: '',
      fontSize: '',
    },
  },
  // need to add title 'You’ll love us', how? container inside container?
  cmps: [
    {
      id: '1',
      type: 'wap-card',
      typeId: 1,
      options: {
        meta: {},
        style: {
          backgroundColor: '',
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623cfb47fbd20a23d33aac54_Icon%202.svg',
            },
            style: {},
          },
          content: {},
        },

        title: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Plant based',
          },
        },
        text: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
        },
        btn: {
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
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
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Gluten free',
          },
        },
        text: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
        },
      },
    },
    {
      id: '3',
      type: 'wap-card',
      typeId: 1,
      options: {
        meta: {},
        style: {
          backgroundColor: '',
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623cfb46bab7a365649510e1_Icon%203.svg',
            },
            style: {},
          },
          content: {},
        },

        title: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Made with love',
          },
        },
        text: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
        },
        btn: {
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Dance One',
          },
        },
        text: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Ebike',
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
          content: { text: 'See details' },
        },
      },
    },
    {
      id: '3',
      type: 'wap-card',
      typeId: 1,
      options: {
        meta: {},
        style: {
          backgroundColor: '',
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://dance.co/_next/image?url=%2Fimages%2Frides%2Femoped%2Femoped-card%402x.png&w=1920&q=75',
            },
            style: {},
          },
          content: {},
        },
        details: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'From $49/mo',
          },
        },
        tag: {
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
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
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Dance Moped',
          },
        },
        text: {
          options: {
            meta: {},
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
              fontSize: '',
            },
          },
          content: {
            text: 'Emoped',
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
})

// social icons? where do i put them?
wapsMap.set('wap-form-2', {
  id: '',
  type: 'wap-form',
  typeId: 1,
  options: {
    meta: {},
    style: {
      backgroundColor: '',
      fontFamily: '',
      color: '',
      fontWeight: '',
      fontSize: '',
    },
  },
  info: {
    title: {
      options: {
        meta: {},
        style: {
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      content: {
        text: 'Sign up for our newsletter!',
      },
    },
    input: {
      options: {
        meta: {},
        style: {
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      content: {
        // placeholder text
        text: 'mail@mail.com',
      },
    },
    btn: {
      options: {
        meta: {},
        style: {
          fontFamily: '',
          color: '',
          fontWeight: '',
          fontSize: '',
        },
      },
      content: {
        // placeholder text
        text: 'Sign up',
      },
    },
  },
})
