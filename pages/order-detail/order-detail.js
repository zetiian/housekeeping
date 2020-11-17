
var app = getApp();
const util = require('../../utils/util.js')
const API = require('../../api/interface.js')
import localStorage from "../../libs/localStorage";
var checkLogin = require('../../libs/checkLogin').checkLogin
let timeTool = require('../../utils/common.js').timeTool
var userRegister = {}
Page({
  data: {
    isIPX: app.globalData.isIPX,
    detail:{},
    newList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (op) {
    let detail = JSON.parse(decodeURIComponent(op.detail))
    detail.phone = "13311111111"
    this.setData({detail})
  },
  toConfirm(){
    wx.showToast({
      title: '操作成功！',
      duration: 1500,
    });
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/order/order',
      });
        
    }, 1500);
      
  },
 
  onReady: function () {

  },

  onShow: function () {
   
  },

  onPullDownRefresh: function () {

  },
  starChange(e){
    console.log(111);
    
  },
  goCancel(){
    wx.navigateTo({
      url: '/pages/order-detail/cancel',
    });
  },
  onReachBottom: function () {

  },

  toPay(){
    let orderId = timeTool.getTimesNum2() + '' + parseInt((Math.random() + 1) * Math.pow(10, 6 - 1));
    wx.showLoading({ title: '支付中...', mask: true });
    API.pay({
      customerId:data.customerId,
      actionType:'03',
      tranType:'00',
      serverOrderId:id,
      orderId:orderId,
      txnTime:timeTool.getTimesNum(),
      totalAmt:Number(_this.detail.serverPrice)*_this.timeLength,
      goodsName:'服务单支付',
      openid:userInfo.wxopenId,
      returnUrl: '',
    }).then(result=>{
      if(result.respCode==="000000"){
       console.log(88888,result)
       let wxpayInfo = result.orderInfo;
       wx.requestPayment({
        timeStamp: wxpayInfo.timeStamp,
        nonceStr: wxpayInfo.nonceStr,
        package: wxpayInfo.package,
        signType: wxpayInfo.signType,
        paySign: wxpayInfo.paySign,
        success: reswx => {
          util.getUserInfo()
          console.log(999,'支付成功', reswx)
          wx.hideLoading();
        }
      })
      
      }else{
        wx.$showToast(result.respMsg)
      }
    })
  },
})