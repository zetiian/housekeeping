import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
const API = require('../../api/interface.js')
var checkLogin = require("../../libs/checkLogin").checkLogin;
import localStorage from "../../libs/localStorage";

Page({
  data: {
    isIPX: app.globalData.isIPX,
    list:[ ]
  },
  //options(Object)
  onLoad: function(options) {
    wx.hideShareMenu();
    checkLogin(_=>{
      let userInfo =   localStorage.get().userInfo
      console.log(2222,userInfo);
      API.serverAddressList({
        customerId:userInfo.customerId
      }).then(res=>{
        console.log('地址列表',res);
        this.setData({list:res.resultList})
      })
    },_=>{
      wx.switchTab({
        url: '/pages/index/index',
      });
        
    })
   
  },
  defaultClick(){
    wx.showToast({ title: '设置成功', });

  },
  removeClick(){
    wx.showToast({ title: '删除成功', });
  },
  onShow: function() {
    
  },
  addressClick(e){
    let item = e.currentTarget.dataset.item
    wx.showToast({ title: `已选择地址：${JSON.stringify(item)}`,icon:'none', });
    setTimeout(() => {
      wx.navigateBack({ delta: 1 });
    }, 2000);
      
  },
  toEdit(e){
    let item = e.currentTarget.dataset.item
    let params = encodeURIComponent(JSON.stringify(item))
    wx.navigateTo({
      url: './edit/edit?params='+params,
    });
  },
  toCreate(){
    let item = { phone:'', name:'', second:'', detailAddress:'', isDefault:false, }
    let params = encodeURIComponent(JSON.stringify(item))
    wx.navigateTo({
      url: './edit/edit',
    });
  },
});
  