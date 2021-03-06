import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();
const API = require('../../api/interface.js')
var checkLogin = require("../../libs/checkLogin").checkLogin;
import localStorage from "../../libs/localStorage";
var EventBus = require("../../libs/event");
var userInfo = {}
Page({
  data: {
    isIPX: app.globalData.isIPX,
    list:[ ]
  },
  //options(Object)
  onLoad: function(options) {
    wx.hideShareMenu();
  
   
  },
  defaultClick(e){
    let id = e.currentTarget.dataset.id
    console.log(22,id);
    // wx.showToast({ title: '设置成功', });
    API.serverAddressModify({
      customerId:userInfo.customerId,
      addressId:id,
      isDefault:'1',
    }).then(res=>{
      if(res.respCode==="000000"){
         this.getList()
        wx.showToast({ title: '操作成功',  duration: 1500, });
      }else{
        wx.$showToast('填写的数据有问题')
      }
    })

  },
  removeClick(e){
    API.serverAddressDel()
    let id = e.currentTarget.dataset.id
    API.serverAddressDel({
      customerId:userInfo.customerId,
      addressId:id,
    }).then(res=>{
      if(res.respCode==="000000"){
        this.getList()
        wx.showToast({ title: '删除成功',  duration: 1500, });
      }else{
        wx.$showToast('填写的数据有问题')
      }
    })
  },
  onShow: function() {
    checkLogin(_=>{
      this.getList()
    },_=>{
      wx.$showToast('检测到您未登录')
      setTimeout(()=>{
        wx.switchTab({
          url: '/pages/index/index',
        });
      },1500)
        
    })
  },
  getList(){
     userInfo = localStorage.get().userInfo
      console.log(2222,userInfo);
      API.serverAddressList({
        customerId:userInfo.customerId
      }).then(res=>{
        console.log('地址列表',res);
        this.setData({list:res.resultList})
      })
  },
  addressClick(e){
    let item = e.currentTarget.dataset.item
    EventBus.emit('current-address',item)
    wx.navigateBack({ delta: 1 });
      
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
  