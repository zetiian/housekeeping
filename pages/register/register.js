
import localStorage from "../../libs/localStorage";
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
    console.log(1111,type,detail);
    if(detail.errMsg==='getPhoneNumber:ok'){
      let userRegister = { type, }
      localStorage.set({userRegister})

      API.loginFunmin({
        loginType: '02',
        encryptedData: detail.encryptedData,
        encryptedIv:detail.iv,
        sessionKey:wxInfo.session_key,
        openId:wxInfo.openid,
      }).then(res=>{
        console.warn('注册成功！');
        let userInfo = {
          customerId:res.customerId,
          token:res.token,
        }
        localStorage.set({ userInfo,isRegister:'yes' });
        setTimeout(() => {
          util.getUserInfo()
        }, 0);
        // localStorage.delete('wxInfo')
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/index/index',
          });
            
        }, 1000);
      })
        
    }
    
  },
  
});
  