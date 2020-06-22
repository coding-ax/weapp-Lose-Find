// pages/profile/profile.js
const app = getApp();
Page({

    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        openid: '',
        session_key: '',
        userDetail: {
            truename: '',
            college: '',
            cardNumber: '',
            phoneNumber: '',
            qqNumber: '',
            email: '',
        },
        isshow: false
    },
    //事件处理函数
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        app.globalData.login = true;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    nav2edit(event) {
        let profile = JSON.stringify(this.data.userDetail)
        wx.navigateTo({
            url: `/pages/edit/edit?profile=${profile}`,
        })
    },
    // 防止由于网络波动造成了openid获取失败
    getOpenid() {
        setTimeout(() => {
            //如果已经获取到数据
            if (app.globalData.openid != 'openid' && app.globalData.session_key != 'session_key') {
                this.setData({
                    openid: app.globalData.openid,
                    session_key: app.globalData.session_key
                });
                //设置 个人信息数据
                this.setMessage()
            } else {
                this.getOpenid();
            }
        }, 100)
    },

    setMessage() {
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: `https://khany.top:8080/lof/searchinfo/?openid=${this.data.openid}`,
            method: 'GET',
            success: res => {
                let data = res.data.data
                this.setData({
                    userDetail: data
                })
                wx.hideLoading({
                    complete: (res) => { },
                })
                console.log(data)
            }
        })
    },


    // 我的失物
    gotomylose() {
        wx.navigateTo({
            url: '/pages/mylose/mylose?openid=' + this.data.openid,
        })
    },
    // 展示提示
    showTag() {
        this.setData({
            isshow: true
        })
    },
    onClose() {
        this.setData({
            isshow: false
        })
    },
    // 我的招领
    gotomyfind() {
        wx.navigateTo({
            url: '/pages/myfind/myfind?openid=' + this.data.openid,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        //1s后修改获取数据openid和session_key
        this.getOpenid();

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setMessage()
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})