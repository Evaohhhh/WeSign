//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    if(wx.getStorageSync('number') == null){
      wx.redirectTo({
        url: './pages/login/login',
      })
    }
    else{
      var number=wx.getStorageSync('number')
      
      var that = this;
      wx.request({
        url: 'http://localhost:8080/WEBPRO_18/xcx_manage',
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          number:number,
        },
        success: function (res) {
          console.log(res)
          wx.setStorageSync('uid', res.data[0].UID);
          wx.setStorageSync('uname', res.data[0].UNAME);
          if(res.data[0].UIDENTITY == '2'){
            wx.setStorageSync('isManager', 2)
          }
          else{
            wx.setStorageSync('isManager', 1)
          }
        },
        fail: function (res) {
          wx.showModal({
            content:'连接数据库失败'
          })
          console.log("fail to connect");
        }
      })
    }
    
    
  },
  globalData: {
    userInfo: null,
  }
})