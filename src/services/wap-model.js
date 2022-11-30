export default {
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
      info: {
        title: {
          style: {
            backgroundColor: '#485124',
            fontFamily: 'Roboto',
            color: 'blue',
          },
          content: {
            text: '',
          },
        },
        text: {
          style: {
            backgroundColor: '#485124',
            fontFamily: 'Roboto',
            color: 'blue',
          },
          content: {
            text: '',
          },
        },
        btn: {
          style: {
            backgroundColor: '#485124',
            fontFamily: 'Roboto',
            color: 'blue',
          },
          content: { text: 'Schedule Today!', link: '#wc03' },
        },
      },
      theme: 'theme-header-happy',
    },
    //   {
    //     id: 'wc01',
    //     type: 'wap-map',
    //     info: {
    //       name: 'Paris',
    //       lat: 12.909,
    //       lng: 23.9,
    //       zoom: 2,
    //     },
    //     theme: 'theme-map-exciting',
    //     style: {
    //       height: '300px',
    //     },
    //   },
    //   {
    //     id: 'wc03',
    //     type: 'wap-container',
    //     info: {
    //       dir: 'row',
    //       cmps: [{}, {}],
    //     },
    //     theme: 'theme-container-base',
    //     style: {},
    //   },
    // ],
  ],
  isPublic: true,
}
