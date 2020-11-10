import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';



//Page Object
Page({
  data: {
    list:[
      {
        id:1,
        phone:'13311111111',
        name:'Jerry',
        second:'广东省 广州市',
        detailAddress:'海珠大厦',
        isDefault:true,
      },
      {
        id:2,
        phone:'1334444444444',
        name:'Tom',
        second:'广东省 深圳市',
        detailAddress:'龙湾一号',
        isDefault:false,
      },
    ]
  },
  //options(Object)
  onLoad: function(options) {
    wx.hideShareMenu();
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
});
  