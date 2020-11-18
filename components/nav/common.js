var app = getApp();
var systemInfo = app.globalData.systemInfo;
import localStorage from "../../libs/localStorage";
Component({
  options: {
    multipleSlots: true
  },
  lifetimes: {
    attached() {
      let pages = getCurrentPages()
      if (pages.length === 1) {
        this.setData({ leftBtn: 'home' })
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {//标题
      type: String,
      value: ''
    },
    headerStyle: {//头部容器样式
      type: String,
      value: ''
    },
    titleStyle: {//title的样式
      type: String,
      value: ''
    },
    backgroundColor: {//背景颜色（整个）
      type: String,
      value: ''
    },
    color: {//文字颜色（整个）
      type: String,
      value: ''
    },
    mode: {//是否有占位元素
      type: String,
      value: 'normal'
    },
    goBack: {//是否自定义返回图标的回调 和 bind:goBack 一同使用
      type: Boolean,
      value: false
    },
    backHome: {//是否自定义首页图标的回调 和 bind:backHome 一同使用
      type: Boolean,
      value: false
    },
    homeUrl: String,//返回首页的页面链接
    iconColor: String,//icon的颜色 目前就是默认#747a86、white、black
    leftBtnType: String,//左变图标的类型
    opacity: String,
  },
  /**
   * 组件的初始数据
   */
  data: {
    leftBtn:'back',
    paddingTop:systemInfo.statusBarHeight,
    isIP5: systemInfo.windowWidth == 320 && systemInfo.windowHeight == 568
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goback: function () {
      this.data.goBack ? this.triggerEvent('goBack') : wx.navigateBack({
        delta: 1, fail:err=>{ wx.reLaunch({ url: "/pages/index/index" }); },
      })
    },
    goHome: function (e) {
      let userInfo = localStorage.get().userInfo
      let url = (userInfo && userInfo.userType==='1')?'/pages/my/my':'/pages/index/index'
      this.data.backHome ? this.triggerEvent('backHome') : wx.reLaunch({
        url: this.data.homeUrl || url
      });
    }
  }
})
