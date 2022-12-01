import getCmp from './wap-cmps.service'

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
        cmps: [getCmp('wap-header', 1), getCmp('wap-hero', 1), getCmp('wap-section', 1), getCmp('wap-cards', 1),],
    }

]