
import localStorage from "../../libs/localStorage";
const API = require('../../api/interface')
const util = require("../../utils/util.js");
var app = getApp();
Page({
  data: {
    isIPX: app.globalData.isIPX,
  },
  //options(Object)
  onLoad: function(options) {
    
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
 
  registerBefore(e){
    let type = e.currentTarget.dataset.type
    let detail = e.detail
    let wxInfo = localStorage.get().wxInfo
    console.log(1111,type,detail,wxInfo);
    if(detail.errMsg==='getPhoneNumber:ok'){
      // let userRegister = { type, }
      // localStorage.set({userRegister})
      API.userLogin({
        loginType:'02',
        encryptedData:detail.encryptedData,
        encryptedIv:detail.iv,
        sessionKey:wxInfo.session_key,
        openId:wxInfo.openid,
      }).then(rrr=>{
        if(rrr.respCode==='000000'){
          console.warn('登录成功！');
          this.updateUser(rrr)
          return
        }
        wxInfo.mobileNo = rrr.reserve.mobileNo
        wxInfo.areaCode = rrr.reserve.areaCode
        console.log('注册结果',rrr,wxInfo);

        localStorage.set({wxInfo})
        API.userRegister({
          userType: type+'',
          areaCode: wxInfo.areaCode,
          mobileNo: wxInfo.mobileNo,
        }).then(res=>{
          if(res.respCode==="000000"){
            console.warn('注册成功！');
            this.updateUser(res)
          }
      
        })
      })
  
        
    }
    
  },
  updateUser(data){
    let userInfo = { customerId:data.customerId, token:data.token, }
    localStorage.set({ userInfo,isRegister:'yes' });
    setTimeout(() => {
      util.getUserInfo()
    }, 0);
    localStorage.delete('wxInfo')
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/index/index',
      });
    }, 1000);
  }
  
});
  