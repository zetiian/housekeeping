import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';



//Page Object
Page({
  data: {
    detail:{},
    showTimeSelect:true
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
 
  confirm(){
    
  },
  goAddress(){
    wx.navigateTo({ url: '/pages/my-address/my-address', });
      
  },
  popTimeSelect(){
    this.setData({
      showTimeSelect:true
    })
  },
});
  