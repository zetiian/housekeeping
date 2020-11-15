import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
var app = getApp();


//Page Object
Page({
  data: {
    isIPX: app.globalData.isIPX,
    detail:{},
    selectTime:{
      showDateSelect:false,
      showTimeSelect:false,
    },
    message:''
  },
  //options(Object)
  onLoad: function(options) {
    wx.hideShareMenu();
    let detail = {
      orderTime:'2020.09.10 周日 08:00～10:00',
      orderAddress:'香江国际金融中心606室',
      orderName:'清洁服务',
      orderStatus:'派单中',
      status:1,
      phone:'1331212121212',
      user:'Jericho',
    }
    this.setData({detail})
  },
 
  onShow: function() {
    
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
  