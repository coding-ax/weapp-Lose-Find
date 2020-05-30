// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        data: {}
    },
    // popup开关
    showPopup() {
        this.setData({
            show: true
        });
    },

    onClose() {
        this.setData({
            show: false
        });
    },
    // 复制
    copyPhone() {
        wx.setClipboardData({
            data: this.data.data.phoneNumber,
            success: res => {
                wx.showToast({
                    title: '复制成功',
                    duration: 1000
                })
            }
        })

    },

    copyQQ() {
        wx.setClipboardData({
            data: this.data.data.qqNumber,
            success: res => {
                wx.showToast({
                    title: '复制成功',
                    duration: 1000
                })
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(JSON.parse(options.data))

        this.data.data = JSON.parse(options.data)
        this.setData({
            data: this.data.data
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
        wx.showLoading({
            title: '请等待',
        })
        setInterval(() => {
            wx.hideLoading({
                complete: (res) => {

                },
            })
        }, 500)
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