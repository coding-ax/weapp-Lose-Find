// components/common/showbox/showbox.js
const util = require("../../../utils/util.js")
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        publicInfo: {
            type: Object,
            value: {
                username: '',
                avatarURL: '',
                dateTime:'',
                text: "",
                photos: [],
            }
        },
        urls: {
            type: Array,
            value: []
        },
        statusIndex:{
            type:Number,
            value:0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        status: ["","danger","success","primary","warning"],
        status2chinese:["","丢失中","已找回","招领中","已招领"],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickImg(event){
            console.log(event)
            wx.previewImage({
                current:0,
                urls: this.data.urls,
            })
        }
    }
})