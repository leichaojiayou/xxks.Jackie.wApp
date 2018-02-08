//app.js

var Bmob = require('utils/bmob.js')
var BmobSocketIo = require('utils/bmobSocketIo.js').BmobSocketIo;

/**
提示：后台数据服务用的第三方服务Bmob，请自行申请。
Bmob.initialize("你的Application ID", "你的REST API Key");
**/
Bmob.initialize("bc072e66512cdb7365146f50ffbe7b5d", "68ec452646d7e4a38adf833c0c4f92a1");

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
        //console.log(res.code)

          Bmob.User.requestOpenId(res.code, {
            success: function (result) {
              getApp().globalData.opendId = result.openid;
              //console.log(getApp().globalData.opendId )
            },
            error: function (error) {
              // Show the error message somewhere
              console.log("Error: " + error.code + " " + error.message);
            }
          })
      }
      }        
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    scores: [],
    opendId:null
  }
})
