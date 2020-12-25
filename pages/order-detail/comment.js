var app = getApp();
const API = require('../../api/interface')
const util = require('../../utils/util')
import localStorage from "../../libs/localStorage";
var EventBus = require("../../libs/event");
var  userInfo  = {}
Page({
  data: {
  
    isIPX:app.globalData.isIPX,
    detail:{},
    star:0,
    remark:''
  },
  onShow(e) {
   
  },
  onLoad(op) {
    wx.hideShareMenu();
    userInfo = localStorage.get().userInfo
    let detail = localStorage.get().currentDetail
    this.setData({ detail, userInfo})

    // EventBus.on('getDetail',detail=>{
    //   console.log(111122,detail);
    // })
   
  },
  choose(e){
    let item = e.currentTarget.dataset.item
    this.setData({currentItem:item})
  },
  starChange(e){
    this.setData({star:e.detail.index+1})
  },
  submit() {
    let data = {
      customerId:this.data.userInfo.customerId,
      serverOrderId:this.data.detail.serverOrderId,
      serverNo:this.data.detail.serverNo,
      serverRating:this.data.star,
      evalContent:this.data.remark,
    }
    if(!data.serverRating)return wx.$showToast('给个评分吧')
    API.serverEval(data).then(res=>{
      wx.showToast({ title: '评价成功' });
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/order/order',
        });
      }, 1000);
    }).catch(err=>{
      console.log(2222,err);
      wx.$showToast(err)
    })

  },
});