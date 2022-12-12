//------------------ wap-form.vue  ---------------------

function formSubmited() {
    eventBus.emit('formSubmited', { ...this.userInfo })
    const wap = this.$store.getters.editedWap
    socketService.emit('formSubmited', {
        ...this.userInfo,
        wapOwnerId: wap.owner._id,
        wapId: wap._id,
    })
}

//------------------ published-wap.vue  ------------------

async function addUserInfo(userInfo) {
    if (userInfo.type === 'subscription')
        this.wap.usersData.subscriptions.push(userInfo)
    else this.wap.usersData.contacts.push(userInfo)
    try {
        await this.updateWap()
        ElMessage({
            message: 'Message sent successfully',
            type: 'success',
        })
    } catch (error) {
        ElMessage({
            title: "Couldn't send message",
            type: 'error',
        })
    }
}

//------------------ app-dashboard.vue  --------------------

async function created() {
    socketService.on('formSent', (sentMsg) => {
        if (sentMsg.wapOwnerId === this.loggedinUser._id) {
            const updatedWapData = this.userWaps.find(
                (wap) => wap._id === sentMsg.wapId
            )
            const { wapOwnerId, wapId, ...newMsg } = sentMsg
            updatedWapData.usersData.subscriptions.unshift(newMsg)
        }
        ElMessage({
            message: `You have a new lead from site '${sentMsg.wapName}''`,
            type: 'success',
        })
    })
}