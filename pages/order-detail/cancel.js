var app = getApp();
const API = require('../../api/interface')
const util = require('../../utils/util')
import localStorage from "../../libs/localStorage";
var  userInfo  = {}
Page({
  data: {
    resultList:[],
    currentType:'',
    isIPX:app.globalData.isIPX,
  },
  onShow(e) {
    userInfo = localStorage.get().userInfo
    API.serviceList({ typeCode:'App_Question_Type' }).then(res=>{
      if(res.respCode==="000000"){
        this.setData({resultList:res.resultList})
      }else{
        wx.showToast({
          title: '服务出现了点问题，等会再试试吧~',
          icon: 'none',
          success: (result) => {
            wx.navigateBack({ delta: 1 });
          },
         
        });
          
      }
      
    })
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