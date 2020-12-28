const app = getApp();
const API = require("../../api/interface.js");
var checkLogin = require("../../libs/checkLogin").checkLogin;
import localStorage from "../../libs/localStorage";
const timeTool = require('../../utils/common.js').timeTool
const util = require('../../utils/util')
var EventBus = require("../../libs/event");
var userInfo = {};

//Page Object
Page({
  data: {
    isIPX: app.globalData.isIPX,
    showSelect:false,
    actions: [
      { name: '保洁服务', type:'01'},
      { name: '保姆', type:'02'},
      { name: '月嫂服务', type:'03' },
      { name: '护工', type:'04' },
    ],
    form:{ },
    address:'',
    certNo:'',
    userName:'',
    serverName:'',
    serverType:'',
    serverYear:'',
    phone:'',
    applyImages:[],
    currentApply:{}
  },
  //options(Object)
  onLoad: function(options) {
    wx.hideShareMenu();
  },
 
  onShow: function() {
    userInfo = localStorage.get().userInfo
    this.getApplyInfo(userInfo)
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
  onSelect(e){
    console.log(2345,e.detail);
    this.setData({ 
      showSelect:false,
      'serverType':e.detail.type,
      'serverName':e.detail.name,
    })
    
  },
  save(){
    let _this = this.data
    let data = {
      customerId:userInfo.customerId,
      serverType:_this.serverType,
      address:_this.address,
      certNo:_this.certNo,
      userName:_this.userName,
      serverYear:_this.serverYear,
      phone:_this.phone,
      applyImages:this.applyImages||[]
    }
    console.log(666,data);
    if(!data.serverType){
      return  wx.$showToast('请选择服务类型')
    }
    if(!data.userName){
      return  wx.$showToast('请填写姓名')
    }
    if(!data.certNo){
      wx.$showToast('请填写身份证')
    }
    if(!data.phone){
      return wx.$showToast('请填写联系地址')
    }
    if(!data.serverYear){
      return  wx.$showToast('请填写从业时间')
    }
    if(!data.applyImages.length){
      return wx.$showToast('请上传图片')
    }
    if(!data.applyImages.filter(el=>el.photoType==='04').length){
     return wx.$showToast('请上传头像')
    }
    API.serverInfoCommit(data).then(res=>{
      if(res.respCode==="000000"){
      console.log(7777,res);
        wx.showToast({
          title: '提交成功',
        });
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/my/my',
          });
        }, 1500);
          
      }else{
        wx.$showToast(res.respMsg)
      }
    })
  },
  selectType(){
    this.setData({ showSelect:true })
  },
  applyImages:[],
  filesChange(e){
    let dataset = e.currentTarget.dataset
    let img = e.detail.files[0]
    if(img.src.size>5242880){
      return wx.$showToast('上传图片过大，换张图片试试');
    }
    this.uploadImgFile(img.src.path).then(res=>{
      console.log(777,res,dataset);
       if(dataset.name==='avatar'){
        this.applyImages.push({photoType:'04',photoPath: res,id:util.randomString(16)})
      }else if(dataset.name==='cert'){
        this.applyImages.push({photoType:'03',photoPath: res,id:util.randomString(16)})
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
          console.log(666,result);
          // result.data
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
  