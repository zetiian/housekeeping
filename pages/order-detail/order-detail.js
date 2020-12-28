var app = getApp();
const util = require("../../utils/util.js");
const API = require("../../api/interface.js");
import localStorage from "../../libs/localStorage";
var checkLogin = require("../../libs/checkLogin").checkLogin;
let timeTool = require("../../utils/common.js").timeTool;
var EventBus = require("../../libs/event");
var userInfo = {};
var stateList = [
  "服务已完成",
  "派单中",
  "待支付",
  "待服务",
  "服务人员已到达",
  "待评价",
  "已出发",
  "",
  "",
  "预约已取消",
];
Page({
  data: {
    isIPX: app.globalData.isIPX,
    detail: {},
    userInfo: {},
    serverOrderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    userInfo = localStorage.get().userInfo;
    if(op.id){
      this.setData({serverOrderId:op.id})
    }
   
  },
  getDetail(data){
    API.serverAppointList(data).then((res) => {
      let detail = res.resultList[0]
      detail.orderStatus = stateList[detail.state];
      detail.timeLeft = Number(detail.sendOrderTime) + 15*60 -(Number(new Date().getTime()/1000).toFixed()) 
      console.log(1111, "列表",detail);
      this.setData({ detail,userInfo });
    });
  },
  toComment(){
    // EventBus.emit('getDetail',this.data.detail)
    localStorage.set({ currentDetail:this.data.detail })
    wx.navigateTo({ url: './comment', });
      
  },
  onCountDownFinish(e){
    this.onShow()
  },
  toFinish() {
    let data = {
      customerId: userInfo.customerId,
      serverOrderId: this.data.detail.serverOrderId,
      actionType: "04",
    };
    util
      .changeOrderStatus(data)
      .then((res) => {
        wx.showToast({ title: "操作成功" });
        setTimeout(() => {
          wx.reLaunch({ url: "/pages/order/order" });
        }, 1500);
      })
      .catch((err) => {
        console.log(2222, err);
        wx.$showToast(JSON.stringify(err));
      });
  },
  toArrivePlace() {
    let data = {
      customerId: userInfo.customerId,
      serverOrderId: this.data.detail.serverOrderId,
      actionType: "05",
    };
    util
      .changeOrderStatus(data)
      .then((res) => {
        wx.showToast({ title: "操作成功" });
        setTimeout(() => {
          wx.reLaunch({ url: "/pages/order/order" });
        }, 1500);
      })
      .catch((err) => {
        console.log(2222, err);
        wx.$showToast(JSON.stringify(err));
      });
  },
  toConfirm() {
    let data = {
      customerId: userInfo.customerId,
      serverOrderId: this.data.detail.serverOrderId,
      actionType: "01",
    };
    util
      .changeOrderStatus(data)
      .then((res) => {
        wx.showToast({ title: "操作成功" });
        setTimeout(() => {
          wx.reLaunch({ url: "/pages/order/order" });
        }, 1500);
      })
      .catch((err) => {
        console.log(2222, err);
        wx.$showToast(JSON.stringify(err));
      });
  },


  onShow: function () {
    userInfo = localStorage.get().userInfo;
    this.getDetail({ customerId: userInfo.customerId, serverOrderId: this.data.serverOrderId })
  },

  onPullDownRefresh: function () {},
  starChange(e) {
    console.log(111);
  },
  goCancel(e) {
    let orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: "/pages/order-detail/cancel?id=" + orderid,
    });
  },
  onReachBottom: function () {},

  toPay() {
    let detail = this.data.detail;
    let orderId =
      timeTool.getTimesNum2() +
      "" +
      parseInt((Math.random() + 1) * Math.pow(10, 6 - 1));
    wx.showLoading({ title: "支付中...", mask: true });
    API.pay({
      customerId: userInfo.customerId,
      actionType: "03",
      tranType: "00",
      serverOrderId: detail.serverOrderId,
      orderId: orderId,
      txnTime: timeTool.getTimesNum(),
      totalAmt: Number(detail.serverMoney),
      goodsName: "服务单支付",
      openid: userInfo.wxopenId,
      returnUrl: "",
    }).then((result) => {
      if (result.respCode === "000000") {
        let wxpayInfo = result.orderInfo;
        wx.requestPayment({
          timeStamp: wxpayInfo.timeStamp,
          nonceStr: wxpayInfo.nonceStr,
          package: wxpayInfo.package,
          signType: wxpayInfo.signType,
          paySign: wxpayInfo.paySign,
          success: (reswx) => {
            util.getUserInfo();
            console.log(999, "支付成功", reswx);
            wx.hideLoading();
            wx.showToast({
              title: "支付成功！",
            });
            setTimeout(() => {
              wx.switchTab({ url: "/pages/order/order" });
            }, 1500);
          },
        });
      } else {
        wx.$showToast(result.respMsg);
      }
    });
  },
});
