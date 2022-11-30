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
        style: {
          backgroundColor: '',
        },
        info: {
          title: {
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
            content: {
              text: 'Dance',
            },
          },
          nav: {
            style: {
              fontFamily: '',
              color: '',
              fontWeight: '',
            },
            content: {
              nav1: 'Concierge',
              nav2: 'Rides',
              nav3: 'For Business',
            },
          },
          btn: {
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
              borderRadius: '',
            },
            content: { text: 'Start now', link: '#wc03' },
          },
        },
      },
      {
        id: 'wc03',
        type: 'wap-hero',
        style: {
          backgroundColor: '',
        },
        info: {
          title: {
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
            content: {
              text: 'Your future\nis electric',
            },
          },
          text: {
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
            content: {
              text: 'Get your own ebike or emoped\nwith our flexible subscription',
            },
          },
          btn: {
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
              borderRadius: '',
            },
            content: { text: 'Start now', link: '#wc03' },
          },
        },
      },
    ],
    isPublic: true,
  },
]
