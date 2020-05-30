// pages/mylose/mylose.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isfind: false,
        openid: 'openid',
        page: 1,
        publicInfos: []
    },

    refresh(page) {
        wx.showLoading({
            title: '加载中',
        })
        return new Promise((resolve, reject) => {
            wx.request({
                url: `https://khany.top:8080/lof/myfind?page=${page}&openid=${this.data.openid}`,
                success: res => {
                    console.log(res)
                    resolve(res)
                },
                fail: err => {
                    reject(err)
                },
                complete: res => {
                    wx.hideLoading({
                        complete: (res) => {},
                    })
                }
            })
        })


    },
    // 改变状态
    findBack(event) {
        console.log(event.currentTarget.dataset.id)
        Dialog.confirm({
                title: '确认找回？',
                message: '找回后将不会在大厅展示',
                asyncClose: true
            })
            .then(() => {
                wx.request({
                    url: 'https://khany.top:8080/lof/changeStatus?id=' + event.currentTarget.dataset.id,
                    success: res => {
                        console.log(res)
                        this.totalRefresh()
                    },
                    fail: res => {
                        console.log(err)
                    },
                    complete: res => [
                        Dialog.close()
                    ]
                })
            })
            .catch(() => {
                Dialog.close();
            });
    },

    delete(event) {
        console.log(event.currentTarget.dataset.id)
        console.log(event.currentTarget.dataset.id)
        Dialog.confirm({
                title: '确认撤销？',
                message: '撤销后将删除本记录',
                asyncClose: true
            })
            .then(() => {
                wx.request({
                    url: 'https://khany.top:8080/lof/deleterequest?id=' + event.currentTarget.dataset.id,
                    success: res => {
                        console.log(res)
                        this.totalRefresh()
                    },
                    fail: res => {
                        console.log(err)
                    },
                    complete: res => {
                        Dialog.close()
                    }
                })
            })
            .catch(() => {
                Dialog.close();
            });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.openid)
        this.setData({
            openid: options.openid
        })
        this.refresh(this.data.page).then(res => {
            this.data.publicInfos = [],
                res.data.forEach(item => {
                    let photos = []
                    for (let count of item.photo) {
                        photos.push("https://khany.top:8080" + count)
                    }
                    this.data.publicInfos.push({
                        id: item.id,
                        status: item.status,
                        username: item.truename,
                        avatarURL: item.avatarURL,
                        text: item.text,
                        dateTime: item.time,
                        photos: photos
                    })
                })
            this.setData({
                publicInfos: this.data.publicInfos,
                page: this.data.page + 1
            })
        })
        this.setData({
            page: this.data.page + 1
        })
    },


    totalRefresh() {
        this.data.publicInfos = []
        this.refresh(1).then(res => {
            res.data.forEach(item => {
                let photos = []
                for (let count of item.photo) {
                    photos.push("https://khany.top:8080" + count)
                }
                this.data.publicInfos.push({
                    id: item.id,
                    status: item.status,
                    username: item.truename,
                    avatarURL: item.avatarURL,
                    text: item.text,
                    datetime: item.time,
                    photos: photos
                })
            })
            this.setData({
                publicInfos: this.data.publicInfos,
                page: 2
            })
            wx.stopPullDownRefresh({
                complete: (res) => {
                    wx.showToast({
                        title: '刷新成功',
                        duration: 500
                    })
                },
            })
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
       this.totalRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.refresh(this.data.page).then(res => {
            res.data.forEach(item => {
                let photos = []
                for (let count of item.photo) {
                    photos.push("https://khany.top:8080" + count)
                }
                this.data.publicInfos.push({
                    id: item.id,
                    status: item.status,
                    truename: item.truename,
                    avatarURL: item.avatarURL,
                    text: item.text,
                    datetime: item.time,
                    photos: photos
                })

            })
            this.setData({
                publicInfos: this.data.publicInfos,
                page: this.data.page + 1
            })
            wx.stopPullDownRefresh({
                complete: (res) => {
                    wx.showToast({
                        title: '加载成功',
                        duration: 500
                    })
                },
            })
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})