var app = getApp();
const API = require('../../api/interface')
const util = require('../../utils/util')
var EventBus = require("../../libs/event");
import localStorage from "../../libs/localStorage"
Component({
  lifetimes: {
    
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type:{ // button 类型:  primary / error / disable / plain
      type: String,
      value: 'primary'
    },
    size:{ // normal big small
      type:String,
      value: 'normal'
    },
    content: { //标题
      type: String,
      value: ''
    },
    login: { //是否注册登陆按钮
      type: false,
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    wxRegist: function(e) {
      console.log("wx regist");
      console.log(e.detail.errMsg);
      console.log(e.detail.iv);
      console.log(e.detail.encryptedData);
      // 能到这里，则确定没有注册，否则直接用wx login code 自动登录了
      // 没注册则肯定没有手机号 ，直接走绑定手机号的流程
      // 拿着手机号的加密code直接注册了
      let wxInfo = localStorage.get().wxInfo
      if(wxInfo){
        if (e.detail.iv && e.detail.encryptedData ) {
          API.userLogin({
            loginType: '02',
            encryptedData: e.detail.encryptedData,
            encryptedIv:e.detail.iv,
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
        } else {
          EventBus.emit("reject-regist");
        }
      }else{
        console.log('你已经登录！！')
      }
     
    },
  }
})
