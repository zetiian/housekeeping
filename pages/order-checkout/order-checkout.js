const app = getApp();
const API = require("../../api/interface.js");
var checkLogin = require("../../libs/checkLogin").checkLogin;
import localStorage from "../../libs/localStorage";
const timeTool = require("../../utils/common.js").timeTool;
var EventBus = require("../../libs/event");
var userInfo = {};

//Page Object
Page({
  data: {
    timeLength: 1,
    isAgree: true,
    isIPX: app.globalData.isIPX,
    detail: {},
    addressDetail: {},
    selectTime: {
      showDateSelect: false,
      showTimeSelect: false,
    },
    timeList: [],
    selectTimeObj: {
      date: "请选择",
      time: "",
    },
  },
  //options(Object)
  onLoad: function (op) {
    let detail = JSON.parse(op.detail);
    detail.serverPrice = Number(detail.serverPrice) / 100;
    this.setData({ detail });
    userInfo = localStorage.get().userInfo;
    wx.hideShareMenu();
  },
  chooseTime(e) {
    let item = e.currentTarget.dataset.item;
    console.log(1123, item);
    if (item.state !== "1") {
      return;
    }
    this.setData({
      "selectTime.showDateSelect": false,
      "selectTime.showTimeSelect": false,
      "selectTimeObj.time": item.label,
    });
  },
  changeTime(e) {
    let type = e.currentTarget.dataset.type;
    let timeLength = this.data.timeLength;
    if (type === "add") {
      timeLength++;
    } else {
      timeLength--;
    }
    if (timeLength <= 0) {
      timeLength = 1;
      wx.$showToast("最短1小时");
    }
    if (timeLength >= 4) {
      timeLength = 4;
      wx.$showToast("最长4小时");
    }
    this.setData({ timeLength });
  },
  getRightAppointTime(data) {
    API.appointTimeInfo({
      customerId: data.customerId,
      serverType: data.serverType,
      appointDate: data.appointDate,
    }).then((res) => {
      this.setData({
        timeList: res.appointTimeList,
        "selectTime.showDateSelect": false,
        "selectTime.showTimeSelect": true,
        "selectTimeObj.date": data.appointDate,
      });
    });
  },
  onShow: function () {
    EventBus.on("current-address", (data) => {
      console.log(344567, data);
      this.setData({
        addressDetail: data,
      });
    });

    API.serverAddressList({
      customerId: userInfo.customerId,
      isDefault: "1",
    }).then((res) => {
      console.log("地址列表", res);
      this.setData({ addressDetail: res.resultList[0] });
    });
  },

  onTimeLengthChange() {},
  goAddress() {
    wx.navigateTo({ url: "/pages/my-address/my-address" });
  },
  formatDate(date) {
    let taskStartTime;
    if (date.getMonth() < 9) {
      taskStartTime = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-";
    } else {
      taskStartTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-";
    }
    if (date.getDate() < 10) {
      taskStartTime += "0" + date.getDate();
    } else {
      taskStartTime += date.getDate();
    }
    this.setData({
      taskStartTime: taskStartTime,
    });
    return taskStartTime;
  },
  onConfirmDate(e) {
    let date = this.formatDate(e.detail);

    let data = {
      customerId: userInfo.customerId,
      serverType: this.data.detail.serverType,
      appointDate: date,
    };
    this.getRightAppointTime(data);
  },
  onCloseDate() {
    this.setData({
      "selectTime.showDateSelect": false,
      "selectTime.showTimeSelect": false,
    });
  },
  clickOverlay() {
    this.setData({
      selectTime: {
        showDateSelect: false,
        showTimeSelect: false,
      },
    });
  },
  popTimeSelect() {
    this.setData({
      "selectTime.showDateSelect": true,
    });
  },
  goAgree() {
    this.setData({
      isAgree: !this.data.isAgree,
    });
  },
  goRule() {
    wx.navigateTo({ url: "/pages/user-rule/user-rule" });
  },
  buyNowPay() {
    checkLogin(
      (_) => {
        let _this = this.data;
        if (!_this.addressDetail) {
          return wx.$showToast("请选择服务地址");
        }
        let data = {
          addressId: _this.addressDetail.addressId,
          customerId: userInfo.customerId,
          serverType: _this.detail.serverType,
          serverFreq: "01", // 01：单次 02：年卡
          remark: _this.remark,
          serverHours: _this.timeLength,
          serverBeginTime:
            _this.selectTimeObj.date + " " + _this.selectTimeObj.time,
        };
        if (!data.addressId) {
          return wx.$showToast("请选择服务地址");
        }
        if (!_this.selectTimeObj.time) {
          return wx.$showToast("请选择时间");
        }
        let rId = "idf74cRdLtWEYsNLrnri42YwqIXndk5gE-sPYdd_VEM";
        wx.requestSubscribeMessage({
          tmplIds: [rId],
          success: (rep) => {
            if (rep[rId] === "accept") {
              this.appoint(data).then((id) => {
                wx.$showToast("预约成功，待系统派单后即可支付");
                setTimeout(() => {
                  wx.navigateTo({
                    url: `/pages/order-detail/order-detail?detail=${encodeURIComponent(
                      JSON.stringify({ serverOrderId: id })
                    )}`,
                  });
                }, 1000);
              });
            } else if (rep[rId] === "reject") {
              wx.showToast({
                title: "为获取更好的通知服务,请选则同意~",
                icon: "none",
              });
            }
          },
        });
      },
      (_) => {
        wx.$showToast("您还没登录，即将前往注册登录页");
        setTimeout(() => {
          wx.reLaunch({ url: "/pages/my/my" });
        }, 1500);
      }
    );
  },
  buyNow() {
    checkLogin(
      (_) => {
        let _this = this.data;
        if (!_this.addressDetail) {
          return wx.$showToast("请选择服务地址");
        }
        let data = {
          addressId: _this.addressDetail.addressId,
          customerId: userInfo.customerId,
          serverType: _this.detail.serverType,
          serverFreq: "01", // 01：单次 02：年卡
          remark: _this.remark,
          serverBeginTime:
            _this.selectTimeObj.date + " " + _this.selectTimeObj.time,
        };
        if (!data.addressId) {
          return wx.$showToast("请选择服务地址");
        }
        if (!_this.selectTimeObj.time) {
          return wx.$showToast("请选择时间");
        }
        this.appoint(data);
      },
      (_) => {
        wx.$showToast("您还没登录，即将前往注册登录页");
        setTimeout(() => {
          wx.reLaunch({ url: "/pages/my/my" });
        }, 1500);
      }
    );
  },
  appoint(data) {
    return new Promise((resolve, reject) => {
      API.serverAppoint(data).then((res) => {
        if (res.respCode === "000000") {
          if (data.serverType !== "01") {
            wx.showToast({ title: "预约成功！" });
            setTimeout(() => {
              wx.navigateTo({
                url: `/pages/order-detail/order-detail?detail=${encodeURIComponent(
                  JSON.stringify({ serverOrderId: res.serverOrderId })
                )}`,
              });
            }, 1000);
          }
          resolve(res.serverOrderId);
        } else {
          wx.$showToast(res.respMsg);
        }
      });
    });
  },
});
