Component({
    

    lifetimes: {
        attached() {
          // 在组件实例进入页面节点树时执行
        },
        detached() {
          // 在组件实例被从页面节点树移除时执行
        },
    },
    /**
     * 组件的属性列表
     */
    properties: {
        files:{
          type:Array,
          value:[]
        },
        canVideo:{
            type:Boolean,
            value:false
        },
        max:{
            type:Number,
            value:9
        }
    },
    

    /**
     * 组件的初始数据
     */
    data: {
      files:[]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        updateFiles:function(arr){
            console.log('updateFiles')
            this.setData({
                files:arr
            });
            this.triggerEvent('change', {files:this.data.files})

        },
        chooseFile: function () {
            console.log(this);
            if(this.data.canVideo){
                wx.showActionSheet({
                    itemList: [ '照片' ],
                    success: res => {
                        if (res.tapIndex === 0) {
                            this.addImage()
                        } else if (res.tapIndex === 1) {
                            this.addVideo()
                        }
                    }
                })
            }else{
                this.addImage()
            }
            
        },
        addVideo: function () {
            wx.chooseVideo({
                count:this.data.max - this.data.files.length,
                success: res => {
                    const tempFilesSize = res.size
                    if (tempFilesSize <= 25000000) {
                        let tempData = this.data.files
                        tempData.push({
                            type: 'video',
                            src: res
                        })
                        this.updateFiles(tempData)
                        // this.setData({
                        //     files: tempData
                        // })
                    } else {
                        wx.showToast({
                            title:'上传视频不能大于25M!',
                            icon:'none'
                        })
                    }
                }
            })
        },
        addImage: function () {
            wx.chooseImage({
                count:this.data.max - this.data.files.length,
                success: res => {
                    const tempFilesSize = res.tempFiles[0].size
                    if (tempFilesSize <= 5000000) {
                        let tempData = this.data.files
                        res.tempFiles.forEach((item, index) => {
                            tempData.push({
                                type: 'image',
                                src: item
                            })
                        })
                        this.updateFiles(tempData)
                        // this.setData({
                        //     files: tempData
                        // })
                    } else {
                        wx.showToast({
                            title:'上传图片不能大于5M!',
                            icon:'none'
                        })
                    }
                }
            })
        },
        removeImage: function (event) {
            let tempData = this.data.files
            console.log(event.currentTarget.dataset)
            tempData.splice(event.currentTarget.dataset.index, 1)
            this.updateFiles(tempData)
            // this.setData({
            //     files: tempData
            // })
        },
    
        previewImage: function (event) {
            let tempData = []
            let tempIndex = 0
            this.data.files.forEach((item, index) => {
                if (item.type === 'image') {
                    tempData.push(item.src.path)
                    if (event.currentTarget.dataset.index === index) {
                        tempIndex = tempData.length - 1
                    }
                }
            })
            wx.previewImage({
                urls: tempData,
                current: tempData[tempIndex]
            })
        },
    
        previewFile: function (event) {
            if (event.currentTarget.dataset.type === 'image') {
                this.previewImage(event)
            } else if (event.currentTarget.dataset.type === 'video') {
                this.videoContext = null
                this.videoContext = wx.createVideoContext(`video-${event.currentTarget.dataset.index}`)
                this.videoContext.requestFullScreen({
                    direction: 0
                })
                this.videoContext.play()
            }
        },
    
        fullscreenChange: function (event) {
            if (!event.detail.fullScreen) {
                this.setData({
                    fullscreen: false
                })
                this.videoContext.stop()
            } else {
                this.setData({
                    fullscreen: true
                })
            }
        },
    
        closeVideo: function () {
            this.setData({
                video: ''
            })
        },

        clear:function(){
            this.setData({
                files:[]
            })
        }


    }
})
