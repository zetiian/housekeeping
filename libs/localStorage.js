var baseConfig = require("../config").baseConfig
var checkLogin = require('../libs/checkLogin').checkLogin
var app = getApp();
const API = require('../api/interface.js')
var localStore = {
    get: function () {
        var _userInfo = wx.getStorageSync(`local_${baseConfig.baseVersion}`);
        var ret = _userInfo || {};
        return ret;
    },
    set: function (params) {
        var obj = localStore.get() || {};
        Object.keys(params).forEach(key => {
            obj[key] = params[key];
        })
        wx.setStorageSync(`local_${baseConfig.baseVersion}`, obj);
    },
    delete: function (key) {
        var obj = localStore.get() || {};
        if (obj[key]) {
            delete obj[key];
            wx.setStorageSync(`local_${baseConfig.baseVersion}`, obj);
        }
    },
    clear: function () {
        wx.removeStorageSync(`local_${baseConfig.baseVersion}`)
    },

}


export default localStore;