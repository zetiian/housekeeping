var app = getApp();
const API = require("../../api/interface");
const util = require("../../utils/util");
import localStorage from "../../libs/localStorage";
var EventBus = require("../../libs/event");
var userInfo = {};
Page({
  data: {
    isIPX: app.globalData.isIPX,
    detail: {},
    number: 1,
    star: 0,
    remark: "",
  },
  onShow(e) {},
  onLoad() {
    wx.hideShareMenu();
    userInfo = localStorage.get().userInfo;
    let detail = localStorage.get().currentDetail;
    this.setData({ detail, userInfo });
  },
  choose(e) {
    let item = e.currentTarget.dataset.item;
    this.setData({ currentItem: item });
  },
  starChange(e) {
    this.setData({ star: e.detail.index + 1 });
  },
  submit() {
    let data = {
      customerId: this.data.userInfo.customerId,
      serverOrderId: this.data.detail.serverOrderId,
      serverNo: this.data.detail.serverNo,
      serverRating: this.data.star,
      evalContent: this.data.remark,
      applyImages:  [],
    };
    if (!data.serverRating) return wx.$showToast("给个评分吧");
    console.log(1112, data);
   let arr = []
   this.toUpLoad.map((img)=>{
    arr.push(this.uploadImgFile(img.src.path))
   })

    Promise.all(arr).then(result=>{
      console.log(1112233,result);
      result.map(src=>{ data.applyImages.push({ photoType: "05", photoPath: src, id: util.randomString(16) }) })
      API.serverEval(data)
      .then((res) => {
        wx.showToast({ title: "评价成功" });
        setTimeout(() => {
          wx.reLaunch({
            url: "/pages/order/order",
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(2222, err);
        wx.$showToast(err);
      });
    })
  
  },
  toUpLoad:[],
  filesChange(e) {
    this.toUpLoad = e.detail.files
  },


  uploadImgFile(src) {
    return new Promise((res, rej) => {
      wx.uploadFile({
        url: "https://mobileqrsmallprog.gz-sanjie.com/uploadImg",
        filePath: src,
        name: "file",
        success: (result) => {
          let remoteUrl = JSON.parse(result.data).url;
          res(remoteUrl);
        },
        fail: (err) => {
          rej(err);
        },
      });
    });
  },
});
