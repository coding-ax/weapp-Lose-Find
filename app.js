//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        // var openid = wx.getStorageSync('openid') || ''
        // wx.setStorageSync('openid', openid)

        // 登录
        wx.login({
            success: res => {
                console.log(res)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                //  用于登录
                if (res.code) {
                    wx.request({
                        url: 'https://khany.top:8080/lof/wechatlogin/?code=' + res.code,
                        method: 'GET',
                        success: res => {
                            console.log(res)
                            this.globalData.openid = res.data.openid;
                            this.globalData.session_key = res.data.session_key;
                        },
                        fail: err => {
                            console.log(err)
                        }
                    })
                } else {
                    console.log("登陆失败" + res.errMsg)
                }

            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            this.globalData.login = true;
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },

    globalData: {
        userInfo: null,
        openid: 'openid',
        session_key: 'session_key',
        login:false,
    }
})