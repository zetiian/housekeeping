
import localStorage from "../../libs/localStorage";
Page({
  data: {
    
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
      wx.reLaunch({
        url: '/pages/my/my',
      });
        
    }
    
  },
  
});
  