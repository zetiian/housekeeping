//图片懒加载
import pageUtils from '../../libs/page';
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ["classname"],
  options: { styleIsolation: "apply-shared" },
  properties: {
    defaultSrc: {
      //默认显示图片
      type: String,
      value: "https://azure-shop.obs.cn-south-1.myhuaweicloud.com/20191114153817312-find_bg_pgc_logo%403x.png"
    },
    src: {
      type: String,
      observer: "_src"
    },
    styleText: {
      type: String,
      value: ""
    },
    mode: {
      type: String,
      value: "scaleToFill"
    },
    lazyLoad: {
      type: Boolean,
      value: true
    },
    inAni: {
      type: Boolean,
      value: true
    }
  },
  lifetimes: {
    ready: function() {
      if (this.data.lazyLoad) {
        this.setData({
          isReady: true,
          outputSrc: this.data.defaultSrc
        });
        this.observeImg();
      } else {
        this.setData({
          isReady: true,
          isShow: true,
          outputSrc: this.data.src
        });
      }
      this.data.src && this.setHeight();
    },
    attached: function() {},
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      this.clearObserve();
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    outputSrc: "",
    isShow: false,
    height: 0,
    isReady: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _src(newVal, oldVal, changedPath) {
      if (!newVal) return;
      if (this.data.isShow) {
        this.setData({outputSrc:newVal});
      }
      this.data.isReady&&this.setHeight();
    },
    observeImg() {
      this.observerInter = wx.createIntersectionObserver(this);
      this.observerInter.relativeToViewport()
        .observe(".component-base-img", res => {
          let isShow = res.intersectionRatio > 0;
          if (isShow) {
            this.setData({
              isShow,
              outputSrc: this.data.src
            });
            this.clearObserve();
          }
        });
    },
    clearObserve() {
      if (this.observerInter) {
        this.observerInter.disconnect();
        this.observerInter = null;
      }
    },
    getImgSize(success) {
      wx.createSelectorQuery()
        .in(this)
        .select(".component-base-img")
        .boundingClientRect(rect => {
          typeof success === 'function' && success(rect);
        })
        .exec();
    },
    getHeightByWidth(width, success) {
      pageUtils.countImageHeightByPx({
        width,
        src: this.data.src,
        success: height => {
          typeof success === 'function' && success(height);
        }
      })
    },
    setHeight() {
      if (this.data.mode !== 'widthFix') return;
      this.getImgSize(rect => {
        this.getHeightByWidth(rect.width, height => {
          this.setData({
            height
          }, _ => {
            this.triggerEvent("setHeightOver");
          })
        });
      });
    }
  }
});