let fun_aes = require("../utils/aes.js"); //引用AES源码js
const timeTool = require("../utils/common.js").timeTool;
const util = require("../utils/util.js");
const API = require("../api/interface.js");

import localStorage from "../libs/localStorage";
var userInfo = {},
    websockInterval = null,
    isStop = null,
    webSockKey = '1234567891234567',
    localSocket = null;
// *
// 默认一次
// *

function initSocket() {
    return new Promise((resolve, reject) => {
        if (localSocket && (localSocket.readyState == 2 || localSocket.readyState == 1)) {
            return
        }
        //websocket暂时关闭
        // return false
        clearInterval(websockInterval)
        websockInterval = null
        webSockKey = '1234567891234567';
        localSocket = wx.connectSocket({
            url: 'wss://sjtest.gz-sanjie.com'
        })
        localSocket.onOpen(function (res) {
            setTimeout(() => { //连接成功300毫秒后去签到
                localSocket.send({
                    data: getSignKey()
                })
            }, 300)
        })
        localSocket.onError(function (res) {
            console.error('readyState=' + localSocket.readyState)
            reject('连接出现错误')
        })
        localSocket.onClose(function (res) {
            // console.log(777, 'WebSocket连接已关闭！readyState=' + localSocket.readyState, res)
            //websocket暂时注释消息

        })
        localSocket.onMessage(function (res) {
           
            handleData(res.data).then(e => {
                // console.log(888, e);
                //    e = {
                //       accountNo: "2020091019316416",
                //             balance: 200,
                //             busPlate: "",
                //             cardNo: "",
                //             lineName: "",
                //             orderId: "20200910193621171145699",
                //             state: "1",
                //             txnAmt: 100,
                //             txnTime: "20200910193621",
                //             txnType: "02",
                //     }
                //  e = {
                //     accountNo: "2019111209459930",
                //     balance: 4799,
                //     busPlate: "00012345",
                //     cardNo: "03204870900000000222",
                //     lineName: "2007路",
                //     orderId: "030100001911515580178271",
                //     payTime: "20191115155949",
                //     state: "1",
                //     txnAmt: 200,
                //     txnTime: "20191115155801",
                //     txnType: "01",
                //     discountAmt: 0,
                // }
               
                if (e && e.orderId) {
                    resolve(e)
                    setTimeout(() => {
                        wx.closeSocket()
                    }, 200);
                } else {
                    setWebsockInterval()

                }
            }).catch(r => {
                reject(r)
            })
        });
    })


}
function closeWS(){
    isStop = true
    console.log(456,isStop);
    
    // initSocket(isStop)
}
function handleData(str) {
    return new Promise((resolve, reject) => {
        console.log('接收到的 websocket 消息', str);
        if (str.indexOf("ORDER") == 0) {
            //消息为订单推送
            let data = JSON.parse(Decrypt(str.split(" ")[1]));
            console.log(4444,'处理的消息', data)

            // if (data.txnType === "01") { //订单为乘车订单
            //     data.typeName = '乘车消费'
            // } else if (data.txnType === "02") { //充值
            //     data.typeName = '充值'
            // }
            resolve(data)
        } else if (str.indexOf("enc_Key") >= 0) {
            //该消息为秘钥消息
            webSockKey = Decrypt(JSON.parse(str).enc_Key);
            // console.log(8888, '签到秘钥', webSockKey)
            resolve(webSockKey)

        } else if(str.indexOf("无此服务") >= 0) {
            // reject('无此服务')
        }else{
            // reject('未知消息类型')
        }
    })
}


function getSignKey() {
    userInfo = localStorage.get().userInfo
    let param = {
        customerId: userInfo.customerId,
        timestamp: timeTool.getTimestamp(),
    }
    let str = 'PUSH' + " " + (Encrypt(JSON.stringify(param)));
    return str;
}

function Encrypt(word) {
    //加密方法
    var key = fun_aes.CryptoJS.enc.Utf8.parse(webSockKey);
    var encrypted = fun_aes.CryptoJS.AES.encrypt(word, key, {
        mode: fun_aes.CryptoJS.mode.ECB,
        padding: fun_aes.CryptoJS.pad.Pkcs7
    });
    return fun_aes.CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

function Decrypt(word) {
    //解密方法
    var key = fun_aes.CryptoJS.enc.Utf8.parse(webSockKey);
    var encryptedHexStr = word;
    var decrypt = fun_aes.CryptoJS.AES.decrypt(encryptedHexStr, key, {
        mode: fun_aes.CryptoJS.mode.ECB,
        padding: fun_aes.CryptoJS.pad.Pkcs7
    });
    return fun_aes.CryptoJS.enc.Utf8.stringify(decrypt);
}
//心跳设置
function setWebsockInterval() {
    websockInterval = setInterval(function () {
        console.log(11, 'Socket 状态', localSocket.readyState)
        if (localSocket.readyState === 1) { //正常连接中保持心跳
            localSocket.send({
                data: 'ping'
            });
        } 
    }, 1000)
}

exports.initSocket = initSocket
exports.closeWS = closeWS