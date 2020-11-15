// var upsertAddressList = require("../../../../api/address").upsertAddressList;
const app = getApp();
Page({
  data: {
    isIPX: app.globalData.isIPX,
    title: "编辑地址",
    disabled:true,
    form: {
      id:'',
      name:'',
      phone:'',
      second:'',
      detailAddress:'',
      isDefault:false,
    },
   
  },

  onLoad: function(options) {
   
    if (options.params !== undefined) {
      var _data = JSON.parse(decodeURIComponent(options.params));
      console.log(112,_data)
      this.setData({
        ["form.id"]: _data.id,
        ["form.phone"]: _data.phone || "",
        ["form.name"]: _data.name || "",
        ["form.second"]: _data.second || "",
        ["form.detailAddress"]: _data.detailAddress || "",
        ["form.isDefault"]: _data.isDefault,
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
    wx.showToast({
      title: '前往地址选择器，后续完善',
      icon: 'none',
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

  onShow: function(options) {
    // 获取url参数
  },
  save: function() {
    wx.showToast({
      title: '保存成功',
      image: '',
      duration: 1500,
    });
    setTimeout(() => {
      wx.navigateBack({ delta: 1 });
    }, 2000);

    return
    console.log(this.data.form);
    if (!this.validInput()) return;
    var curAreaData = this.data.curAreaData;
    var obj = {};
    obj.receiverName = this.data.form.name;
    obj.receiverMobileNo = this.data.form.mobile;
    obj.detailAddress = this.data.form.detail;
    obj.defaultAddress = this.data.form.useDefault ? 0 : 1;

    if (curAreaData[0]) {
      obj.provinceId = curAreaData[0].nodeCode;
      obj.provinceName = curAreaData[0].nodeName;
    }
    if (curAreaData[1]) {
      obj.cityId = curAreaData[1].nodeCode;
      obj.cityName = curAreaData[1].nodeName;
    }
    if (curAreaData[2]) {
      obj.districtId = curAreaData[2].nodeCode;
      obj.districtName = curAreaData[2].nodeName;
    }
    if (curAreaData[3]) {
      obj.streetId = curAreaData[3].nodeCode;
      obj.streetName = curAreaData[3].nodeName;
    }
    // 如果有id是修改
    if (this.data.id) {
      obj.id = this.data.id;
    }
    if (!obj.provinceId || !obj.cityId) {
      wx.showModal({
        title: "温馨提示",
        content: "地区错误，请重新选择",
        showCancel: false
      });
      return;
    }
    upsertAddressList({
      data: obj,
      success: function(res) {
        console.log(res, "666");
        // 返回地址列表
        if (res.code === 0) {
          var pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          var prevPage = pages[pages.length - 2];
          if (prevPage && prevPage.route.match(/^pages\/shop-package\/address\/list\/list/)) {
            wx.navigateBack({
              delta: 1,fail:err=>{ wx.reLaunch({ url: "/pages/index/index" }); },
            });
          } else {
            wx.navigateTo({
              url: "/pages/shop-package/address/list/list"
            });
          }
          // 再往前一个页面是结算页，如果修改的地址的Id和结算页的地址相同则修改
          var prevPage2 = pages[pages.length - 3];
          if (
            prevPage2 &&
            prevPage2.route.match(/^pages\/shop-package\/checkout\/checkout/)
          ) {
            console.log("同步结算页的地址", prevPage2.data.address, obj);
            var prevAddress = prevPage2.data.address;
            var data = res.data.data || res.data;
            data.first = `${data.receiverName || ""}，${data.receiverMobileNo ||
              ""}`;
            data.second = `${data.provinceName || ""}${data.cityName ||
              ""}${data.districtName || ""}${data.streetName || ""}`;
            console.log(
              ">>>>>>>>>",
              data.first,
              data.second,
              prevAddress,
              this.data.id
            );
            data.isDefault = data.defaultAddress == 1 ? false : true;
            if (prevAddress.id === this.data.id) {
              prevPage2.setData({
                address: data
              });
            }
          }
        }
      }
    });
  },
  nameInput: function(e) {
    this.setData({
      ["form.name"]: e.detail.value
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
      if (form.name && form.mobile && form.area && form.detail) {
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
    // name
    if (form.name.length > 16) {
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
