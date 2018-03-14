//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Simple Claculator',
    userInfo: {},
    defaultSize: 'default',
    //disabled: 'false',
    iconType: 'info_circle'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toCalc: function() {
    wx.navigateTo({
      url: '../calc/calc',
    })
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    app.getUserInfo(function(userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
