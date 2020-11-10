var baseConfig = require("../config").baseConfig

const http = ({
  param = {},
  ...other
} = {}) => {
  let timeStart = Date.now();
  wx.showLoading({ title: '加载中...', mask: true, });
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseConfig.baseUrl+'/api/service',
      data: param,
      header: {
        'content-type': 'application/json' // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
      },
      ...other,
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
const fetch = (param = {}) => {
  return http({
    param,
    method: 'POST'
  })
}
// const getUrl = (url) => {
//   if (url.indexOf('://') == -1) {
//     url = baseConfig.baseUrl + url;
//   }
//   return url
// }

// // get方法
// const _get = (url, param = {}) => {
//   return http({
//     url,
//     param
//   })
// }

// const _put = (url, param = {}) => {
//   return http({
//     url,
//     param,
//     method: 'put'
//   })
// }

// const _delete = (url, param = {}) => {
//   return http({
//     url,
//     param,
//     method: 'delete'
//   })
// }
module.exports = {
  fetch,
  // _get,
  // _put,
  // _delete
}