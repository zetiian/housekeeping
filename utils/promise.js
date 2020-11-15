var baseConfig = require("../config").baseConfig

const http = ({
  param = {},
  url
} = {}) => {
  let timeStart = Date.now();
  wx.showLoading({ title: '加载中...', mask: true, });
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseConfig.baseUrl+url,
      data: param,
      header: {
        'content-type': 'application/json' // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      complete: (res) => {
        wx.hideLoading();
        //  console.log(`耗时${Date.now() - timeStart}`);
        let data = res.data
        if (res.statusCode >= 200 && res.statusCode < 300 && data) {
          if(data.respCode==='000000'){
            resolve(data)
          }else if(['999999','999998','999997','300032','300031','300030','300029','100004'].includes(data.respCode)){
            console.error(`接口调用异常，错误码， ${data.respCode}，参数：${JSON.stringify(param)}`)
            wx.showToast({
              title: data.respMsg,
              icon: 'none',
              duration: 1500,
            
            });
              
          }else{
            resolve(data)
            console.warn(`请求可能失败，错误码，${data.respCode}，返回值：${JSON.stringify(data)}`);
          }
        } else {
          wx.showToast({
            title:res.respMsg,
            icon: 'none',
            image: '',
            duration: 2000,
          });
          reject(res)
          console.error('网络请求异常！',res.respMsg)
        }
      }
    })
  })
}
const fetch = (param = {},url) => {
  return http({ param, url })
}

module.exports = {
  fetch,
  
}