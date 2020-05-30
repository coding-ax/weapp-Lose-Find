// pages/pub/pub.js

const app = getApp()
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
const util = require("../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        nick: true,
        size: {
            maxHeight: 400,
            minHeight: 200
        },
        text: '',
        cardNum: '',
        fileList: [],
        fileList2: [],
        userInfo: {
            avatarURL: "",
        },
        userDetail: {
            truename: '',
            college: '',
            cardNumber: '',
            phoneNumber: '',
            qqNumber: '',
            email: '',
        },
        openid: '',
        session_key: '',
        photos: [],
        photos2: []
    },

    // 绑定输入数据方法：
    textSub(event) {
        this.setData({
            text: event.detail
        })
    },
    textSub2(event) {
        this.setData({
            text: event.detail
        })
    },

    textCard(event) {
        this.setData({
            cardNum: event.detail
        })
    },
    // 文件以base64上传
    afterRead(event) {
        const {
            file
        } = event.detail;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        console.log(file)
        let fileList = this.data.fileList
        fileList.push({
            url: file.path,
            status: 'done',
        })


        // 显示图片
        console.log(event)
        // 获取文件管理器,将图片转码为base64
        // let fileSys = wx.getFileSystemManager()
        // console.log(fileSys.readFileSync(file.path, "base64"))
        // this.data.photos.push(fileSys.readFileSync(file.path, "base64"))
        this.data.photos.push(file.path)
        console.log(file.path)
        this.setData({
            fileList: fileList,
            photos: this.data.photos
        })
    },

    afterRead2(event) {
        const {
            file
        } = event.detail;
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        console.log(file)

        let fileList = this.data.fileList2
        fileList.push({
            url: file.path,
            status: 'done',
        })


        // 显示图片
        console.log(event)
        this.data.photos2.push(file.path)
        console.log(file.path)
        // 获取文件管理器,将图片转码为base64
        // let fileSys = wx.getFileSystemManager()
        // console.log(fileSys.readFileSync(file.path, "base64"))
        /** 修改：TODOS */
        // this.data.photos.push(fileSys.readFileSync(file.path, "base64"))
        this.setData({
            fileList2: fileList,
            photos2: this.data.photos2
        })
    },


    // 删除图片
    deleteImg(event) {
        let index = event.detail.index
        this.data.fileList.splice(index, 1);
        this.data.photos.splice(index, 1)
        this.setData({
            fileList: this.data.fileList,
            photos: this.data.photos
        })
    },

    // 删除图片
    deleteImg2(event) {
        let index = event.detail.index
        this.data.fileList2.splice(index, 1);
        this.data.photos2.splice(index, 1)
        this.setData({
            fileList2: this.data.fileList2,
            photos2: this.data.photos2
        })
    },

    //回归主页
    nav2back() {
        wx.switchTab({
            url: '/pages/lose/lose',
        })
    },

    // 是否为校园卡
    switchOnChange({
        detail
    }) {
        wx.showModal({
            title: '提示',
            content: '切换校园卡开关？',
            success: (res) => {
                if (res.confirm) {
                    this.setData({
                        isCard: detail
                    });
                }
            },
        });
    },
    // 切换navbar
    onChange(event) {},


    // 拿到openid之类的信息
    // 防止由于网络波动造成了openid获取失败
    getOpenid() {
        setTimeout(() => {
            //如果已经获取到数据
            if (app.globalData.openid != 'openid' && app.globalData.session_key != 'session_key') {
                this.setData({
                    openid: app.globalData.openid,
                    session_key: app.globalData.session_key,
                    userInfo: app.globalData.userInfo,
                });
                this.setMessage()
                console.log(this.data.userInfo)
            } else {
                this.getOpenid();
            }
        }, 100)
    },
    // 获取数据库个人信息
    setMessage() {
        wx.request({
            url: `https://khany.top:8080/lof/searchinfo/?openid=${this.data.openid}`,
            method: 'GET',
            success: res => {
                let data = res.data.data
                this.setData({
                    userDetail: data
                })
                console.log(data)
            }
        })
    },


    uploadImageTest(params, count, length) {
        console.log(params)
        //单图
        if (params.hasimage === 1) {
            console.log(this.data.photos[0])
            wx.uploadFile({
                url: 'https://khany.top:8080/lof/send2/',
                filePath: this.data.photos[0],
                name: 'image',
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                formData: params,
                success: res => {
                    console.log("hidden time:" + new Date().toLocaleString(), params.hasimage)
                    wx.hideLoading({
                        complete: (res) => {},
                    })
                    wx.showToast({
                        title: '发送成功',
                    })
                    console.log(res);
                    setTimeout(() => {
                        this.nav2back();
                    }, 1000)
                },
                fail: res => {

                }
            })
        }
        //无图
        else if (params.hasimage === 0) {
            wx.request({
                url: 'https://khany.top:8080/lof/send2/',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                data: params,
                success: res => {
                    console.log(res.data)
                    // let data = JSON.parse(res.data)
                    // console.log(data.id)
                    wx.hideLoading({
                        complete: (res) => {},
                    })
                    wx.showToast({
                        title: '发送成功',
                    })
                    console.log(res);
                    setTimeout(() => {
                        this.nav2back();
                    }, 1000)
                }
            })
        }
        //多图
        else if (params.hasimage === 2) {
            console.log("params.hasimage：", params.hasimage)
            console.log(count, length)
            //文件传输：
            //首先上传第一张图
            wx.uploadFile({
                url: 'https://khany.top:8080/lof/send2/',
                filePath: this.data.photos[count++],
                name: 'image',
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                formData: params,
                success: res => {
                    console.log(res)
                    console.log(res.data)
                    res = JSON.parse(res.data)
                    console.log(res)
                    console.log(new Date().toLocaleString() + "count:" + count)
                    if (count === length) {
                        //如果长度等于，说明多图传输完毕了，直接返回退出
                        console.log("hidden time:" + new Date().toLocaleString(), params.hasimage)
                        wx.hideLoading({
                            complete: (res) => {},
                        })
                        wx.showToast({
                            title: '上传成功',
                            duration: 500
                        })
                        setTimeout(() => {
                            this.nav2back()
                        }, 1000);
                    } else {
                        let doubleparams = {};
                        doubleparams['id'] = res.id
                        doubleparams['hasimage'] = 2
                        this.uploadImageTest(doubleparams, count, this.data.photos.length)
                    }
                },
                fail: res => {

                }
            })
        }
    },


    test() {
        util.formatTime(new Date())
        //确保已经拿到了openid
        if (this.data.openid != 'openid') {
            wx.showLoading({
                title: '提交中',
            })
            let params = {};
            params['openid'] = this.data.openid;
            params['truename'] = this.data.userDetail.truename;
            params['text'] = this.data.text;
            params['phoneNumber'] = this.data.userDetail.phoneNumber;
            params['status'] = 1;
            params['qqNumber'] = this.data.userDetail.qqNumber;
            params['date'] = new Date().toLocaleDateString()
            params['time'] = util.formatTime(new Date())
            if (this.data.photos.length === 0) {
                params['hasimage'] = 0
            } //单图
            else if (this.data.photos.length === 1) {
                params['hasimage'] = 1
            } //多图
            else {
                params['hasimage'] = 2
            }
            params['avatarURL'] = this.data.userInfo.avatarUrl
            console.log(params)
            this.uploadImageTest(params, 0, this.data.photos.length)

        } else {
            wx.hideLoading()
            wx.showToast({
                title: '服务器繁忙，请稍后重试',
                duration: 1000
            })
        }
    },










    // 招领提交
    uploadImageTest2(params, count, length) {
        console.log(params)
        //单图
        if (params.hasimage === 1) {
            console.log(this.data.photos2[0])
            wx.uploadFile({
                url: 'https://khany.top:8080/lof/send2/',
                filePath: this.data.photos2[0],
                name: 'image',
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                formData: params,
                success: res => {
                    console.log("hidden time:" + new Date().toLocaleString(), params.hasimage)
                    wx.hideLoading({
                        complete: (res) => {},
                    })
                    wx.showToast({
                        title: '发送成功',
                    })
                    console.log(res);
                    setTimeout(() => {
                        this.nav2back();
                    }, 1000)
                },
                fail: res => {

                }
            })
        }
        //无图
        else if (params.hasimage === 0) {
            wx.request({
                url: 'https://khany.top:8080/lof/send2/',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                data: params,
                success: res => {
                    console.log(res.data)
                    // let data = JSON.parse(res.data)
                    // console.log(data.id)
                    wx.hideLoading({
                        complete: (res) => {},
                    })
                    wx.showToast({
                        title: '发送成功',
                    })
                    console.log(res);
                    setTimeout(() => {
                        this.nav2back();
                    }, 1000)
                }
            })
        }
        //多图
        else if (params.hasimage === 2) {
            console.log("params.hasimage：", params.hasimage)
            console.log(count, length)
            //文件传输：
            //首先上传第一张图
            wx.uploadFile({
                url: 'https://khany.top:8080/lof/send2/',
                filePath: this.data.photos2[count++],
                name: 'image',
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                formData: params,
                success: res => {
                    console.log(res)
                    console.log(res.data)
                    res = JSON.parse(res.data)
                    console.log(res)
                    console.log(new Date().toLocaleString() + "count:" + count)
                    if (count === length) {
                        //如果长度等于，说明多图传输完毕了，直接返回退出
                        console.log("hidden time:" + new Date().toLocaleString(), params.hasimage)
                        wx.hideLoading({
                            complete: (res) => {},
                        })
                        wx.showToast({
                            title: '上传成功',
                            duration: 500
                        })
                        setTimeout(() => {
                            this.nav2back()
                        }, 1000);
                    } else {
                        let doubleparams = {};
                        doubleparams['id'] = res.id
                        doubleparams['hasimage'] = 2
                        this.uploadImageTest2(doubleparams, count, this.data.photos2.length)
                    }
                },
                fail: res => {

                }
            })
        }
    },

    cardSubmit() {
        return new Promise((resolve, reject) => {
            wx.request({
                url: `https://khany.top:8080/lof/cardattention?card=${this.data.cardNum}&phoneNumber=${this.data.userDetail.phoneNumber}&qqNumber=${this.data.userDetail.qqNumber}`,
                success: res => {
                    console.log(res)
                    resolve(res)
                },
                fail: err => {
                    console.log(err)
                    reject(err)
                }
            })
        })
    },
    submit2() {
        if (this.data.isCard) {
            this.cardSubmit().then(res => {
                if(res.data.msg="发送成功"){
                    Notify({ type: 'success', message: '太棒了，我们已经发送邮件通知TA' });
                }
                else{
                    Notify({ type: 'danger', message: '哎呀，这个用户还在漂流' });
                }
            })
            this.data.text = '校园卡号：' + this.data.cardNum + '\n' + this.data.text
        }
        util.formatTime(new Date())
        //确保已经拿到了openid
        if (this.data.openid != 'openid') {
            wx.showLoading({
                title: '提交中',
            })
            let params = {};
            params['openid'] = this.data.openid;
            params['truename'] = this.data.userDetail.truename;
            params['text'] = this.data.text;
            params['phoneNumber'] = this.data.userDetail.phoneNumber;
            params['status'] = 3;
            params['qqNumber'] = this.data.userDetail.qqNumber;
            params['date'] = new Date().toLocaleDateString()
            params['time'] = util.formatTime(new Date())
            if (this.data.photos2.length === 0) {
                params['hasimage'] = 0
            } //单图
            else if (this.data.photos2.length === 1) {
                params['hasimage'] = 1
            } //多图
            else {
                params['hasimage'] = 2
            }
            params['avatarURL'] = this.data.userInfo.avatarUrl
            console.log(params)
            this.uploadImageTest2(params, 0, this.data.photos2.length)

        } else {
            wx.hideLoading()
            wx.showToast({
                title: '服务器繁忙，请稍后重试',
                duration: 1000
            })
        }
    },
    nav2back() {
        wx.navigateBack({

        })
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 拿到用户信息
        this.getOpenid()
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