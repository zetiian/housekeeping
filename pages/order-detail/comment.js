var app = getApp();
const API = require('../../api/interface')
const util = require('../../utils/util')
import localStorage from "../../libs/localStorage";
var EventBus = require("../../libs/event");
var  userInfo  = {}
Page({
  data: {
  
    isIPX:app.globalData.isIPX,
    detail:{},
    star:0,
    remark:''
  },
  onShow(e) {
   
  },
  onLoad() {
    wx.hideShareMenu();
    userInfo = localStorage.get().userInfo
    let detail = localStorage.get().currentDetail
    this.setData({ detail, userInfo})
  },
  choose(e){
    let item = e.currentTarget.dataset.item
    this.setData({currentItem:item})
  },
  starChange(e){
    this.setData({star:e.detail.index+1})
  },
  submit() {
    console.log(11111,this.applyImages);
    let data = {
      customerId:this.data.userInfo.customerId,
      serverOrderId:this.data.detail.serverOrderId,
      serverNo:this.data.detail.serverNo,
      serverRating:this.data.star,
      evalContent:this.data.remark,
      applyImages:this.applyImages||[],
    }
    if(!data.serverRating)return wx.$showToast('给个评分吧')
    console.log(1112,data);
    
    API.serverEval(data).then(res=>{
      wx.showToast({ title: '评价成功' });
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/order/order',
        });
      }, 1000);
    }).catch(err=>{
      console.log(2222,err);
      wx.$showToast(err)
    })

  },
  applyImages:[],
  filesChange(e){
    let dataset = e.currentTarget.dataset
    let img = e.detail.files[0]
    if(img.src.size>5242880){
      return wx.$showToast('上传图片过大，换张图片试试');
    }
    this.uploadImgFile(img.src.path).then(res=>{
       if(dataset.name==='comment'){
        this.applyImages.push({photoType:'05',photoPath: res,id:util.randomString(16)})
      }
    })
   
  },

  uploadImgFile(src){
    return new Promise((res,rej)=>{
      wx.uploadFile({
        url: 'https://mobileqrsmallprog.gz-sanjie.com/uploadImg',
        filePath: src,
        name: 'file',
        success: result=>{
          let remoteUrl = JSON.parse(result.data).url
          res(remoteUrl)
        },
        fail:err=>{
          rej(err)
        }
      })
    })
  
  },
});