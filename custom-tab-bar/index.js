const app = getApp();
import localStorage from "../libs/localStorage";
var userInfo  = {}
Component({
  lifetimes: {
    attached: function() {
   
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  data: {
    isService: false,
    trainingFlag: false,
    myUnread: false,
    flage: false,
    showMask: false,
    hideTabBar: false,
    _active: "",
    isIPX: app.globalData.isIPX
  },
  observers: {
    _active(v) {
      userInfo = localStorage.get().userInfo||{}
      let page = getCurrentPages()[0]
      console.log(1111,page.route);
      if(userInfo.userType==='1' && page.route ==="pages/index/index" ){
        wx.switchTab({ url:'/pages/order/order' });
      }
      setTimeout(_ => {
        this.setData({
          flage: !this.data.flage,
          isService: (userInfo.userType==='1'||false)
        });
        // this.getTabRedPointDisp();
      }, 100);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goto: function(e) {
      let url = e.currentTarget.dataset.url;
      wx.switchTab({ url });
    }
  }
});
