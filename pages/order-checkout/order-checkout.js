const app = getApp();
const API = require("../../api/interface.js");
var checkLogin = require("../../libs/checkLogin").checkLogin;
import localStorage from "../../libs/localStorage";
var EventBus = require("../../libs/event");
var userInfo = {};

//Page Object
Page({
  data: {
    isIPX: app.globalData.isIPX,
    detail: {},
    addressDetail: {},
    selectTime: {
      showDateSelect: false,
      showTimeSelect: false,
    },
    message: "",
    timeList: [],
    selectTimeObj: {
      date: "请选择",
      time: "",
    },
  },
  //options(Object)
  onLoad: function (op) {
    let detail = JSON.parse(op.detail);
    this.setData({ detail });
    userInfo = localStorage.get().userInfo;
    wx.hideShareMenu();

    API.serverAddressList({
      customerId: userInfo.customerId,
      isDefault: "1",
    }).then((res) => {
      console.log("地址列表", res);
      this.setData({ addressDetail: res.resultList[0] });
    });
  },
  chooseTime(e) {
    let item = e.currentTarget.dataset.item;
    console.log(1123,item);
    if(item.state!=='1'){ return }
    this.setData({
      "selectTime.showDateSelect": false,
      "selectTime.showTimeSelect": false,
      "selectTimeObj.time": item.label,
    });
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

  buyNow() {
    let _this = this.data
    let data = {
      addressId:_this.addressDetail.addressId,
      customerId:userInfo.customerId,
      serverType:_this.detail.serverType,
      serverFreq:'01',// 01：单次 02：年卡
      remark:_this.remark,
      serverBeginTime:_this.selectTimeObj.date +' '+ _this.selectTimeObj.time,
    } 
    if(!data.addressId){
      return wx.$showToast('请选择服务地址')
    }
    if(!_this.selectTimeObj.time){
      return wx.$showToast('请选择时间')
    }
    API.serverAppoint(data).then(res=>{
      if(res.respCode==='000000'){
        wx.showToast({ title: '预约成功！', });
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/order-detail/order-detail?id='+res.serverOrderId,
          });
        }, 1000);
      }else{
        wx.$showToast(res.respMsg)
      }
        
    })
  },
});
