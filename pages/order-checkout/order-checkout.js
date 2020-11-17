const app = getApp();
const API = require('../../api/interface.js')
var checkLogin = require("../../libs/checkLogin").checkLogin;
import localStorage from "../../libs/localStorage";
var EventBus = require("../../libs/event");
var userInfo = {}

//Page Object
Page({
  data: {
    isIPX: app.globalData.isIPX,
    detail:{},
    addressDetail:{},
    addressDetail:{},
    selectTime:{
      showDateSelect:false,
      showTimeSelect:false,
    },
    message:''
  },
  //options(Object)
  onLoad: function(op) {
    let detail = JSON.parse(op.detail)
    this.setData({detail})
    userInfo = localStorage.get().userInfo
    wx.hideShareMenu();
    // let detail = {
    //   orderTime:'2020.09.10 周日 08:00～10:00',
    //   orderAddress:'香江国际金融中心606室',
    //   orderName:'清洁服务',
    //   orderStatus:'派单中',
    //   status:1,
    //   phone:'1331212121212',
    //   user:'Jericho',
    // }
    API.serverAddressList({
      customerId:userInfo.customerId,
      isDefault:'1',
    }).then(res=>{
      console.log('地址列表',res);
      this.setData({addressDetail:res.resultList[0]})
    })
  },
 
  onShow: function() {
    EventBus.on('current-address',data=>{
      console.log(344567,data);
      this.setData({
        addressDetail:data
      })
    })
  },
 
  onTimeLengthChange(){
    
  },
  goAddress(){
    wx.navigateTo({ url: '/pages/my-address/my-address', });
      
  },
  onConfirmDate(){
    this.setData({
      'selectTime.showDateSelect':false,
      'selectTime.showTimeSelect':true,
    })
  },
  onCloseDate(){
    this.setData({
      'selectTime.showDateSelect':false,
      'selectTime.showTimeSelect':false,
    })
  },
  clickOverlay(){
    this.setData({
      selectTime:{
        showDateSelect:false,
        showTimeSelect:false,
      }
    })
  },
  popTimeSelect(){
    this.setData({
      'selectTime.showDateSelect':true
    })
  },
  buyNow(){
    
  },
});
  