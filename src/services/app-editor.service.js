export const appEditorService = {
    getEmptyWap,
    saveToStorage,
    loadFromStorage,
}

function getEmptyWap() {
    return {
        name: '',
        imgUrl: '',
        createdBy: {
            // _id: '',
            // fullname: '',
            // imgUrl: '',
        },
        usersData: {
            contacts: [],
            subscriptions: [],
        },
        isOnline: false,
        cmps: [],
    }
}

function saveToStorage(key, val) {
    localStorage[key] = JSON.stringify(val)
}
function loadFromStorage(key) {
    const str = localStorage.getItem(key)
    return JSON.parse(str)
}
