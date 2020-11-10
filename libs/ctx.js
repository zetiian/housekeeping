var getSetting = require("./getSetting").getSetting;
const getCtx = (
  selector,
  ctx = getCurrentPages()[getCurrentPages().length - 1]
) => {
  const componentCtx = ctx.selectComponent(selector);
  if (!componentCtx) {
    console.error(`在当前页面没有找到组件${selector},需要在当前页面引入组件的wxml代码并使用正确的selector`);
    // throw new Error(
    //   `在当前页面没有找到组件${selector},需要在当前页面引入组件的wxml代码并使用正确的selector`
    // );
  }

  return componentCtx;
};
/**
 * 保存图片到本地
 * @param {*} imgUrl
 * @param {*} mode
 */
export const saveImageToPhotosAlbum = function(imgUrl, mode, success, error) {
  var t = mode;
  
  if (!mode || mode == "post") t = "图片已保存到手机";
  if (mode == "quan") t = "图片已保存到手机，请到朋友圈分享";
  getSetting({
    key: "writePhotosAlbum",
    txt: "保存到相册",
    onSuccess: res => {
      wx.saveImageToPhotosAlbum({
        filePath: imgUrl,
        success: res => {
          if (typeof mode === 'function') {
            mode();
          } else {
            wx.showToast({
              title: t,
              icon: "none",
              duration: 3000
            });
          }
          typeof success === "function" && success(res);
          //   drawing = false
        },
        fail: err => {
          typeof error === "function" && error(err);
          wx.showToast({
            title: "保存相册失败",
            icon: "none",
            duration: 2000
          });
          //   drawing = false
        }
      });
    },
    onError: res => {
      typeof error === "function" && error(res);
      wx.showToast({
        title: "保存相册失败",
        icon: "none",
        duration: 2000
      });
    }
  });
};
/**
 * 获取图片数组的本地地址
 * @param {*} images
 */
export const getImagesLocalAddress = function(images, showInfo) {
  if (!images || !images.length) return;
  return Promise.all(
    images.map(v => {
      return new Promise((resolve, reject) => {
        wx.getImageInfo({
          src: v,
          success: res => {
            resolve(showInfo ? res : res.path);
          },
          fail: err => {
            reject(err);
          }
        });
      });
    })
  );
};
/**
 * 绘制圆角矩形
 * @param {*} x
 * @param {*} y
 * @param {*} w
 * @param {*} h
 * @param {*} r
 * @param {*} ctx
 */
export const drawRadiusRect = function(ctx, x, y, w, h, r) {
  if (typeof r === "number") {
    let br = r;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + br, y); // 移动到左上角的点
    ctx.lineTo(x + w - br, y); // 画上边的线
    ctx.arcTo(x + w, y, x + w, y + br, br); // 画右上角的弧
    ctx.lineTo(x + w, y + h - br); // 画右边的线
    ctx.arcTo(x + w, y + h, x + w - br, y + h, br); // 画右下角的弧
    ctx.lineTo(x + br, y + h); // 画下边的线
    ctx.arcTo(x, y + h, x, y + h - br, br); // 画左下角的弧
    ctx.lineTo(x, y + br); // 画左边的线
    ctx.arcTo(x, y, x + br, y, br); // 画左上的弧
  } else if (typeof r === "object") {
    let lt = r.lt || 0;
    let lb = r.lb || 0;
    let rt = r.rt || 0;
    let rb = r.rb || 0;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + lt, y); // 移动到左上角的点
    ctx.lineTo(x + w - rt, y); // 画上边的线
    rt && ctx.arcTo(x + w, y, x + w, y + rt, rt); // 画右上角的弧
    ctx.lineTo(x + w, y + h - rb); // 画右边的线
    rb && ctx.arcTo(x + w, y + h, x + w - rb, y + h, rb); // 画右下角的弧
    ctx.lineTo(x + lb, y + h); // 画下边的线
    lb && ctx.arcTo(x, y + h, x, y + h - lb, lb); // 画左下角的弧
    ctx.lineTo(x, y + lt); // 画左边的线
    lt && ctx.arcTo(x, y, x + lt, y, lt); // 画左上的弧
  }
  ctx.closePath();
};
/**
 * 剪裁图片
 * @param {} imageInfo
 * @param {*} x
 * @param {*} y
 * @param {*} width
 * @param {*} height
 */
export const clipImage = function(ctx, imageInfo, x, y, width, height) {
  try {
    let mainWidth, mainHeight, mainX, mainY;
    let divisionW = width / imageInfo.width;
    let divisionH = height / imageInfo.height;
    switch (true) {
      case divisionW > divisionH:
        mainWidth = imageInfo.width;
        mainHeight = imageInfo.width / (width / height);
        mainX = 0;
        mainY = Math.max((imageInfo.height - mainHeight) / 2, 0);
        break;
      case divisionW < divisionH:
        mainWidth = (width / height) * imageInfo.height;
        mainHeight = imageInfo.height;
        mainX = Math.max((imageInfo.width - mainWidth) / 2, 0);
        mainY = 0;
        break;
      default:
        mainWidth = imageInfo.width;
        mainHeight = imageInfo.height;
        mainX = 0;
        mainY = 0;
        break;
    }

    ctx.drawImage(
      imageInfo.path,
      mainX + 1,
      mainY + 1,
      Math.floor(mainWidth) - 4,
      Math.floor(mainHeight) - 4,
      x,
      y,
      width,
      height
    );
  } catch (error) {
    console.log(error);
  }
};
/**
 * 绘制
 ** @param {*} ctx
 * @param {} path
 * @param {*} x
 * @param {*} y
 * @param {*} w
 * @param {*} h
 * @param {*} r
 */
export const drawRadiusImage = function(ctx, path, x, y, w, h, r, render) {
  drawRadiusRect(ctx, x, y, w, h, r);
  ctx.setFillStyle("white");
  ctx.fill()
  ctx.clip();
  typeof render === "function" ? render() : ctx.drawImage(path, x, y, w, h); // 主图
};
/**
 * 字符串按照宽度拆成数组
 * @param {string} text
 * @param {number} width
 */
export const textToLineArr = function(ctx, text, width) {
  const textArr = text.split(""); //字符串分割为数组
  let lineArr = [];
  let last = textArr.reduce((pre, now) => {
    //按照宽度拆成数组
    let currentText = pre + now;
    if (now === '\n') {
      lineArr.push(pre);
      return ''
    }
    if (now === '<') {
      lineArr.push(pre);
      return '<'
    }
    if (ctx.measureText(currentText).width >= width) {
      lineArr.push(pre);
      return now;
    } 
    return currentText;
  }, "");
  lineArr.push(last);
  return lineArr;
};
/**
 * 文字自动换行
 * @param {*} ctx
 * @param {string} text
 * @param {*} x
 * @param {*} y
 * @param {*} width
 * @param {*} lineHeight
 * @param {*} param5

 */
export const canvasTextAutoLine = function(
  ctx,
  text,
  x,
  y,
  width,
  lineHeight,
  { maxLine, blod, indent=0,color }
) {
  if (!text) return;
  if (indent) {
    text = text[0].repeat(indent) + text;
  }
  let lineArr = typeof text === "string" ? textToLineArr(ctx, text, width) : text ;
  console.log(lineArr);
  let len = maxLine ? Math.min(lineArr.length, maxLine) : lineArr.length;
  if (blod) {
    ctx.font = `normal bold ${blod}px PingFangSC-Regular`;
  }
  for (let i = 0; i < len; i++) {
    let text = lineArr[i];
    let nowX = x;
    let nowY = y + lineHeight * i;
    let textObj = parserRechText(nowX, nowY, text);
    if (indent && i === 0) {
      textObj.toIndentText(indent);
    }
    console.log(textObj);
    if (
      maxLine &&
      i >= maxLine - 1 &&
      lineArr.length > maxLine - 1 &&
      ctx.measureText(textObj.content).width >= width - 5
    ) {
      if (textObj instanceof TextList) {
        let last = textObj.content[textObj.content.length-1];
        last.content = last.content.replace(/.{1,2}$/g, "...");
      } else {
        textObj.content = textObj.content.replace(/..$/g, "...");
      }
    }
    renderText(ctx, textObj, {color});
  }
  if (blod) {
    ctx.font = `normal 300 ${blod}px PingFangSC-Regular`;
  }
};
class Text {
  x = 0;
  y = 0;
  content = '';
  constructor(x, y, content) {
    this.x = x;
    this.y = y;
    this.content = content;
  }
  toIndentText() {
    let indentText = this.content.substr(0, indent);
    let indentWidth = ctx.measureText(indentText).width;
    this.x += indentWidth;
    this.content = this.content.slice(indent);
    return this;
  }
  render(ctx, options) {
    ctx.setFillStyle(this.color||options.color);
    ctx.fillText(this.content, this.x, this.y);
  }
}
function parserRechText(x, y, text) {
  if (text.includes('<')) {
    let newText = text.replace(/(<[^<]+>)/g,'|$1|');
    let textArr = newText.split('|').filter(v => !!v);
    return new TextList(x, y, textArr);
  } else {
    return new Text(x, y, text);
  }
}
class TextList {
  x = 0;
  y = 0;
  content = [];
  constructor(x, y, tagText) {
    this.x = x;
    this.y = y;
    this.content = tagText.map(v => this.parserText(v));
  };
  parserText(text) {
    if (text.includes('<')) {
      let color = this.parserColor(text);
      let content = this.parserContent(text);
      let textObj = new Text(this.x, this.y, content);
      textObj.color = color;
      return textObj;
    }
    return new Text(this.x,this.y,text); 
  }
  toIndentText(indent) {
    let first = this.content[0];
    let last = this.content[this.content.length-1];
    let indentText = first.content.substr(0, indent);
    let indentWidth = ctx.measureText(indentText).width;
    this.content.forEach(v => v.x+=indentWidth);
    last.content = last.content.slice(indent);
  };
  parserContent(text) {
    return text.match(/<[^<]+;(.+)>/)[1];
  }
  parserColor(text) {
    console.log(text);
    console.log(text.match(/<([^<]+);/)[1]);
    return text.match(/<([^<]+);/)[1];
  }
  render(ctx, options) {
    let startW = 0;
    this.content.forEach(v => {
      v.x = v.x+startW;
      startW+=ctx.measureText(v.content).width;
      v.render(ctx, options);
    });
  }
}
function renderText(ctx, textObj = {x:0,y:0,text:''}, options) {
  textObj.render(ctx, options);
}
/**
 * 绘图
 */

export default getCtx;
