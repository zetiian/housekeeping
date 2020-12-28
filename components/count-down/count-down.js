import pageUtils from '../../libs/page';
Component({
    lifetimes: {
        attached() {
          console.log(this.data.time);
          if (this.data.time > 0) {
            this.setData({
              timeFull: this.data.time,
              timeCopy: this.data.time
            });
            !this.timer && this.startCountDown();
          }
        },
        detached() {
          // 在组件实例被从页面节点树移除时执行
          this.setData({
            stop: true
          })
          this.timer && clearTimeout(this.timer)
        },
    },
    observers: {
      time(v) {
        console.log(v, this.data.timeCopy)
        if (v > 0) {
          this.setData({
            timeFull: this.data.time,
            timeCopy: this.data.time
          });
          this.timer && clearTimeout(this.timer)
          this.startCountDown();
        } else if (this.data.timeCopy === null) {
          this.setData({
            timeFull: v,
            timeCopy: v
          });
          this.triggerEvent('finish');
        }
      }
    },
    /**
     * 组件的属性列表
     */
    properties: {
      isOrder: {
        type: Boolean,
        value: false,
      },
      hasArrow: {
        type: Boolean,
        value: false,
      },
      type: {
        type: String,
        value: '',
      },
      time:{
        type: Number,
        value: null
      },
      beforeText: {
        type: String,
        value: ''
      },
      lastText: {
        type: String,
        value: ''
      },
      color: {
        type: String,
        value: ''
      }
    },

    /**
     * 组件的初始数据
     */
    data: {
      timeObj: {},
      timeCopy: null,
      stop: false
    },
    timer: null,
    /**
     * 组件的方法列表
     */
    methods: {
      buttonClick(ev) {
        this.triggerEvent('clicked')
      },
      startCountDown() {
        if (this.data.stop) {
          return;
        }
        if (this.data.timeCopy > 0) {
          this.timer = setTimeout(_ => {
            this.startCountDown();
          }, 1000)
        } else {
          this.triggerEvent('finish');
        }
        this.setData({
          timeObj: pageUtils.secondsToDHMS(this.data.timeCopy),
          timeCopy: this.data.timeCopy - 1
        });
      }
    }
})
