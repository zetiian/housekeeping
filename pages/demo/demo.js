import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();


//Page Object
Page({
  data: {
    isIPX: app.globalData.isIPX,
  },
  //options(Object)
  onLoad: function(options) {
    wx.hideShareMenu();
  },
 
  onShow: function() {
    
  },
 
  onClick(){
    Toast('我是提示文案，建议不超过十五字~');
  },
  onClick1(){
    Toast('我是提示文案，建议不超过十五字~');
  },
  onClick2(){
    Toast('我是提示文案，建议不超过十五字~');
  },
  onClick3(){
    Toast('我是提示文案，建议不超过十五字~');
  },
  onClick4(){
    Toast('我是提示文案，建议不超过十五字~');
  },
});
  