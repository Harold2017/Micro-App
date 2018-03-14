//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function(e) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof e == "function" && e(this.globalData.userInfo)
    } else {
      //call login interface
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof e == "function" && e(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
    
  globalData: {
    userInfo: null
  }
})