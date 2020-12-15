
// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:wx.getStorageSync('userInfo'),
    number:wx.getStorageSync('number'),
    isManager: wx.getStorageSync('isManager'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        if(res.data[0].UIDENTITY == '2'){
          wx.setStorageSync('isManager', 2)
          that.data.isManager=true
        }
        else{
          wx.setStorageSync('isManager', 1)
          that.data.isManager=false
        }
      },
      fail: function (res) {
        wx.showModal({
          content:'连接数据库失败'
        })
        console.log("fail to connect");
      }
    })
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
        if(res.data[0].UIDENTITY == '2'){
          wx.setStorageSync('isManager', 2)
          that.data.isManager=true
        }
        else{
          wx.setStorageSync('isManager', 1)
          that.data.isManager=false
        }
      },
      fail: function (res) {
        wx.showModal({
          content:'连接数据库失败'
        })
        console.log("fail to connect");
      }
    })
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

  }
})