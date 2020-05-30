// components/common/small-target/small-target.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        login: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        nav2pub() {
            if (this.data.login) {
                wx.navigateTo({
                    url: '/pages/pub/pub',
                })
            }
            //未登录就跳转
            else {
                wx.switchTab({
                    url: '/pages/profile/profile',
                })
            }

        }
    }
})