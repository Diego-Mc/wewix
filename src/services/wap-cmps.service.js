import { utilService } from './util.service.js'

window.getCmp = getCmp

export const wapUtils = {
  getMeta,
  getStyles,
  getTemplate,
  getTemplateTheme,
}

function getTemplateTheme(templateId) {
  return 'theme-' + templateId.match(/\d+/)[0]
}

function getTemplate(templateId) {
  const template = templatesMap.get(templateId)
  // not sure if should happen now or when publishing...
  // but //TODO move to db anyway
  template.createdBy = {
    _id: '5e26e0b718a0891d4c995527',
    fullname: 'Hekro Special',
    imgUrl: 'img.jpg',
  }
  return template
  // const wap = {
  //   _id: 'template-1',
  //   name: 'template-1',
  //   imgUrl:
  //     'http://res.cloudinary.com/webify/image/upload/v1590021948/coffe_yi0yzf.png',
  //   createdBy: {
  //     _id: '5e26e0b718a0891d4c995527',
  //     fullname: 'Hekro Special',
  //     imgUrl: 'img.jpg',
  //   },
  //   usersData: {
  //     contacts: [
  //       { email: 'user@user.com', msg: 'Please send me stuff', at: 123 },
  //     ],
  //     subscriptions: [{ email: 'user@user.com', at: 123 }],
  //   },
  //   cmps: [
  //     getCmp('wap-header', 2),
  //     getCmp('wap-hero', 2),
  //     getCmp('wap-section', 2),
  //     getCmp('wap-section', 3),
  //     getCmp('wap-section', 4),
  //     getCmp('wap-cards', 2),
  //   ],
  // }
  // return wap
}

// {
//   _id: '5e26e0b718a0891d4c995527',
//   fullname: 'Hekro Special',
//   imgUrl: 'img.jpg',
// }

export default function getCmp(type, typeId) {
  let key = type
  if (typeId) key = `${type}-${typeId}`
  const cmp = wapsMap.get(key)
  cmp.id = 'wap-' + utilService.makeId()
  return utilService.deepCopy(cmp)
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
        borderRadius: '',
      }
    case 'form':
      return {
        backgroundColor: '',
        fontFamily: '',
        color: '',
        fontWeight: '',
        fontSize: '',
      }
    default:
      return utilService.deepCopy({
        backgroundColor: '',
        // fontFamily: '',
        // color: '',
        // fontWeight: '',
        // fontSize: '',
      })
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
  cmps: [],
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
        meta: {
          href: '',
        },
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
              href: '',
            },
            style: getStyles('btn'),
          },
          content: { text: 'Start now' },
        },
      },
    },
  ],
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
      typeId: 2,
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
            meta: { href: '' },
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
            meta: { href: '' },
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
            meta: { href: '' },
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
    meta: {
      formInputs: [
        { tag: 'Email', txt: '' },
        { tag: 'Message', txt: '' },
      ],
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
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410147/waps/wap-header-2_dwilko.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  info: {
    nav1: {
      options: {
        meta: {
          scrollTo: '',
        },
        style: getStyles('nav'),
      },
      content: {
        text: 'Menu',
      },
    },
    nav2: {
      options: {
        meta: {
          scrollTo: '',
        },
        style: getStyles('nav'),
      },
      content: {
        text: 'Schedule',
      },
    },
    nav3: {
      options: {
        meta: {
          scrollTo: '',
        },
        style: getStyles('nav'),
      },
      content: {
        text: 'About',
      },
    },
    nav4: {
      options: {
        meta: {
          scrollTo: '',
        },
        style: getStyles('nav'),
      },
      content: {
        text: 'Catering',
      },
    },
    nav4: {
      options: {
        meta: {
          scrollTo: '',
        },
        style: getStyles('nav'),
      },
      content: {
        text: 'Contact',
      },
    },
  },

  // info: {
  //   // logo?
  //   img: {
  //     options: {
  //       meta: {
  //         src: 'https://i.ibb.co/zZdJHBn/plantify-logo.png',
  //       },
  //       style: getStyles('img'),
  //     },
  //     content: {},
  //   },
  //   nav: {
  //     options: {
  //       meta: {},
  //       style: getStyles('nav'),
  //     },
  //     content: {
  //       nav1: 'Menu',
  //       nav2: 'Schedule',
  //       nav3: 'About',
  //       nav4: 'Catering',
  //       nav5: 'Contact',
  //     },
  //   },
  //   title: {
  //     options: {
  //       meta: { animation: '' },
  //       style: getStyles('title'),
  //     },
  //     content: { text: 'Plantify' },
  //   },
  //   btn: {
  //     options: {
  //       meta: {},
  //       style: getStyles('btn'),
  //     },
  //     content: { text: 'Find us' },
  //   },
  // },
  cmps: [
    {
      id: '1',
      type: 'wap-logo',
      typeId: 1, // change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://i.ibb.co/zZdJHBn/plantify-logo.png',
            },
            style: getStyles('img'),
          },
          content: {},
        },
        title: {
          options: {
            meta: { animation: '' },
            style: getStyles('title'),
          },
          content: { text: 'Plantify' },
        },
      },
    },
    {
      id: '2',
      type: 'wap-nav',
      typeId: 1,
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        nav1: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Menu',
          },
        },
        nav2: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Schedule',
          },
        },
        nav3: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'About',
          },
        },
        nav4: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Catering',
          },
        },
        nav4: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Contact',
          },
        },
      },
      // info: {
      //   nav: {
      //     options: {
      //       meta: {},
      //       style: getStyles('nav'),
      //     },
      //     content: {
      //       nav1: 'Menu',
      //       nav2: 'Schedule',
      //       nav3: 'About',
      //       nav4: 'Catering',
      //       nav5: 'Contact',
      //     },
      //   },
      // },
    },
    {
      id: '3',
      type: 'wap-btn',
      typeId: 1,
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        btn: {
          options: {
            meta: { href: '' },
            style: getStyles('btn'),
          },
          content: { text: 'Find us' },
        },
      },
    },
  ],
})

// this is temp's 2 hero section.
wapsMap.set('wap-hero-2', {
  id: '',
  type: 'wap-hero',
  typeId: 2,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410152/waps/wap-hero-2_jpl2p1.png',
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
            style: {
              ...getStyles('tag'),
              borderRadius: '1.46em',
            },
          },
          content: {
            text: 'FOOD TRUCK',
          },
        },
        title: {
          options: {
            meta: { animation: '' },
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
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consequat netus tristique at sem ipsum fames. Sed a molestie enim ac sed.',
          },
        },
        btn: {
          options: {
            meta: { href: '' },
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
              src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623f10c1e48d404efb7a7178_Hero%20Photo-p-500.jpeg',
            },
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
  ],
})

wapsMap.set('wap-section-2', {
  id: '',
  type: 'wap-section',
  typeId: 2,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410153/waps/wap-section-2_f2cptn.png',
  options: {
    meta: {
      // download imgs from now?
      src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623cfb46d0ab4fab78e53577_Callout%20Photo.jpg',
    },
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 3,
      options: {
        meta: {},
        style: {
          ...getStyles(),
          backgroundImage:
            'url(https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623cfb46d0ab4fab78e53577_Callout%20Photo.jpg)',
        },
      },
      info: {
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Come say hello',
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
              href: '',
            },
            style: getStyles('tag'),
          },
          content: { text: '2:00 pm - 9:00 pm' },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-3', {
  id: '',
  type: 'wap-section',
  typeId: 3,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410152/waps/wap-gallery-section-3_kwa6l7.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 5,
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
            text: 'Our menu',
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
            meta: { href: '' },
            style: getStyles('btn'),
          },
          content: {
            text: 'View menu',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-gallery-section',
      typeId: 1,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img1: {
          options: {
            meta: {
              src: 'https://uploads-ssl.webflow.com/623b08ca224738c57f5fa0ea/623f1189632baa0fde4f93fb_Tacos.jpg',
            },
            style: getStyles('img'),
          },
          content: { text: 'Tacos' },
        },
        img2: {
          options: {
            meta: {
              src: 'https://uploads-ssl.webflow.com/623b08ca224738c57f5fa0ea/623f1197a9384100846bb45b_Burgers.jpg',
            },
            style: getStyles('img'),
          },
          content: { text: 'Burgers' },
        },
        img3: {
          options: {
            meta: {
              src: 'https://uploads-ssl.webflow.com/623b08ca224738c57f5fa0ea/623f11917d19484961ab36a5_Sides.jpg',
            },
            style: getStyles('img'),
          },
          content: { text: 'Sides' },
        },
        img4: {
          options: {
            meta: {
              src: 'https://uploads-ssl.webflow.com/623b08ca224738c57f5fa0ea/623f119fec895207e4b8f202_Beverages-p-1080.jpeg',
            },
            style: getStyles('img'),
          },
          content: { text: 'Beverages' },
        },
      },
    },
  ],
})

wapsMap.set('wap-cards-2', {
  id: '',
  type: 'wap-cards',
  typeId: 2,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410145/waps/wap-cards-2_tyngse.png',
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

wapsMap.set('wap-section-4', {
  id: '',
  type: 'wap-section',
  typeId: 4,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410157/waps/wap-section-4_y3yobn.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-img-section',
      typeId: 4,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://uploads-ssl.webflow.com/623a639d34ee04adef0721f8/623f1118ecca6c85eac7cd48_About%20Photo-p-500.jpeg',
            },
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
    {
      id: '2',
      type: 'wap-text-section',
      typeId: 4,
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
            text: 'The best vegan comfort food in Los Angeles',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consequat netus tristique at sem ipsum fames. Sed a molestie enim ac sed.',
          },
        },
        btn: {
          options: {
            meta: { href: '' },
            style: getStyles('btn'),
          },
          content: {
            text: 'About Us',
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
// -----------------------------------------------template 2--------------------------------------------------------------->

wapsMap.set('wap-header-3', {
  id: '',
  type: 'wap-header',
  typeId: 3,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410148/waps/wap-header-3_osiyp3.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-logo',
      typeId: 2, // change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          // logo or wapLogo or title?
          options: {
            meta: {
              src: 'https://i.ibb.co/9r1MBSK/image.png',
            },
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
    {
      id: '2',
      type: 'wap-nav',
      typeId: 2, //change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        nav1: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'DESIGN',
          },
        },
        nav2: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'ABOUT',
          },
        },
        nav3: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'REVIEWS',
          },
        },
        nav4: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'REFER A FRIEND',
          },
        },
      },
      // info: {
      //   nav: {
      //     options: {
      //       meta: {},
      //       style: getStyles('nav'),
      //     },
      //     content: {
      //       nav1: 'DESIGN',
      //       nav2: 'ABOUT',
      //       nav3: 'REVIEWS',
      //       nav4: 'REFER A FRIEND',
      //     },
      //   },
      // },
    },
  ],
})

wapsMap.set('wap-hero-3', {
  id: '',
  type: 'wap-hero',
  typeId: 3,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410152/waps/wap-hero-3_sxscii.png',
  options: {
    meta: {},
    style: {
      ...getStyles(),
      backgroundImage:
        'url(https://www.goby.co/assets/modern-luxary-desktop-810f00643379d078f84ed90e28d96ba12742e9fb347cc966e480c75f9d896740.jpg)',
    },
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 6,
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
            text: 'MODERN LUXURY MEETS EVERYDAY BRUSHING',
          },
        },
        btn: {
          options: {
            meta: {
              href: '',
            },
            style: getStyles('btn'),
          },
          content: {
            text: 'SHOP NOW',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-cards-3', {
  id: '',
  type: 'wap-cards',
  typeId: 3, // not sure but i think you maybe said it needs to be 6.
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410144/waps/wap-cards-3_arqkbx.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-card',
      typeId: 3,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        subtitle: {
          options: {
            meta: {},
            style: getStyles('subtitle'),
          },
          content: {
            text: 'BEST NEW ELECTRIC TOOTHBRUSH',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'THE STRATEGIST',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-card',
      typeId: 3,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        subtitle: {
          options: {
            meta: {},
            style: getStyles('subtitle'),
          },
          content: {
            text: 'TOP ELECTRIC TOOTHBRUSH',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'ASK THE DENTIST',
          },
        },
      },
    },
    {
      id: '3',
      type: 'wap-card',
      typeId: 4,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/stars-01685a6e100fb26465825ae119697ed31cfe78fa49c67a8e62e65351257abd3a.png',
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
            text: '500+ REVIEWS',
          },
        },
      },
    },
    {
      id: '4',
      type: 'wap-card',
      typeId: 3,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        subtitle: {
          options: {
            meta: {},
            style: getStyles('subtitle'),
          },
          content: {
            text: 'BEST SUBSCRIPTION TOOTHBRUSH',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'WIRECUTTER',
          },
        },
      },
    },
    {
      id: '5',
      type: 'wap-card',
      typeId: 3,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        subtitle: {
          options: {
            meta: {},
            style: getStyles('subtitle'),
          },
          content: {
            text: 'LUXURIOUS YET POWERFUL',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'REAL SIMPLE',
          },
        },
      },
    },
  ],
})

//did we skip the part wher eit has a sticker 'ADA Accepted'?
wapsMap.set('wap-section-5', {
  id: '',
  type: 'wap-section',
  typeId: 5,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410153/waps/wap-section-5_x7bvg6.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-img-section',
      typeId: 5,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/max-clean-0ddf5ef0f199f84aa3a1a0a17a24e404e97546c6ed6235644b742579e7af6ac2.jpg',
            },
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
    {
      id: '2',
      type: 'wap-text-section',
      typeId: 9,
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
            text: 'MAXIMUM CLEAN, FRACTION OF THE PRICE',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Rotationally oscillating brush heads are proven to clean better. By selling directly to you, we offer an award winning electric toothbrush at a fraction of the price.',
          },
        },
        btn: {
          options: {
            meta: { href: '' },
            style: getStyles('btn'),
          },
          content: {
            text: 'GET YOUR GOBY',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-cards-4', {
  id: '',
  type: 'wap-cards',
  typeId: 4, // not sure but i think you maybe said it needs to be 6.
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410145/waps/wap-cards-4_g94ust.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  //go back to this.
  cmps: [
    {
      id: '1',
      type: 'wap-card',
      typeId: 5,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/cancel-a7edd94225e4092fedbda74eb632f6d045b3eba51073894bef5702a8da324224.png',
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
            text: 'CANCEL ANYTIME',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'or change your subscription, no questions asked.',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-card',
      typeId: 5,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/save-24d9174bbea81a7e0bb60855a36020bdd1b7f78f11916f8893db7d80e27eb95f.png',
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
            text: 'SAVE $15',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'on your brush kit when you subscribe.',
          },
        },
      },
    },
    {
      id: '3',
      type: 'wap-card',
      typeId: 5,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/subscribe-4bb6314d9b54e9f3725d3b697e8e804259b370bd91849da8204ed3b9126b8eb0.png',
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
            text: 'SUBSCRIBE',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'and we’ll automatically send you new brush heads.',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-6', {
  id: '',
  type: 'wap-section',
  typeId: 6,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410154/waps/wap-section-6_nyqzay.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 7,
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
            text: 'UNLIMITED COMPLIMENTS. GUARANTEED',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-cards-5', {
  id: '',
  type: 'wap-cards',
  typeId: 5, // not sure but i think you maybe said it needs to be 6.
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410145/waps/wap-cards-5_jyamlw.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  //go back to this.
  cmps: [
    {
      id: '1',
      type: 'wap-card',
      typeId: 6,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/icon-smile-ed3aec2d082711b3bd0ff051712c0e85aef7523efeea12eee291da20970151d6.png',
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
            text: 'FRACTION OFTHE PRICE',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'By selling directly toyou, we offer an award winning electric toothbrush at an affordable price.',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-card',
      typeId: 6,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/icon-hand-d4e228ed63fb93bdfcdb5aa6b78ca95d334bd9f01c2c510b9d4e76460a6e2eb8.png',
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
            text: 'MODERN DESIGN',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Righty, lefty, dainty or robust—the soft-touch Goby handle is made for every hand.',
          },
        },
      },
    },
    {
      id: '3',
      type: 'wap-card',
      typeId: 6,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/icon-calendar-84865aa7ee998408d14ff647a270d178ac3c1da5f5d9e6e2ed86ae35a2c43330.png',
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
            text: '60 DAY TRIAL',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'If you don’t love your Goby within 60 days, we’ll take it back for a full refund.',
          },
        },
      },
    },
    {
      id: '4',
      type: 'wap-card',
      typeId: 6,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/icon-star-6620bddd7ea173854f0610e311df2f66077c1eb91b0b212700298985d59bb6af.png',
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
            text: 'LIFETIME GUARANTEE',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'If your Goby’s performance is anything less than perfect, we’ll replace it free of charge.',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-7', {
  id: '',
  type: 'wap-section',
  typeId: 7,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410155/waps/wap-section-7_hvrnft.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 8,
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
            text: 'TREAT YOUR MOUTH TO A BETTER TOOTHBRUSH',
          },
        },
        btn: {
          options: {
            meta: { href: '' },
            style: getStyles('btn'),
          },
          content: {
            text: 'GET YOUR GOBY',
          },
        },
      },
    },
  ],
})

wapsMap.set('footer-1', {
  id: '',
  type: 'wap-footer',
  typeId: 1,
  previewImg: '',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '2',
      type: 'nav',
      typeId: 4, //change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        nav1: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'SHOP',
          },
        },
        nav2: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'DESIGN',
          },
        },
        nav3: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'ABOUT',
          },
        },
        nav4: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'REVIEWS',
          },
        },
        nav5: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'REFER A FRIEND',
          },
        },
        nav6: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'SIGN IN',
          },
        },
      },
      // info: {
      //   nav: {
      //     options: {
      //       meta: {},
      //       style: getStyles('nav'),
      //     },

      //     content: {
      //       nav1: 'SHOP',
      //       nav2: 'DESIGN',
      //       nav3: 'ABOUT',
      //       nav4: 'REVIEWS',
      //       nav5: 'REFER A FRIEND',
      //       nav6: 'SIGN IN',
      //       nav7: 'CART',
      //     },
      //   },
      // },
    },
    {
      id: '1',
      type: 'form',
      typeId: 1,
      options: {
        meta: {
          formInputs: [{ tag: 'Email', txt: '' }],
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
            text: 'JOIN THE GOBY REVOLUTION',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-8', {
  id: '',
  type: 'wap-section',
  typeId: 1, // not sure but i think you maybe said it needs to be 6.
  previewImg: '',
  options: {
    meta: {},
    style: getStyles(),
  },
  //go back to this.
  cmps: [
    {
      id: '1',
      type: 'wap-social-section',
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
            text: 'FOLLOW US',
          },
        },
        img1: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/twitter-ffb608709acf047f23aacb01ca67ac1120372ceb9d7a389bd9476b204b0e264e.svg',
            },
            style: getStyles('img'),
          },
          content: {},
        },
        img2: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/facebook-6146757741e670387b96c2b92cd299563b02bf5d242bdd436e85450faf2e913a.svg',
            },
            style: getStyles('img'),
          },
          content: {},
        },
        img3: {
          options: {
            meta: {
              src: 'https://www.goby.co/assets/instagram-5ea4be0a80a85df13e3066b28af284140f8ec4b47763285ea431ece13e20b175.svg',
            },
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
  ],
})

const template2 = {
  _id: 'template-2',
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
    getCmp('wap-header', 3),
    getCmp('wap-hero', 3),
    getCmp('wap-section', 2),
    getCmp('wap-section', 3),
    getCmp('wap-section', 4),
    getCmp('wap-cards', 2),
  ],
}

// ---------------------------template 3 --------------------------------------------------------------------

//

wapsMap.set('footer-2', {
  id: '',
  type: 'wap-footer',
  typeId: 2,
  previewImg: '',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '2',
      type: 'wap-logo',
      typeId: 3, //change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        nav1: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'SHOP',
          },
        },
        nav2: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'DESIGN',
          },
        },
        nav3: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'ABOUT',
          },
        },
        nav4: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'REVIEWS',
          },
        },
        nav5: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'REFER A FRIEND',
          },
        },
        nav6: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'SIGN IN',
          },
        },
      },
      // info: {
      //   nav: {
      //     options: {
      //       meta: {},
      //       style: getStyles('nav'),
      //     },
      //     content: {
      //       nav1: 'SHOP',
      //       nav2: 'DESIGN',
      //       nav3: 'ABOUT',
      //       nav4: 'REVIEWS',
      //       nav5: 'REFER A FRIEND',
      //       nav6: 'SIGN IN',
      //       nav7: 'CART',
      //     },
      //   },
      // },
    },
    {
      id: '2',
      type: 'nav',
      typeId: 3, //change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        nav1: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'DESIGN SERVICES',
          },
        },
        nav2: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'CONTENT SERVICES',
          },
        },
        nav3: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'OUR WORK',
          },
        },
        nav4: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'ABOUT',
          },
        },
        nav5: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'BLOG',
          },
        },
      },

      //       nav6: 'CONTACT',
    },
  ],
})

// const template3 = {
//   _id: 'template-3',
//   name: '',
//   imgUrl:
//     '',

//   usersData: {
//     contacts: [
//       { email: 'user@user.com', msg: 'Please send me stuff', at: 123 },
//     ],
//     subscriptions: [{ email: 'user@user.com', at: 123 }],
//   },
//   cmps: [
//     getCmp('footer', 2),
//   ],
// }

//------------------------------------- template 4 ----------------------------------------------------------------------------------------->

wapsMap.set('wap-header-5', {
  id: '',
  type: 'wap-header',
  typeId: 5,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410149/waps/wap-header-5_jxbgsw.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-logo',
      typeId: 4,
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://webdesign-finder.com/werfy/wp-content/uploads/2020/02/logo-1.png',
            },
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
    {
      id: '2',
      type: 'wap-nav',
      typeId: 3, //change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        nav1: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Home',
          },
        },
        nav2: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'About',
          },
        },
        nav3: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Services',
          },
        },
        nav4: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Gallery',
          },
        },
        nav5: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Blog',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-hero-5', {
  id: '',
  type: 'wap-hero',
  typeId: 5,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410156/waps/wap-hero-5_ubplty.png',
  options: {
    meta: {},
    style: {
      ...getStyles(),
      backgroundImage:
        'url(https://webdesign-finder.com/werfy/wp-content/uploads/2020/01/slide01.jpg)',
    },
  },
  //go back to this.
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 18,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        subtitle: {
          options: {
            meta: {},
            style: getStyles('subtitle'),
          },
          content: {
            text: 'WIND, WATER, LIFESTYLE .',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'KITE SCHOOL',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: { text: 'CALIFORNIA' },
        },
        btn: {
          options: {
            meta: {
              href: '',
            },
            style: getStyles('btn'),
          },
          content: {
            text: 'Book A Lesson',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-15', {
  id: '',
  type: 'wap-section',
  typeId: 15,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410158/waps/wap-video-section-15_uj90e5.png',
  options: {
    meta: {
      src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2020/01/bg-section-about.jpg',
    },
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 19,
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
            text: 'About Us',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Our Little History',
          },
        },
        subtitle: {
          options: {
            meta: {},
            style: getStyles('subtitle'),
          },
          content: {
            text: 'We want our clients to feel awesome and unique.',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'We specialize in private kitesurfing lessons, semi-private kitesurfing lessons!\n\nWe teach kiteboarding at our epic local spot near Óbidos, in a flat water lagoon home to consistent winds and butter flat water. ',
          },
        },
        btn: {
          options: {
            meta: { href: '' },
            style: getStyles('btn'),
          },
          content: {
            text: 'Book A Lesson',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-video',
      typeId: 5,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        video: {
          options: {
            meta: {
              link: 'https://www.youtube.com/embed/8TuRYV71Rgo',
            },
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
  ],
})
wapsMap.set('wap-section-16', {
  id: '',
  type: 'wap-section',
  typeId: 16,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410156/waps/wap-section-16_pdj5sj.png',
  options: {
    meta: {
      src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2020/01/im_9.jpg',
    },
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 20,
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
            text: 'Advantages',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Why Learn How To Kitesurf With Us?',
          },
        },
        subtitle: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'We want our clients to feel awesome and unique.',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-cards-8', {
  id: '',
  type: 'wap-cards',
  typeId: 8,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410144/waps/wap-cards-8_tjfqqy.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  //go back to this.
  cmps: [
    {
      id: '1',
      type: 'wap-card',
      typeId: 8,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              // i think icons are from an icon collection
              src: 'https://i.ibb.co/yPzZGxQ/Capture-2022-12-06-223916.png',
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
            text: '251',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Safest spot home to flat and shallow.',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-card',
      typeId: 8,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://i.ibb.co/x6nNS6R/Capture-2022-12-06-223926.png"',
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
            text: '72',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Safest spot home to flat and shallow.',
          },
        },
      },
    },
    {
      id: '3',
      type: 'wap-card',
      typeId: 7,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://i.ibb.co/m0WQrfN/Capture-2022-12-06-223935.png"',
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
            text: '193',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Safest spot home to flat and shallow',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-17', {
  id: '',
  type: 'wap-section',
  typeId: 17,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410150/waps/wap-gallery-section-17_gymtv3.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '2',
      type: 'wap-gallery-section',
      typeId: 1,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img1: {
          options: {
            meta: {
              src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2019/05/im_4-800x600.jpg',
            },
            style: getStyles('img'),
          },
          content: { text: 'Kiteboarding' },
        },
        img2: {
          options: {
            meta: {
              src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2019/10/im_14-800x600.jpg',
            },
            style: getStyles('img'),
          },
          content: { text: 'Equipment' },
        },
        img3: {
          options: {
            meta: {
              src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2019/10/im_11-800x600.jpg',
            },
            style: getStyles('img'),
          },
          content: { text: 'Kite Repairs' },
        },
        img4: {
          options: {
            meta: {
              src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2019/10/im_12-800x600.jpg',
            },
            style: getStyles('img'),
          },
          content: { text: 'Sailing' },
        },
      },
    },
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 21,
      options: {
        meta: {},
        style: getStyles(),
      },

      info: {
        tag: {
          options: {
            meta: {
              // i think icons are from an icon collection
            },
            style: getStyles('tag'),
          },
          content: { text: 'Services' },
        },

        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Let’s Start An Education!',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'We want our clients to feel awesome and unique.',
          },
        },
      },
    },
  ],
})

//transformed to section with gallery instead
// wapsMap.set('wap-section-17', {
//   id: '',
//   type: 'wap-cards',
//   typeId: 17,
//   previewImg: '',
//   options: {
//     meta: {},
//     style: getStyles(),
//   },
//   cmps: [
//     {
//       id: '1',
//       type: 'wap-card',
//       typeId: 10,
//       options: {
//         meta: {},
//         style: getStyles(),
//       },
//       info: {
//         subtitle: {
//           options: {
//             meta: {
//               // i think icons are from an icon collection
// //             },
//             style: getStyles('subtitle'),
//           },
//           content: { text: 'Services' },
//         },

//         title: {
//           options: {
//             meta: {},
//             style: getStyles('title'),
//           },
//           content: {
//             text: 'Let’s Start An Education!',
//           },
//         },
//         text: {
//           options: {
//             meta: {},
//             style: getStyles('text'),
//           },
//           content: {
//             text: 'We want our clients to feel awesome and unique.',
//           },
//         },
//       },
//     },
//     {
//       id: '2',
//       type: 'wap-card',
//       typeId: 11,
//       options: {
//         meta: {},
//         style: getStyles(),
//       },
//       info: {
//         img: {
//           options: {
//             meta: {
//               src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2019/05/im_4-800x600.jpg',
//             },
//             style: getStyles('img'),
//           },
//           content: {},
//         },

//         btn1: {
//           options: {
//             meta: {},
//             style: getStyles('btn'),
//           },
//           content: {
//             text: 'Delivery',
//           },
//         },
//         title: {
//           options: {
//             meta: {},
//             style: getStyles('title'),
//           },
//           content: {
//             text: 'Kiteboarding',
//           },
//         },
//         text: {
//           options: {
//             meta: {},
//             style: getStyles('text'),
//           },
//           content: {
//             text: 'Habitant dictum metus rhoncus vitae ac ad litora etiam. Ante elementum vivamus integer tent.',
//           },
//         },
//         btn2: {
//           options: {
//             meta: {},
//             style: getStyles('btn'),
//           },
//           content: {
//             text: 'Book a lesson',
//           },
//         },
//       },
//     },
//     {
//       id: '3',
//       type: 'wap-card',
//       typeId: 11,
//       options: {
//         meta: { src: '' },
//         style: getStyles(),
//       },
//       info: {
//         img: {
//           options: {
//             meta: {
//               src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2019/10/im_14-800x600.jpg',
//             },
//             style: getStyles('img'),
//           },
//           content: {},
//         },

//         btn1: {
//           options: {
//             meta: {},
//             style: getStyles('btn'),
//           },
//           content: {
//             text: 'Delivery',
//           },
//         },
//         title: {
//           options: {
//             meta: {},
//             style: getStyles('title'),
//           },
//           content: {
//             text: 'Equipment',
//           },
//         },
//         text: {
//           options: {
//             meta: {},
//             style: getStyles('text'),
//           },
//           content: {
//             text: 'Habitant dictum metus rhoncus vitae ac ad litora etiam. Ante elementum vivamus integer tent.',
//           },
//         },
//         btn2: {
//           options: {
//             meta: {},
//             style: getStyles('btn'),
//           },
//           content: {
//             text: 'Book a lesson',
//           },
//         },
//       },
//     },
//     {
//       id: '4',
//       type: 'wap-card',
//       typeId: 11,
//       options: {
//         meta: { src: '' },
//         style: getStyles(),
//       },
//       info: {
//         img: {
//           options: {
//             meta: {
//               src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2019/10/im_12-800x600.jpg',
//             },
//             style: getStyles('img'),
//           },
//           content: {},
//         },

//         btn1: {
//           options: {
//             meta: {},
//             style: getStyles('btn'),
//           },
//           content: {
//             text: 'Delivery',
//           },
//         },
//         title: {
//           options: {
//             meta: {},
//             style: getStyles('title'),
//           },
//           content: {
//             text: 'Sailing',
//           },
//         },
//         text: {
//           options: {
//             meta: {},
//             style: getStyles('text'),
//           },
//           content: {
//             text: 'Habitant dictum metus rhoncus vitae ac ad litora etiam. Ante elementum vivamus integer tent.',
//           },
//         },
//         btn2: {
//           options: {
//             meta: {},
//             style: getStyles('btn'),
//           },
//           content: {
//             text: 'Book a lesson',
//           },
//         },
//       },
//     },
//     {
//       id: '5',
//       type: 'wap-card',
//       typeId: 11,
//       options: {
//         meta: {},
//         style: getStyles(),
//       },
//       info: {
//         img: {
//           options: {
//             meta: {
//               src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2019/10/im_11-800x600.jpg',
//             },
//             style: getStyles('img'),
//           },
//           content: {},
//         },

//         btn1: {
//           options: {
//             meta: {},
//             style: getStyles('btn'),
//           },
//           content: {
//             text: 'Delivery',
//           },
//         },
//         title: {
//           options: {
//             meta: {},
//             style: getStyles('title'),
//           },
//           content: {
//             text: 'Kite Repairs',
//           },
//         },
//         text: {
//           options: {
//             meta: {},
//             style: getStyles('text'),
//           },
//           content: {
//             text: 'Habitant dictum metus rhoncus vitae ac ad litora etiam. Ante elementum vivamus integer tent.',
//           },
//         },
//         btn2: {
//           options: {
//             meta: {},
//             style: getStyles('btn'),
//           },
//           content: {
//             text: 'Book a lesson',
//           },
//         },
//       },
//     },
//   ],
// })

wapsMap.set('wap-section-18', {
  id: '',
  type: 'wap-section',
  typeId: 18,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410151/waps/wap-gallery-section-18_yphzjz.png',
  options: {
    meta: {
      src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2020/01/im_9.jpg',
    },
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 22,
      options: {
        meta: {},
        style: getStyles(),
      },

      info: {
        tag: {
          options: {
            meta: {
              // i think icons are from an icon collection
            },
            style: getStyles('tag'),
          },
          content: { text: 'Gallery' },
        },

        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Our photos',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'We want our clients to feel awesome and unique.',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-gallery-section',
      typeId: 4,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img1: {
          options: {
            meta: {
              src: 'https://webdesign-finder.com/werfy/wp-content/uploads/2019/05/im_4-555x450.jpg',
            },
            style: getStyles('img'),
          },
          content: {},
        },
        img2: {
          options: {
            meta: {
              src: 'https://webdesign-finder.com/werfy/wp-content/uploads/2019/12/im_23-555x450.jpg',
            },
            style: getStyles('img'),
          },
          content: {},
        },
        img3: {
          options: {
            meta: {
              src: 'https://webdesign-finder.com/werfy/wp-content/uploads/2019/10/im_12-555x450.jpg',
            },
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
  ],
})

wapsMap.set('wap-section-19', {
  id: '',
  type: 'wap-section',
  typeId: 19,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410157/waps/wap-section-19_wbusf0.png',
  options: {
    meta: {
      src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2020/01/bg-section-about.jpg',
    },
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 22,
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
            text: 'Pricing',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Kite School Programs',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'We want our clients to feel awesome and unique. ',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-cards-9', {
  id: '',
  type: 'wap-cards',
  typeId: 9,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410146/waps/wap-cards-9_w9gaek.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-card',
      typeId: 12,
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
            text: '$45',
          },
        },
        details: {
          options: {
            meta: {
              // i think icons are from an icon collection
            },
            style: getStyles('details'),
          },
          content: { text: 'Private' },
        },
        text1: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: ' Transfers to kalpitiya lagoon',
          },
        },
        text2: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Course with IKO instructors',
          },
        },
        text3: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: '3 nights accommodation',
          },
        },
        text4: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'IKO card-certificate',
          },
        },
        btn: {
          options: {
            meta: {
              href: '',
            },
            style: getStyles('btn'),
          },
          content: {
            text: 'Book A Lesson',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-card',
      typeId: 13,
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
            text: '$52',
          },
        },
        details: {
          options: {
            meta: {
              // i think icons are from an icon collection
            },
            style: getStyles('details'),
          },
          content: { text: 'Semi Private' },
        },
        text1: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: ' Transfers to kalpitiya lagoon',
          },
        },
        text2: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Course with IKO instructors',
          },
        },
        text3: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: '3 nights accommodation',
          },
        },
        text4: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'IKO card-certificate',
          },
        },
        btn: {
          options: {
            meta: { href: '' },
            style: getStyles('btn'),
          },
          content: {
            text: 'Book A Lesson',
          },
        },
      },
    },
    {
      id: '3',
      type: 'wap-card',
      typeId: 12,
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
            text: '$72',
          },
        },
        details: {
          options: {
            meta: {
              // i think icons are from an icon collection
            },
            style: getStyles('details'),
          },
          content: { text: 'Group' },
        },
        text1: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Transfers to kalpitiya lagoon',
          },
        },
        text2: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Course with IKO instructors',
          },
        },
        text3: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: '3 nights accommodation',
          },
        },
        text4: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'IKO card-certificate',
          },
        },
        btn: {
          options: {
            meta: { href: '' },
            style: getStyles('btn'),
          },
          content: {
            text: 'Book A Lesson',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-20', {
  id: '',
  type: 'wap-section',
  typeId: 20,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410145/waps/wap-form-section-20_dwdjox.png',
  options: {
    meta: {
      src: 'http://webdesign-finder.com/werfy/wp-content/uploads/2020/01/bg-section-about.jpg',
    },
    style: getStyles(),
  },
  cmps: [
    {
      id: 1,
      type: 'wap-form',
      typeId: 3,
      options: {
        meta: {
          formInputs: [{ tag: 'Email', txt: '' }],
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
            text: 'Get 30% Off Your First Order',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Join our newsletter to receive the latest updates and promotions.',
          },
        },
      },
    },
  ],
})
wapsMap.set('footer-3', {
  id: '',
  type: 'wap-footer',
  typeId: 3,
  previewImg: '',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '2',
      type: 'wap-text-section',
      typeId: 23, //change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img1: {
          options: {
            meta: {},
            style: getStyles('img'),
          },
          content: {},
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'The estuary is the well-known kite spot in the lagoon. Two launches are possible.',
          },
        },
        //  social media
        img2: {
          options: {
            meta: {},
            style: getStyles('img'),
          },
          content: {},
        },
        img3: {
          options: {
            meta: {},
            style: getStyles('img'),
          },
          content: {},
        },
        img4: {
          options: {
            meta: {},
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
    {
      id: '2',
      type: 'nav',
      typeId: 3, //change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        nav1: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Home',
          },
        },
        nav2: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'About',
          },
        },
        nav3: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Gallery',
          },
        },
        nav4: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Services',
          },
        },
        nav5: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Blog',
          },
        },
      },
      // info: {
      //   nav: {
      //     options: {
      //       meta: {},
      //       style: getStyles('Gallery'),
      //     },
      //     content: {
      //       nav1: 'Home',
      //       nav2: 'About',
      //       nav3: 'Services',
      //       nav4: 'Pages',
      //       nav5: 'Gallery',
      //       nav6: 'Blog',
      //     },
      //   },
      // },
    },
    {
      id: '2',
      type: 'wap-text-section',
      typeId: 24, //change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Portfolio',
          },
        },
        img: {
          options: {
            meta: {},
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
    {
      id: '2',
      type: 'wap-text-section',
      typeId: 25, //change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img1: {
          options: {
            meta: {},
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
  ],
})

// const template4 = {
//   _id: 'template-4',
//   name: 'Kitesurfing-club-template',
//   imgUrl:
//     'http://res.cloudinary.com/webify/image/upload/v1580021948/coffe_yi0yzf.png',
//   createdBy: {
//     _id: '5e26e0b718a0891d4c995527',
//     fullname: 'Hekro Special',
//     imgUrl: 'img.jpg',
//   },
//   usersData: {
//     contacts: [
//       { email: 'user@user.com', msg: 'Please send me stuff', at: 123 },
//     ],
//     subscriptions: [{ email: 'user@user.com', at: 123 }],
//   },
//   cmps: [
//     getCmp('wap - header', 5),
//     getCmp('wap-hero', 5),
//     getCmp('wap-section', 15),
//     getCmp('wap-section', 16),
//     getCmp('wap-cards', 8),
//     getCmp('wap-cards', 9),
//     getCmp('wap-section', 17),
//     getCmp('wap-section', 18),
//     getCmp('wap-cards', 10),
//     getCmp('wap-section', 19),
//     getCmp('wap-section', 20),
//     getCmp('footer', 3)
//   ],
// }

//------------------------------------------------------------------------------------------------------

//----------------------------------------- template 5 -------------------------------------------------------------

//trying to implement header
wapsMap.set('wap-header-6', {
  id: '',
  type: 'wap-header',
  typeId: 6,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410151/waps/wap-header-6_madshw.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-logo',
      typeId: 4,
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img: {
          options: {
            meta: {
              src: 'https://assets.website-files.com/5ff6cf529d44b2be039f96ca/609398c36be20aa94f6d2f91_logo%402x.png',
            },
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
    {
      id: '2',
      type: 'wap-nav',
      typeId: 5,
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        nav1: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Courses',
          },
        },
        nav2: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Plans',
          },
        },
        nav3: {
          options: {
            meta: {
              scrollTo: '',
            },
            style: getStyles('nav'),
          },
          content: {
            text: 'Contact us',
          },
        },
      },
    },
    {
      id: '3',
      type: 'wap-btn',
      typeId: 2,
      previewImg: '',
      options: {
        meta: {},
        style: getStyles('btn'),
      },
      info: {
        btn: {
          options: {
            meta: { href: '' },
            style: getStyles('btn'),
          },
          content: {
            text: 'DO IT NOW',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-hero-6', {
  id: '',
  type: 'wap-hero',
  typeId: 6,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410155/waps/wap-hero-6_y3ffwo.png',
  options: {
    meta: {},
    style: {
      ...getStyles(),
      backgroundImage:
        'url(https://assets.website-files.com/5ff6cf529d44b2be039f96ca/5ff84bc5c4ff1a5d90d0969d_simone.png)',
    },
  },
  //go back to this.
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 26,
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
            text: 'YOGA',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: { text: 'with simona' },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-21', {
  id: '',
  type: 'wap-section',
  typeId: 21,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410156/waps/wap-section-21_zgcnal.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 20,
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
            text: 'DISCOVER OUR COURSES',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Learn with us',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-22', {
  id: '',
  type: 'wap-section',
  typeId: 22,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410157/waps/wap-section-22_pgrihm.png',
  options: {
    meta: {},
    style: {
      ...getStyles(),
      backgroundImage:
        'url(https://assets.website-files.com/5ff6cf529d44b2be039f96ca/5ff8735866b4f772aff36056_img1.jpg)',
    },
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 27,
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
            text: 'DISCOVER MORE',
          },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Start with us the body and mind clensing',
          },
        },
        btn: {
          options: {
            meta: { href: '' },
            style: getStyles('btn'),
          },
          content: {
            text: 'START YOUR JOURNY',
          },
        },
        details: {
          options: {
            meta: {},
            style: getStyles('details'),
          },
          content: {
            text: 'Try our 30-days free trial',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-23', {
  id: '',
  type: 'wap-section',
  typeId: 23,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410157/waps/wap-section-23_jjhhgp.png',
  options: {
    meta: {
      // src: 'https://assets.website-files.com/5ff6cf529d44b2be039f96ca/5ff86d6541dd4e083c9c5102_background_discover.jpg',
    },
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 28,
      options: {
        meta: {
          src: 'https://assets.website-files.com/5ff6cf529d44b2be039f96ca/5ff8735866b4f772aff36056_img1.jpg',
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
            text: 'Discover yourself through yoga',
          },
        },
        btn: {
          options: {
            meta: {
              href: '',
            },
            style: getStyles('btn'),
          },
          content: {
            text: 'START YOUR JOURNY',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-25', {
  id: '',
  type: 'wap-section',
  typeId: 25,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410158/waps/wap-video-section-25_l7syts.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-video',
      typeId: 5,
      options: {
        meta: {
          src: 'https://www.youtube.com/embed/TOvmr5eSFVw',
        },
        style: getStyles(),
      },
      info: {
        video: {
          options: {
            meta: {
              link: 'https://www.youtube.com/embed/TOvmr5eSFVw',
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
            text: 'Morning Routine for Beginners',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: ' 30 MINS  •  RELAXATION & STRETCHING',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-video',
      typeId: 5,
      options: {
        meta: {
          link: 'https://www.youtube.com/embed/4KEAdBN7I1g',
        },
        style: getStyles(),
      },
      info: {
        video: {
          options: {
            meta: {
              link: 'https://www.youtube.com/embed/v7AYKMP6rOE',
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
            text: 'Yoga on the beach',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: '30 MINS  •  RELAXATION & STRETCHING',
          },
        },
      },
    },
    {
      id: '3',
      type: 'wap-video',
      typeId: 5,
      options: {
        meta: {
          link: 'https://www.youtube.com/embed/8TuRYV71Rgo',
        },
        style: getStyles(),
      },
      info: {
        video: {
          options: {
            meta: {
              link: 'https://www.youtube.com/embed/8TuRYV71Rgo',
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
            text: 'Yoga in the beach',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: '30 MINS  •  RELAXATION & STRETCHING',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-section-24', {
  id: '',
  type: 'wap-section',
  typeId: 24,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410157/waps/wap-testimonial-24_hmdvxe.png',
  options: {
    meta: {
      src: 'https://assets.website-files.com/5ff6cf529d44b2be039f96ca/5ff86d6541dd4e083c9c5102_background_discover.jpg',
    },
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 29,
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
            text: 'People trust us',
          },
        },
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: '“But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences.”',
          },
        },

        img: {
          options: {
            meta: {
              src: 'https://assets.website-files.com/5ff6cf529d44b2be039f96ca/5ffb1d59c715f856854fa66b_medalion_quote.png',
            },
            style: getStyles('img'),
          },
          content: {},
        },
        tag: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Jennie Poe',
          },
        },
        details: {
          options: {
            meta: {},
            style: getStyles('details'),
          },
          content: {
            text: 'ROCKIE GYM AMBASADOR',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-cards-11', {
  id: '',
  type: 'wap-cards',
  typeId: 11,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670410146/waps/wap-cards-11_pz5yum.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-card',
      typeId: 14,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        tag: {
          options: {
            meta: {
              // i think icons are from an icon collection
            },
            style: getStyles('tag'),
          },
          content: { text: 'CHOOSE YOURS ' },
        },
        title: {
          options: {
            meta: {},
            style: getStyles('title'),
          },
          content: {
            text: 'Start now your plan',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-card',
      typeId: 15,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        title: {
          options: {
            meta: {
              // i think icons are from an icon collection
            },
            style: getStyles('title'),
          },
          content: { text: 'Basic' },
        },
        subtitle: {
          options: {
            meta: {},
            style: getStyles('subtitle'),
          },
          content: {
            text: 'TRY FREE TODAY',
          },
        },
        details: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Learn a new skill, stretch and let it loose and unwind. Live from your living room, our boundary-pushing activities come to you.',
          },
        },
        text1: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Comment direct on design',
          },
        },
        text2: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Create private collections',
          },
        },
        text3: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Access to new features',
          },
        },
        btn: {
          options: {
            meta: {
              href: '',
            },
            style: getStyles('btn'),
          },
          content: {
            text: 'GET IT NOW',
          },
        },
      },
    },
    {
      id: '3',
      type: 'wap-card',
      typeId: 16,
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        title: {
          options: {
            meta: {
              // i think icons are from an icon collection
            },
            style: getStyles('title'),
          },
          content: { text: 'Advanced' },
        },
        subtitle: {
          options: {
            meta: {},
            style: getStyles(`20$ /MONTH`),
          },
          content: {
            text: `$20 / month`,
          },
        },
        details: {
          options: {
            meta: {},
            style: getStyles(`20$ /MONTH`),
          },
          content: {
            text: `Discover true flexibility and join us as long as you want for a few days, dip your toes in, or go steady for a year. It's at home.`,
          },
        },
        text1: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: '120+ videos',
          },
        },
        text2: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Premium live videos',
          },
        },
        text3: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'A well structured meal plan',
          },
        },
        btn: {
          options: {
            meta: { href: '' },
            style: getStyles('btn'),
          },
          content: {
            text: 'GET IT NOW',
          },
        },
      },
    },
  ],
})

wapsMap.set('footer-4', {
  id: '',
  type: 'wap-footer',
  typeId: 4,
  previewImg: '',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-text-section',
      typeId: 25, //change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: '© Yoga Instructor',
          },
        },

        text: {
          options: {
            meta: {},
            style: getStyles('text'),
          },
          content: {
            text: 'Template by DOTS N’ BITS Powered by Webflow Style Guide, Instructions, Licensing & Changelog',
          },
        },
      },
    },
    {
      id: '2',
      type: 'wap-social-section',
      typeId: 4,
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        img1: {
          options: {
            meta: {},
            style: getStyles('nav'),
          },
          content: {},
        },
        img2: {
          options: {
            meta: {},
            style: getStyles('nav'),
          },
          content: {},
        },
        img3: {
          options: {
            meta: {},
            style: getStyles('nav'),
          },
          content: {},
        },
        img4: {
          options: {
            meta: {},
            style: getStyles('nav'),
          },
          content: {},
        },
      },
    },
  ],
})

// const template5 = {
//   _id: 'template-5',
//   name: 'Kitesurfing-club-template',
//   imgUrl:
//     'http://res.cloudinary.com/webify/image/upload/v1580021948/coffe_yi0yzf.png',
//   createdBy: {
//     _id: '5e26e0b718a0891d4c995527',
//     fullname: 'Hekro Special',
//     imgUrl: 'img.jpg',
//   },
//   usersData: {
//     contacts: [
//       { email: 'user@user.com', msg: 'Please send me stuff', at: 123 },
//     ],
//     subscriptions: [{ email: 'user@user.com', at: 123 }],
//   },
//   cmps: [
//     getCmp('wap-header', 5),
//     getCmp('wap-hero', 20),
//     getCmp('wap-section', 21),
//     getCmp('wap-section', 22),
//     getCmp('wap-section', 23),
//     getCmp('wap-section', 24),
//     getCmp('wap-cards', 11),
//     getCmp('wap-footer', 4),
//    ],
// }

/*
last cmp num:
wap-header: 6
wap-section: 24
wap-hero: 5
wap-text-section : 25
wap-cards : 11
wap-card : 16
wap-gallery : 5
wap-logo : 3
nav : 5
wap-img-section : 4
wap-video-section: 3
wap-form : 4
wap-footer: 3
wap-social-section: 4

*/

//------------------------------------------------------ section with map and form --------------------------------------

wapsMap.set('wap-section-26', {
  id: '',
  type: 'wap-section',
  typeId: 26,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670746938/waps/map-form-cnp-1_siblqa.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  cmps: [
    {
      id: '1',
      type: 'wap-form',
      typeId: 6,
      options: {
        meta: {
          formInputs: [
            { tag: 'Email', txt: '' },
            { tag: 'Name', txt: '' },
            { tag: 'Phone', txt: '' },
            { tag: 'Message', txt: '' },
          ],
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
    },
    {
      id: 'wc10',
      type: 'wap-map',
      options: {
        meta: {
          mapData: {
            title: '',
            label: '',
            position: {
              lat: '',
              lng: '',
            },
          },
        },
        style: {
          backgroundColor: '',
          fontFamily: '',
          color: '',
          borderRadius: '',
          fontWeight: '',
        },
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
})

//TODO: move to db
// *************** TEMPLATES MAP ****************

const templatesMap = new Map()
templatesMap.set('template1', {
  _id: 'template1',
  name: '',
  imgUrl:
    'https://res.cloudinary.com/wewix/image/upload/v1670428298/site-previews/goby-preview-site_hiwx9v.png',
  createdBy: {},
  usersData: {
    contacts: [],
    subscriptions: [],
  },
  cmps: [
    getCmp('wap-header', 3),
    getCmp('wap-hero', 3),
    getCmp('wap-cards', 3),
    getCmp('wap-section', 5),
    getCmp('wap-cards', 4),
    getCmp('wap-section', 6),
    getCmp('wap-cards', 5),
    getCmp('wap-section', 7),
  ],
})
templatesMap.set('template2', {
  _id: 'template2',
  name: '',
  imgUrl:
    'https://res.cloudinary.com/wewix/image/upload/v1670428298/site-previews/yoga-preview-site_lig7fy.png',
  createdBy: {},
  usersData: {
    contacts: [],
    subscriptions: [],
  },
  cmps: [
    getCmp('wap-header', 6),
    getCmp('wap-hero', 6),
    getCmp('wap-section', 21),
    getCmp('wap-section', 22),
    getCmp('wap-section', 23),
    getCmp('wap-section', 24),
    getCmp('wap-section', 25),
    getCmp('wap-cards', 11),
  ],
})
templatesMap.set('template3', {
  _id: 'template3',
  name: '',
  imgUrl:
    'https://res.cloudinary.com/wewix/image/upload/v1670428300/site-previews/kite-preview-site_aowkrp.png',
  createdBy: {},
  usersData: {
    contacts: [],
    subscriptions: [],
  },
  cmps: [
    getCmp('wap-header', 5),
    getCmp('wap-hero', 5),
    getCmp('wap-section', 15),
    getCmp('wap-section', 16),
    getCmp('wap-cards', 8),
    getCmp('wap-section', 17),
    getCmp('wap-section', 19),
    getCmp('wap-cards', 9),
    getCmp('wap-section', 18),
    getCmp('wap-section', 20),
  ],
})
templatesMap.set('template4', {
  _id: 'template4',
  name: '',
  imgUrl:
    'https://res.cloudinary.com/wewix/image/upload/v1670428296/site-previews/plantify-preview-site_lfoxvp.png',
  createdBy: {},
  usersData: {
    contacts: [],
    subscriptions: [],
  },
  cmps: [
    getCmp('wap-header', 2),
    getCmp('wap-hero', 2),
    getCmp('wap-cards', 2),
    getCmp('wap-section', 2),
    getCmp('wap-section', 3),
    getCmp('wap-section', 4),
  ],
})
