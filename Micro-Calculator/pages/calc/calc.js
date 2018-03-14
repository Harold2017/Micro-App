// pages/calc/calc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idback: "back",
    idclear: "clear",
    idt: "toggle",
    idadd: "＋",
    id9: "9",
    id8: "8",
    id7: "7",
    idsub: "－",
    id6: "6",
    id5: "5",
    id4: "4",
    idmul: "×",
    id3: "3",
    id2: "2",
    id1: "1",
    iddiv: "÷",
    id0: "0",
    iddot: ".",
    idequal: "＝",
    screenData: '0',
    operaSymbo: { "＋": "+", "－": "-", "×": "*", "÷": "/", ".": "." },
    lastIsOperaSymbo: false,
    iconType: 'waiting_circle',
    iconColor: 'white',
    arr: [],
    logs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  clickBtn: function(event) {
    var id = event.target.id;
    if (id == this.data.idback) {
      var data = this.data.screenData;
      if (data == "0") {
        return;
      }
      data = data.substring(0, data.length-1);
      if (data=="" || data=="-") {
        data = 0;
      }
      this.setData({"screenData": data});
      this.data.arr.pop();
    } else if (id == this.data.idclear) {
      this.setData({"screenData": "0"});
      this.data.arr.length = 0;
    } else if (id == this.data.idt) {
      var data = this.data.screenData;
      if (data == '0') {
        return;
      }
      var firstWord = data.charAt(0);
      if (data == '-') {
        data = data.substr(1);
        this.data.arr.shift();
      } else {
        data = '-' + data;
        this.data.arr.unshift('-');
      }
      this.setData({"screenData": data});
    } else if (id == this.data.idequal) {
      var data = this.data.screenData;
      if (data == '0') {
        return;
      }
      var lastWord = data.charAt(data.length);
      if (isNaN(lastWord)) {
        return;
      }
      var num = '';
      var lastOperator = '';
      var arr = this.data.arr;
      var optarr = [];
      for(var i in arr) {
        if (isNaN(arr[i]) == false || arr[i] == this.data.iddot || arr[i] == this.data.idt) {
          num += arr[i];
        } else {
          lastOperator = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = '';
        }
      }
      optarr.push(Number(num));
      var result = Number(optarr[0])*1.0;
      console.log(result);
      for(var i=1; i<optarr.length; i++){
        if (isNaN(optarr[i])) {
          if (optarr[1] == this.data.idadd) {
            result += Number(optarr[i+1]);
          } else if (optarr[1] == this.data.idsub) {
            result -= Number(optarr[i+1]);
          } else if (optarr[1] == this.data.idmul) {
            result *= Number(optarr[i+1]);
          } else if (optarr[1] == this.data.iddiv) {
            result /= Number(optarr[i+1]);
          }
        }
      }
      this.data.logs.push(data + '=' + result);
      wx.setStorageSync("calclogs", this.data.logs);

      this.data.logs.push(data + result);
      this.data.arr.length = 0;
      this.data.arr.push(result);
      this.setData({"screenData": result+''});
    } else {
      if (this.data.operaSymbo[id]) {
        if (this.data.lastIsOperaStmbo || this.data.screenData == '0') {
          return;
        }
      }
      var sd = this.data.screenData;
      var data;
      if (sd == 0) {
        data = id;
      } else {
        data = sd + id;
      }
      this.setData({ "screenData": data })
      this.data.arr.push(id);
      if (this.data.operaSymbop[id]) {
        this.setData({ "lastIsOperaSymbo": true });
      } else {
        this.setData({ "lastIsOperaSymbo": false });
      }
    }
  },
  history: function() {
    wx.navigateTo({
      url: '../history/history',
    })
  }
})