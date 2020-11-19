// var upsertAddressList = require("../../../../api/address").upsertAddressList;
const app = getApp();
const API = require('../../../api/interface.js')
import localStorage from "../../../libs/localStorage";
Page({
  data: {
    isIPX: app.globalData.isIPX,
    title: "编辑地址",
 
    disabled:true,

    addressId:'',
    userName:'',
    phone:'',
    address:'',
    isDefault:true,
   
  },

  onLoad: function(options) {
    
    if (options.params !== undefined) {
      var _data = JSON.parse(decodeURIComponent(options.params));
      console.log(112,_data)
      this.setData({
        ["addressId"]: _data.addressId,
        ["phone"]: _data.phone || "",
        ["userName"]: _data.userName || "",
        ["address"]: _data.address || "",
        ["isDefault"]: _data.isDefault==="1",
      });
      // 加载地址数据
    } else {
      this.setData({
        title: "新增地址"
      });
    }
    this.updateDisabled();
  },
  onClickIcon(){
   wx.navigateTo({
     url:'../add/add'
   });
     
      
  },
  fmtAreaData: function(data) {
    var ret = [];
    if (data.provinceId) {
      ret[0] = {
        nodeCode: data.provinceId,
        nodeName: data.provinceName
      };
      if (data.cityId) {
        ret[1] = {
          nodeCode: data.cityId,
          nodeName: data.cityName
        };
        if (data.districtId) {
          ret[2] = {
            nodeCode: data.districtId,
            nodeName: data.districtName
          };
          if (data.streetId) {
            ret[3] = {
              nodeCode: data.streetId,
              nodeName: data.streetName
            };
          }
        }
      }
    }
    console.log(ret);
    return ret;
  },
  switchTap(){
    this.setData({
      'isDefault':!this.data.isDefault
    })
  },
  onShow: function(options) {
    // 获取url参数
  },
  save: function() {
    let userInfo =   localStorage.get().userInfo
    let form = this.data
    console.log(form)
    form.isDefault=form.isDefault?'1':'0'
    let data = {
      customerId:userInfo.customerId,
      mapType:'01',
      longitude:'115.375512',
      latitude:'22.767004',
      isDefault:form.isDefault,
      address:form.address,
      phone:form.phone,
      userName:form.userName,
      addressId:form.addressId,
    }
    if(data.addressId){
      API.serverAddressModify({
        ...data
      }).then(res=>{
        if(res.respCode==="000000"){
            wx.showToast({ title: '保存成功', image: '', duration: 1500, });
            setTimeout(() => {
              wx.navigateBack({ delta: 1 });
            }, 2000);
        }else{
          wx.$showToast('填写的数据有问题')
        }
      })
    }else{
      API.serverAddressAdd({
        ...data
      }).then(res=>{
        if(res.respCode==="000000"){
            wx.showToast({ title: '保存成功', image: '', duration: 1500, });
            setTimeout(() => {
              wx.navigateBack({ delta: 1 });
            }, 2000);
        }else{
          wx.$showToast('填写的数据有问题')
        }
      })
    }
   
  
  },
  nameInput: function(e) {
    this.setData({
      ["form.userName"]: e.detail.value
    });
    this.updateDisabled();
  },
  mobileInput: function(e) {
    this.setData({
      ["form.mobile"]: e.detail.value
    });
    this.updateDisabled();
  },
  detailInput: function(e) {
    this.setData({
      ["form.detail"]: e.detail.value
    });
    this.updateDisabled();
  },
  defaultChange: function() {
    this.setData({
      ["form.useDefault"]: !this.data.form.useDefault
    });
    this.updateDisabled();
  },
  areaFocus: function() {
    this.setData({
      showCascader: true
    });
  },
  cascaderChange: function(e) {
    console.log(e.detail.options);
    this.setData({
      curAreaData: e.detail.options,
      ["form.area"]: e.detail.options
        .map(item => {
          return item.nodeName;
        })
        .join("")
    });
    this.updateDisabled();
  },
  cascaderClose: function() {
    this.setData({
      showCascader: false
    });
  },

  updateDisabled: function() {
    var disabled = true;
    if (this.data.form) {
      var form = this.data.form;
      if (form.userName && form.mobile && form.area && form.detail) {
        disabled = false;
      }
    }
    this.setData({
      disabled: disabled
    });
  },
  // 提交前的输入验证，返回true才能继续提交
  validInput: function() {
    var form = this.data.form;
    // userName
    if (form.userName.length > 16) {
      wx.showModal({
        title: "提示",
        content: "收货人不能超过16个字",
        showCancel: false,
        cancelColor: "#181A24", //取消文字的颜色
        confirmColor: "#2CCCD3" //确定文字的颜色
      });
      return;
    }
    if (form.mobile.length > 11) {
      wx.showModal({
        title: "提示",
        content: "手机号不能超过11位",
        showCancel: false,
        cancelColor: "#181A24", //取消文字的颜色
        confirmColor: "#2CCCD3" //确定文字的颜色
      });
      return;
    }
    if (form.detail.length > 50) {
      wx.showModal({
        title: "提示",
        content: "详细地址不能超过50个字",
        showCancel: false,
        cancelColor: "#181A24", //取消文字的颜色
        confirmColor: "#2CCCD3" //确定文字的颜色
      });
      return;
    }
    return true;
  }
});
