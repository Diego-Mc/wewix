import { utilService } from './util.service.js'

export const wapUtils = {
  getMeta,
  getStyles,
}

export default function getCmp(type, typeId) {
  const key = `${type}-${typeId}`
  const cmp = wapsMap.get(key)
  cmp.id = 'wap-' + utilService.getRandomIntInclusive(10, 99)
  return cmp
}

function _getCmpEls(type, typeId) {
  switch (type) {
    case 'wap-header':
      if (typeId === 1) return { info: ['title', 'nav', 'btn'] }
      if (typeId === 2) return { info: ['title', 'nav'] }
      break

    case 'wap-hero':
      if (typeId === 1) return { info: ['title', 'text', 'btn'] }
      if (typeId === 2) return { info: ['title', 'text', 'btn', 'img'] }
      if (typeId === 3)
        return { info: ['title', 'text', 'primaryBtn', 'secondaryBtn'] }
      if (typeId === 4)
        return { info: ['title', 'text', 'primaryBtn', 'secondaryBtn', 'img'] }
      break

    case 'wap-text-section':
      if (typeId === 1) return { info: ['title', 'text'] }
      break

    case 'wap-img-section':
      if (typeId === 1) return { info: ['img'] }
      break

    case 'wap-card':
      if (typeId === 1)
        return {
          info: ['img', 'details', 'tag', 'title', 'text', 'nav', 'btn'],
        }
      break

    case 'wap-section':
      if (typeId === 1)
        return {
          cmps: [
            { type: 'wap-text-section', typeId: 1 },
            { type: 'wap-img-section', typeId: 1 },
          ],
        }
      break

    case 'wap-cards':
      if (typeId === 1)
        return {
          cmps: [
            { type: 'wap-card', typeId: 1 },
            { type: 'wap-card', typeId: 1 },
            { type: 'wap-card', typeId: 1 },
          ],
        }
      break
  }
}

function getMeta(elType) {
  switch (elType) {
    case 'btn':
    case 'primaryBtn':
    case 'secondaryBtn':
      return {
        href: '',
      }
    case 'img':
      return {
        src: '',
      }
    case 'imgs':
      return {
        srcs: {},
      }
    case 'text':
    case 'subtitle':
    case 'title':
      return {}
  }
}

function getStyles(elType) {
  switch (elType) {
    case 'btn':
    case 'primaryBtn':
    case 'secondaryBtn':
      return {
        backgroundColor: '',
        fontFamily: '',
        color: '',
        borderRadius: '',
        fontWeight: '',
        fontSize: '',
      }
    case 'img':
    case 'imgs':
      return {}
    case 'text':
    case 'title':
    case 'subtitle':
    case 'nav':
    case 'details':
      return {
        fontFamily: '',
        color: '',
        fontWeight: '',
        fontSize: '',
      }
    case 'tag':
      return {
        backgroundColor: '',
        fontFamily: '',
        color: '',
        fontWeight: '',
        fontSize: '',
      }
    default:
      return {
        backgroundColor: '',
        fontFamily: '',
        color: '',
        fontWeight: '',
        fontSize: '',
      }
  }
}

const wapsMap = new Map()
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
        style: getStyles('btn'),
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
  typeId: 2,
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
        style: getStyles('img'),
      },
      content: {},
    },
    nav: {
      options: {
        meta: {},
        style: getStyles('nav'),
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
        style: getStyles('btn'),
      },
      content: { text: 'Find us' },
    },
  },
})

// this is temp's 2 hero section.
wapsMap.set('wap-section-2', {
  id: '',
  type: 'wap-section',
  typeId: 2,
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 2,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        tag: {
          options: {
            meta: {},
            style: getStyles('tag'),
          },
          content: {
            text: 'Food Truck',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'All plants.',
          },
        },
        // maybe remove
        subtitle: {
          options: {
            meta: {},
            style: getStyles('subtitle'),
          },
          content: {
            text: 'No animals.',
          },
          btn: {},
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
        btn: {
          options: {
            meta: {},
            style: getStyles('btn'),
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
      typeId: 2,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: '../assets/imgs/hero-2-img',
            },
            style: getStyles('img'),
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
  typeId: 2,
  options: {
    meta: {
      // download imgs from now?
      src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623cfb46d0ab4fab78e53577_Callout%20Photo.jpg',
    },
    style: getStyles(),
  },
  info: {
    title: {
      options: {
        meta: {},
        style: getStyles('title'),
      },
      content: {
        text: 'Come day hello',
      },
    },
    text: {
      options: {
        meta: {},
        style: getStyles('text'),
      },
      content: {
        text: 'MAR 27, 2022',
      },
    },
    subtitle: {
      options: {
        meta: {},
        style: getStyles('subtitle'),
      },
      content: {
        text: 'Golden Gate Park',
      },
    },
    details: {
      options: {
        meta: {},
        style: getStyles('details'),
      },
      content: {
        text: '4976 Fulton Street\nSan Francisco, CA 94121',
      },
    },
    tag: {
      options: {
        meta: {
          href: '#',
        },
        style: getStyles('tag'),
      },
      content: { text: '2:00 pm - 9:00 pm' },
    },
  },
})

wapsMap.set('wap-section-2', {
  id: '',
  type: 'wap-section',
  typeId: 2,
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 2,
      options: {
        meta: {},
        style: getStyles(),
      },

      title: {
        options: {
          meta: {},
          style: getStyles('title'),
        },
        content: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consequat netus tristique at sem ipsum fames.',
        },
      },
      text: {
        options: {
          meta: {},
          style: getStyles('text'),
        },
        content: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consequat netus tristique at sem ipsum fames.',
        },
      },
      btn: {
        options: {
          meta: {},
          style: getStyles('btn'),
        },
        content: {
          text: 'View menu',
        },
      },
    },
    {
      id: '2',
      type: 'section-gallery-item',
      typeId: 2,
      options: {
        meta: {
          srcs: [
            'https://uploads-ssl.webflow.com/623b08ca224738c57f5fa0ea/623f1189632baa0fde4f93fb_Tacos-p-500.jpeg',
            'https://uploads-ssl.webflow.com/623b08ca224738c57f5fa0ea/623f1197a9384100846bb45b_Burgers-p-500.jpeg',
            'https://uploads-ssl.webflow.com/623b08ca224738c57f5fa0ea/623f11917d19484961ab36a5_Sides-p-500.jpeg',
            'https://uploads-ssl.webflow.com/623b08ca224738c57f5fa0ea/623f119fec895207e4b8f202_Beverages-p-1080.jpeg',
          ],
        },
        style: getStyles(),
      },
      info: {},
    },
  ],
})
wapsMap.set('wap-cards-2', {
  id: '',
  type: 'wap-cards',
  typeId: 2,
  options: {
    meta: {
      src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623b0c7839281d050ca493ea_Green_Texture.jpg',
    },
    style: getStyles(),
  },
  info: {
    title: {
      options: {
        meta: {},
        style: getStyles('title'),
      },
      content: {
        text: "You'll love us",
      },
    },
  },
  cmps: [
    {
      id: '1',
      type: 'wap-card',
      typeId: 2,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623cfb461da4525a7020a092_Icon%201.svg',
            },
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
            text: 'Plant based',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-card',
      typeId: 2,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623cfb47fbd20a23d33aac54_Icon%202.svg',
            },
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
            text: 'Gluten free',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
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
      typeId: 2,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623cfb46bab7a365649510e1_Icon%203.svg',
            },
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
            text: 'Made with love',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
        },
      },
    },
  ],
})

// social icons? where do i put them?
//Should be in footer cmp^:
// wapsMap.set('wap-form-2', {
//   id: '',
//   type: 'wap-form',
//   typeId: 1,
//   options: {
//     meta: {},
//     style: {
//       backgroundColor: '',
//       fontFamily: '',
//       color: '',
//       fontWeight: '',
//       fontSize: '',
//     },
//   },
//   info: {
//     title: {
//       options: {
//         meta: {},
//         style: {
//           fontFamily: '',
//           color: '',
//           fontWeight: '',
//           fontSize: '',
//         },
//       },
//       content: {
//         text: 'Sign up for our newsletter!',
//       },
//     },
//     input: {
//       options: {
//         meta: {},
//         style: {
//           fontFamily: '',
//           color: '',
//           fontWeight: '',
//           fontSize: '',
//         },
//       },
//       content: {
//         // placeholder text
//         text: 'mail@mail.com',
//       },
//     },
//     btn: {
//       options: {
//         meta: {},
//         style: {
//           fontFamily: '',
//           color: '',
//           fontWeight: '',
//           fontSize: '',
//         },
//       },
//       content: {
//         // placeholder text
//         text: 'Sign up',
//       },
//     },
//   },
// })
