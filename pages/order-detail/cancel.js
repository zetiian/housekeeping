var app = getApp();
const API = require('../../api/interface')
const util = require('../../utils/util')
import localStorage from "../../libs/localStorage";
var  userInfo  = {}
Page({
  data: {
    
    resultList:[
      {
        typeName:'时间、地址填写错误',
        typeValue:1,
      },
      {
        typeName:'不满所分配服务人员',
        typeValue:2,
      },
      {
        typeName:'不需要服务了',
        typeValue:3,
      },
      {
        typeName:'其他原因',
        typeValue:4,
      },
    ],
    currentItem:{},
    isIPX:app.globalData.isIPX,
    detail:{}
  },
  onShow(e) {
   
  },
  onLoad(op) {
    wx.hideShareMenu();
    userInfo = localStorage.get().userInfo
    this.setData({
      detail:{
       customerId:userInfo.customerId,
       serverOrderId:op.id,
       actionType:'03',
      },
    })
  },
  choose(e){
    let item = e.currentTarget.dataset.item
    this.setData({currentItem:item})
  },

  ensureRefund() {
    let data = {
      ...this.data.detail,
      reason:this.data.currentItem.typeName,
    }
    util.changeOrderStatus(data).then(res=>{
      console.log(11111,res);
      wx.showToast({ title: '提交成功' });
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/order/order',
        });
      }, 1500);
    }).catch(err=>{
      console.log(2222,err);
      wx.$showToast(err)
    })

  },
});