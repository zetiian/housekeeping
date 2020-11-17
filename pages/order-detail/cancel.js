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
    currentType:'',
    isIPX:app.globalData.isIPX,
  },
  onShow(e) {
   
  },
  onLoad(options) {
    wx.hideShareMenu();
 
  },
  choose(e){
    let item = e.currentTarget.dataset.item
    this.setData({currentType:item.typeValue})
  },
  ensureRefund() {
    wx.showToast({ title: '提交成功', });
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/order/order',
      });
    }, 1500);
    return
    API.submitService({
      token:userInfo.token,
      customerId:userInfo.customerId,
      questionId:`${userInfo.customerId}_${util.getCurrentTimeStr('yymmddhhiiss')}`,
      questionTime:util.getCurrentTimeStr('yymmdd'),
      questionType:this.data.currentType
    }).then(res=>{
      if(res.respCode==='000000'){
        wx.showToast({ title: '反馈成功', });
        setTimeout(() => {
          this.setData({currentType:''})
          wx.navigateBack({ delta: 1 });
        }, 1500);
      }
    })
    
    

  },
});