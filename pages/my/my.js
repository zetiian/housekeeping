var app = getApp();
const util = require('../../utils/util.js')
const API = require('../../api/interface.js')
import localStorage from "../../libs/localStorage";
var checkLogin = require('../../libs/checkLogin').checkLogin
let timeTool = require('../../utils/common.js').timeTool
var userInfo = {}
Page({
  data: {
    isIPX: app.globalData.isIPX,
    systemInfo: app.globalData.systemInfo,
    bottomHeight: app.globalData.isIPX ? 85 : 65,
    isRegister: '',
    userData: {},
    currentApply:{},
    userInfo:{}
  },
  onUnload(e) {},
  onLoad(options) {
    let isRegister = localStorage.get().isRegister||''
    
    this.setData({isRegister})
  },
  onShow(e) {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({ _active: "my" });
    }
    
    checkLogin(_=>{
      util.getUserInfo().then(userInfo=>{
        console.log(22222,userInfo);
        this.setData({userInfo})
        if(userInfo.userType==='1'){
        this.getApplyInfo(userInfo)
          API.monthServerData({
            customerId:userInfo.customerId
          }).then(res=>{
            if(res.respCode==='000000'){
              this.setData({
                userData:{
                  waitNum:res.waitNum,
                  finishNum:res.finishNum,
                }
              })
            }
          })
        }
      })
    
   
    },_=>{
      
    })
  },
  getApplyInfo(userInfo) {
    let data = {
      customerId:userInfo.customerId
    }
    API.serverInfo(data).then(res=>{
      console.log(8999,res);
      let currentApply ={}
      if(res.respCode ==="000000" && res.resultList.length){
        currentApply= res.resultList[res.resultList.length-1]
      }else{
        currentApply.state = 'none'
      }
      this.setData({currentApply})
    })
  },

  registerBefore(e){
    let type = e.currentTarget.dataset.type
    let detail = e.detail
    let wxInfo = localStorage.get().wxInfo
    if(detail.errMsg==='getPhoneNumber:ok'){
      API.userLogin({
        loginType:'02',
        encryptedData:detail.encryptedData,
        encryptedIv:detail.iv,
        sessionKey:wxInfo.session_key,
        openId:wxInfo.openid,
      }).then(rrr=>{
        if(rrr.respCode==='000000'){
          wx.$showToast('登录成功')
          this.updateUser(rrr)
          wx.reLaunch({
            url: '/pages/my/my',
          });
          return
        }else{
          wxInfo.mobileNo = rrr.reserve.mobileNo
          wxInfo.areaCode = rrr.reserve.areaCode
          console.log("存储注册手机号",rrr,wxInfo);
          localStorage.set({wxInfo})
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/register/register',
            });
          }, 0);
        }
       
     
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
        url: '/pages/my/my',
      });
    }, 1000);
  },
  goRegister(e) {
    wx.navigateTo({
      url: `/pages/register/register`,
    });
  },
  goUpload(e) {
    wx.navigateTo({
      url: `/pages/apply/apply`,
    });
  },
  goRule() {
    wx.navigateTo({
      url: `/pages/rich-text/rich-text?pageTitle=用户协议&detail=我是用户协议`,
    });
  },
  goMyAccount() {
    wx.navigateTo({
      url: '/pages/my-account/my-account',
    });

  },
  goAboutUs() {
    wx.navigateTo({
      url: '/pages/about-us/about-us',
    });
  },
  goAddress() {
    wx.navigateTo({
      url: '/pages/my-address/my-address',
    });
  },
  goFeedback() {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    });
  },
  goMyTickets() {
    wx.navigateTo({
      url: '/pages/tickets/tickets',
    });
  },
  goPay() {
    let account = this.data.account
    if (account && account.accountNo) {
      wx.navigateTo({
        url: '/pages/pay/pay',
      });
    } else {

    }

  },


});