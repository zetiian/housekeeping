exports.getSetting = function(opts){
    if(!opts || !opts.key)throw '参数错误'
    var key = `scope.${opts.key}`
    var onError = opts.onError || function(){}
    var onSuccess = opts.onSuccess || function(){}
    wx.getSetting({
        success(res) {
            // console.log('222',res)
            if (!res.authSetting[key]) {
              wx.authorize({
                scope: key,
                success: onSuccess,
                fail:function(res){
                  wx.showModal({
                      title:'用户未授权',
                      content:`如需正常使用${opts.txt}功能，请按确定并在授权管理中选中"${opts.txt}"，然后按确定。最后再重新进入小程序即可正常使用。`,
                      cancelColor:'#181A24',//取消文字的颜色
                      confirmColor: '#2CCCD3',//确定文字的颜色
                      success:res=>{
                          if(res.confirm){
                                wx.openSetting({
                                    success: function success(res) {
                                        console.log('openSetting success', res);
                                        onSuccess(res)
                                    },
                                    fail:onError
                                });
                          }else{
                            onError()
                          }
                        
                      },
                      fail:onError
                  })
                }
              })
            }else{
                onSuccess()
            }
        },
        fail(res){
            console.log(res)
            onError(res)
        }
    })


}