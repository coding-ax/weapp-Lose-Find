// pages/lose/lose.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        login: false,
        text: "请共同打造和谐失物招领环境，不要发布虚假内容，不发布违法，反动，色情信息！",
        speedValue: 30,
        publicInfos: [],
        count: 1,
        imgSrc: [
            "https://xgpax.top/swiper-img/lost (8).jpg",
            "https://xgpax.top/swiper-img/lost (9).jpg",
            "https://xgpax.top/swiper-img/lost (10).jpg",
        ],
        value: ""
    },

    search(event) {
        let value = event.detail
        this.setData({
            value: value
        })
        wx.showLoading({
            title: '搜索中',
        })
        wx.request({
            url: `https://khany.top:8080/lof/searchevent?content=${value}&status=1`,
            success: res => {
                console.log(res)
                // 搜索有结果
                if (res.data.length != 0) {
                    // 重置一下当前长度
                    this.data.publicInfos = []

                    for (let item of res.data) {
                        let photos = []
                        // 图片刷新
                        for (let count of item.photo) {
                            photos.push("https://khany.top:8080" + count)
                        }
                        this.data.publicInfos.push({
                            id: item.id,
                            username: item.truename,
                            avatarURL: item.avatarURL,
                            dateTime: item.time,
                            text: item.text,
                            phoneNumber: item.phoneNumber,
                            qqNumber: item.qqNumber,
                            photos: photos,
                        })


                    }
                    this.setData({
                        publicInfos: this.data.publicInfos,
                    })
                    console.log(this.data.publicInfos)
                    wx.hideLoading({
                        complete: (res) => { },
                    })
                } else {
                    wx.hideLoading({
                        complete: (res) => { },
                    })
                    Toast.fail('未搜索到结果');
                }


            },
            fail: err => {
                console.log(err)
                wx.hideLoading({
                    complete: (res) => { },
                })

            },
            complete: () => {

            }
        })
    },


    getLogin() {
        //每50ms检查一次登录状态
        let num = setInterval(() => {
            this.data.login = app.globalData.login;
            // console.log(h)
            if (this.data.login == true) {
                this.setData({
                    login: this.data.login
                })
                clearInterval(num)
            }
        }, 50);
    },
    // 详情跳转：
    seeDetail(event) {
        console.log(event)
        if (this.data.login) {
            wx.navigateTo({
                url: '/pages/detail/detail?data=' + JSON.stringify(this.data.publicInfos[event.currentTarget.dataset.index]),
            })
        } else {
            wx.switchTab({
                url: '/pages/profile/profile',
            })
        }

    },

    refresh(count) {
        wx.showLoading({
            title: '疯狂加载中',
        });
        return new Promise((resolve, reject) => {
            wx.request({
                url: 'https://khany.top:8080/lof/getlost?page=' + count,
                method: 'GET',
                success: res => {
                    console.log(res)
                    for (let item of res.data) {
                        let photos = []
                        for (let count of item.photo) {
                            photos.push("https://khany.top:8080" + count)
                        }
                        this.data.publicInfos.push({
                            id: item.id,
                            username: item.truename,
                            avatarURL: item.avatarURL,
                            dateTime: item.time,
                            text: item.text,
                            phoneNumber: item.phoneNumber,
                            qqNumber: item.qqNumber,
                            photos: photos
                        })

                    }
                    this.setData({
                        publicInfos: this.data.publicInfos,
                    })
                    console.log(this.data.publicInfos)
                    resolve(res)
                },
                fail: err => {
                    console.log(err)
                    reject(err)
                },
                complete: () => {
                    wx.hideLoading();
                }
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.data.publicInfos = []
        this.setData({
            publicInfos: this.data.publicInfos
        })
        this.refresh(1)
        this.setData({
            count: this.data.count + 1
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getLogin()
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
        console.log("页面下拉触底")
        this.data.publicInfos = []
        this.setData({
            publicInfos: this.data.publicInfos,
            value: ''
        })
        this.data.count = 1
        this.refresh(1).then(() => {
            console.log("resolve then ")
            wx.stopPullDownRefresh({
                complete: (res) => {
                    wx.showToast({
                        title: '刷新成功',
                    })
                },
            })
        })
        this.setData({
            count: this.data.count + 1
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("页面上拉触底")
        this.refresh(this.data.count)
        this.setData({
            count: this.data.count + 1
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { }
})