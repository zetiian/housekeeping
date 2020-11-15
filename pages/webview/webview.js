import localStorage from "../../libs/localStorage";
var  userInfo = localStorage.get().userInfo
var app = getApp();
var systemInfo = app.globalData.systemInfo;
Page({
  data: {
    isIPX: app.globalData.isIPX,
    src: "",
    sharePath: "",
    loadUrl: ""
  },
  onUnload(e) {},

  onLoad(options) {
    wx.hideShareMenu();
    console.log("进来的", options);
    var url = "";
    var src = "";
    if (options.url) {
      url = decodeURIComponent(options.url);
      this.loadUrl = url;
      console.log("转换的", url);
      url += url.indexOf("?") == -1 ? "?" : "&";
      url += "platform=miniprogram";
      var wxCode = userInfo.get().wxCode;
      src = `${url}&w=${systemInfo.windowWidth}&wxCode=${wxCode}#wechat_redirect`;
      var sharePath = `pages/webview/webview?url=${options.url}`;
    } else if (options.targetUrl) {
      // 带参数
      src = decodeURIComponent(options.targetUrl);
    }

    this.setData({
      src: src
    });
  }
});
