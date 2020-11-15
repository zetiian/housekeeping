import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const app = getApp();


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
    form:{ }
  },
  //options(Object)
  onLoad: function(options) {
    wx.hideShareMenu();
  },
 
  onShow: function() {
  },
  onSelect(e){
    console.log(2345,e.detail);
    this.setData({ 
      showSelect:false,
      'form.serverType':e.detail.type,
      'form.serverName':e.detail.name,
    })
    
  },
  selectType(){
    this.setData({ showSelect:true })
  },
  filesChange(){
    let dataset = e.currentTarget.dataset
    let img = e.detail.files[0]
    let resultUrl = ''
    if(img.src.size>5242880){
      return wx.$showToast('上传图片过大，换张图片试试');
    }
    this.uploadImgFile(img.src.path).then(res=>{
      console.log(777,res);
      resultUrl = res
      
    }).catch(_=>{
     return wx.$showToast('网络不好，重新试试');  
    })
    if(dataset.name==='one'){
      this.data.idCard.push({photoType:'01',photoPath: resultUrl,id:util.randomString(16)})
    }else if(dataset.name==='two'){
      this.data.idCard.push({photoType:'02',photoPath: resultUrl,id:util.randomString(16)})
    }else if(dataset.name==='cert'){
      this.data.idCard.push({photoType:'99',photoPath: resultUrl,id:util.randomString(16)})
    }
  },
});
  