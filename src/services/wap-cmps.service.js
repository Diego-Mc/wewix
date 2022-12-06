import { utilService } from './util.service.js'

window.getCmp = getCmp

export const wapUtils = {
  getMeta,
  getStyles,
  getTemplate,
}

function getTemplate(templateId) {
  return {
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
      getCmp('wap-header', 2),
      getCmp('wap-hero', 2),
      getCmp('wap-section', 2),
      getCmp('wap-section', 3),
      getCmp('wap-section', 4),
      getCmp('wap-cards', 2),
    ],
  }
}

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
              href: '#',
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
    meta: {
      formInputs: [
        { tag: 'email', txt: '' },
        { tag: 'msg', txt: '' },
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
    'https://res.cloudinary.com/wewix/image/upload/v1670116104/wap-cmp-header-1_j7sddq.png',
  options: {
    meta: {},
    style: getStyles(),
  },
  info: {
    // logo?
    img: {
      options: {
        meta: {
          src: 'https://i.ibb.co/zZdJHBn/plantify-logo.png',
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
    title: {
      options: {
        meta: { animation: '' },
        style: getStyles('title'),
      },
      content: { text: 'Plantify' },
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
wapsMap.set('wap-hero-2', {
  id: '',
  type: 'wap-hero',
  typeId: 2,
  previewImg:
    'https://res.cloudinary.com/wewix/image/upload/v1670081189/cmp-hero-1_ajrwkx.png',
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
    'https://res.cloudinary.com/wewix/image/upload/v1670081186/cmp-section-1_ry3zpj.png',
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
        meta: {
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
              href: '#',
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
    'https://res.cloudinary.com/wewix/image/upload/v1670081191/cmp-gallery-1_rxxyfr.png',
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
            meta: {},
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
    'https://res.cloudinary.com/wewix/image/upload/v1670081186/cmp-cards-1_ggawxa.png',
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
    'https://res.cloudinary.com/wewix/image/upload/v1670081191/cmp-section-2_mpdblo.png',
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
            meta: {},
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
  previewImg: '',
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
              src: '', // its an svg didnt know how to copy
            },
            style: getStyles('img'),
          },
          content: {},
        },
      },
    },
    {
      id: '2',
      type: 'nav',
      typeId: 2, //change to what you want
      previewImg: '',
      options: {
        meta: {},
        style: getStyles(),
      },
      info: {
        nav: {
          options: {
            meta: {},
            style: getStyles('nav'),
          },
          content: {
            nav1: 'SHOP',
            nav2: 'DESIGN',
            nav3: 'ABOUT',
            nav4: 'REVIEWS',
            nav5: 'REFER A FRIEND',
            nav6: 'SIGN IN',
            nav7: 'CART',
          },
        },
      },
    },
  ],
})

wapsMap.set('wap-hero-3', {
  id: '',
  type: 'wap-hero',
  typeId: 3,
  previewImg: '',
  options: {
    meta: {
      src: 'https://www.goby.co/assets/modern-luxary-desktop-810f00643379d078f84ed90e28d96ba12742e9fb347cc966e480c75f9d896740.jpg',
    },
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
            meta: {},
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
  previewImg: '',
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
  previewImg: '',
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
            text: 'MAXIMUM CLEAN, FRACTION OF THE PRICE.',
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
            meta: {},
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
  previewImg: '',
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
  previewImg: '',
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
            text: 'UNLIMITED COMPLIMENTS. GUARANTEED.',
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
  previewImg: '',
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
  previewImg: '',
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
            text: 'TREAT YOUR MOUTH TO A BETTER TOOTHBRUSH.',
          },
        },
        btn: {
          options: {
            meta: {},
            style: getStyles('btn'),
          },
          content: {
            text: 'GET YOUR GOBY.',
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
        nav: {
          options: {
            meta: {},
            style: getStyles('nav'),
          },
          content: {
            nav1: 'SHOP',
            nav2: 'DESIGN',
            nav3: 'ABOUT',
            nav4: 'REVIEWS',
            nav5: 'REFER A FRIEND',
            nav6: 'SIGN IN',
            nav7: 'CART',
          },
        },
      },
    },
    {
      id: '1',
      type: 'form',
      typeId: 1,
      options: {
        meta: {
          formInputs: [{ tag: 'email', txt: '' }],
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
