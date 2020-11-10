const app = getApp();
Component({
  lifetimes: {
    attached: function() {},
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  data: {
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
      setTimeout(_ => {
        this.setData({
          flage: !this.data.flage
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
