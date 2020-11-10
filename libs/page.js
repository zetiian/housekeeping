function GacPage(params) {

  return Page(params);
}
exports.GacPage = GacPage;
export default {
  numFormat(num) {
    var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return c;
  },
  GacPage,
  /**
   * 时间戳转字符串
   * @param date
   * @returns {string}
   */
  timestampToStr(date) {
    date = date ? new Date(date) : new Date(); //如果date为13位不需要乘1000
    let Y = date.getFullYear() + "-";
    let M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    let h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    let m =
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":";
    let s =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  },
  /**
   * 时间字符串转换为时间戳
   * @param datetimeStr
   * @returns {Date}
   * @constructor
   */
  strTotimestamp(datetimeStr) {
    let mydateint = Date.parse(datetimeStr); //数值格式的时间
    if (!isNaN(mydateint)) {
      return new Date(mydateint);
    }
    let mydate = new Date(datetimeStr), //字符串格式时间
      monthstr = mydate.getMonth() + 1;
    if (!isNaN(monthstr)) {
      //转化成功
      return mydate;
    } //字符串格式时间转化失败
    let dateParts = datetimeStr.split(" "),
      dateToday = new Date(),
      year = dateToday.getFullYear(),
      month = dateToday.getMonth(),
      day = dateToday.getDate();
    if (dateParts.length >= 1) {
      let dataPart = dateParts[0].split("-"); //yyyy-mm-dd  格式时间
      if (dataPart.length === 1) {
        dataPart = dateParts[0].split("/"); //yyyy/mm/dd格式时间
      }
      if (dataPart.length === 3) {
        year = Math.floor(dataPart[0]);
        month = Math.floor(dataPart[1]) - 1;
        day = Math.floor(dataPart[2]);
      }
    }
    if (dateParts.length === 2) {
      //hh:mm:ss格式时间
      let timePart = dateParts[1].split(":"); //hh:mm:ss格式时间
      if (timePart.length === 3) {
        let hour = Math.floor(timePart[0]),
          minute = Math.floor(timePart[1]),
          second = Math.floor(timePart[2]);
        return new Date(year, month, day, hour, minute, second);
      }
    } else {
      return new Date(year, month, day);
    }
  },
  /**
   * 时间字符串转时间对象
   * @param {*} datetimeStr
   */
  strToTimeObj(datetimeStr) {
    let date = this.strTotimestamp(datetimeStr);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: this.fill0(date.getHours()),
      minutes: this.fill0(date.getMinutes()),
      seconds: this.fill0(date.getSeconds())
    };
  },
  /**
   * 秒转天时分秒
   * @param {} seconds s
   */
  secondsToDHMS(seconds) {
    let num = seconds;
    let s = this.fill0(num % 60);
    num = parseInt(num / 60);
    let m = this.fill0(num % 60);
    num = parseInt(num / 60);
    let h = this.fill0(num % 24);
    
    num = parseInt(num / 24);
    let d = num;
    let ah = this.fill0(h * 1  + d * 24);
    return { d, h, m, s, ah};
  },
  /**
   * 个位补零
   * @param {} number
   */
  fill0(number) {
    return number < 10 ? `0${(number === 0 ? "0" : number) || ""}` : number;
  },
  /**
   * 弹框提示
   * @param {*} msg
   */
  showModal(msg, success) {
    wx.showModal({
      title: "提示",
      content: msg,
      showCancel: false,
      cancelColor: "#181A24", //取消文字的颜色
      confirmColor: "#2CCCD3", //确定文字的颜色
      success(res) {
        if (res.confirm) {
          console.log("用户点击确定");
          typeof success === "function" && success(res);
        }
      }
    });
  },
  /**
   *
   * @param {*} orgWidth
   * @param {*} orgHeight
   * @param {*} src
   */
  countImageHeightByPx({ width, src, success, fail }) {
    if (src) {
      wx.getImageInfo({
        src,
        success: rep => {
          let orgWidth = rep.width;
          let orgHeight = rep.height;
          typeof success === "function" && success(width / (orgWidth/ orgHeight));
        },
        fail: err => {
          typeof fail === "function" && fail(err);
        }
      });
    }
  },
  /**
   * 节流
   * @param {*} fn 
   * @param {*} interval 
   */
  throttle(fn, interval) {
    let _lastTime = null;
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > interval || !_lastTime) {
        fn.call(this, arguments[0]);
        _lastTime = _nowTime
      }
    }
  },
  /**
   * 函数防抖
   * @param fn 需要进行防抖操作的事件函数
   * @param interval 间隔时间
   * @returns {Function}
   */
  debounce(fn, interval) {
    let timer;
    let gapTime = interval || 400; //间隔时间，如果interval不传，则默认1000ms
    return function () {
      clearTimeout(timer);
      let context = this;
      let args = arguments[0]; //保存此处的arguments，因为setTimeout是全局的，arguments无法在回调函数中获取，此处为闭包。
      timer = setTimeout(function () {
        fn.call(context, args); //args是事件处理函数默认事件参数event  call绑定当前page对象
      }, gapTime);
    };
  },
  getImagesHeight(images, {success,fail}) {
    if (!images || !images.length) return;
    let list = images.map(element => {
      return new Promise((resolve,reject) => {
        this.countImageHeightByPx({
          width: 750,
          src: element,
          success: height => {
            resolve({
              height,
              url: element
            });
          },
          fail: err => {
            reject(err);
          }
        });
      })
    });
    Promise.all(list).then(success).catch(fail);
  }
};
