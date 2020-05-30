// pages/edit/edit.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form: {
            openid: app.globalData.openid,
            truename: '匿名',
            college: '',
            cardNumber: "",
            qqNumber: '',
            phoneNumber: '',
            email: '',
            sms: '暂时无需验证码'
        }
    },


    // 输入方法
    nameinput(event) {
        this.data.form[event.target.id] = event.detail
        this.setData({
            form: this.data.form
        })
    },

    submit(event) {
        console.log(event);
        console.log(this.data.form);
        let queryData = this.data.form
        wx.showLoading({
            title: '提交中',
        })

        console.log(queryData)
        wx.request({
            url: `https://khany.top:8080/lof/updateinfo/?openid=${queryData.openid}&truename=${queryData.truename}&college=${queryData.college}&cardNumber=${queryData.cardNumber}&phoneNumber=${queryData.phoneNumber}&qqNumber=${queryData.qqNumber}&email=${queryData.email}`,
            method: 'GET',
            success: res => {
                console.log(res)
                wx.hideLoading()
                wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 1000
                })
                this.nav2back()

            },
            fail: res => {
                console.log(res)
                wx.hideLoading()
                wx.showToast({
                    title: '修改失败',
                    icon: 'none',
                    duration: 1000
                })
                console.log(res)
            }
        })
    },

    nav2back() {
        wx.switchTab({
            url: '/pages/profile/profile',
        })

    },
    /**
     * 谢广平
     * 计算机学院
     * 284256
     * 1312976124
     * 13720241937
     * 1312976124@qq.com
     * 
     */

    getOpenid() {
        setTimeout(() => {
            //如果已经获取到数据
            if (app.globalData.openid != 'openid' && app.globalData.session_key != 'session_key') {
                this.data.form['openid'] = app.globalData.openid
                this.data.form['session_key'] = app.globalData.session_key
                this.setData({
                    form: this.data.form
                })
                console.log(app.globalData.openid);
            } else {
                this.getOpenid();
            }
        }, 100)
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOpenid();
        console.log(options)
        let profile = JSON.parse(options.profile);
        console.log(profile)
        for (let item in profile) {
            console.log(item)
            this.data.form[item] = profile[item];
        }
        this.setData({
            form: this.data.form
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