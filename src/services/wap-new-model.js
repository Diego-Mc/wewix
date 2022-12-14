import getCmp from './wap-cmps.service'
export const wapForm = {
  id: 'form-1',
  type: 'wap-form',
  options: {
    meta: {
      formInputs: [
        { tag: 'email', txt: '' },
        { tag: 'msg', txt: '' },
      ],
      img: '',
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
    btn: {
      options: {
        meta: {},
        style: {},
      },
      content: {},
    },
  },
}
export const wapVideo = {
  id: 'wc10',
  type: 'wap-video',
  options: {
    meta: {
      img: '',
      link: 'https://www.youtube.com/embed/sfabsNX61aU',
    },
    style: {
      backgroundColor: '',
      fontFamily: '',
      color: '',
      borderRadius: '2em',
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
}

export const wapMap = {
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
      }
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
}


export const wapGraph = {
  id: 'wc11',
  type: 'wap-graph',
  options: {
    meta: {
      graphType: 'DoughnutChart',
      graphData: {
        labels: ['Satisfied customers', 'Unsatisfied customers'],
        datasets: [
          {
            label: 'Satisfation',
            data: [95, 5],
            backgroundColor: [
              '#cfc5ff',
              '#ac9bff',
              '#856cff',
              '#5f3eff',
              '#2e15a6',
              '#ffb9b4',
              '#ff9494',
              '#ff6666',
              '#ff3f3f',
              '#b72b2b',
              '#8f1717',
            ],
          },
        ],
      }
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
}

export const wapChat = {
  id: 'wc11',
  type: 'wap-chat',
  options: {
    meta: {
        chatData: {
          adminName: 'Adam. MasterChef at CafePuki',
          adminID: 'adam1234',
          chatId: 'asgg2134'
        }
      }
    },
}

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
    isOnline: false,
    cmps: [
      getCmp('wap-header', 1),
      getCmp('wap-hero', 1),
      getCmp('wap-section', 1),
      getCmp('wap-cards', 1),
      wapVideo,
      wapMap,
    ],
  },
]
