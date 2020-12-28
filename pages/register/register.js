
// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:'',
    name:'',
    code:'',
  },
  numberInput: function(e){
    this.setData({
      number:e.detail.value,
    })
    wx.setStorageSync('number', e.detail.value)
  },
  nameInput: function(e){
    this.setData({
      name:e.detail.value,
    })
  },
  codeInput: function(e){
    this.setData({
      code:e.detail.value,
    })
  },
  handleRegister: function () {
    var that = this.data;
    wx.request({
      url: 'http://localhost:8080/WEBPRO_18/xcx_register',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        number:that.number,
        name:that.name,
        code:that.code,
        u_touxiang:wx.getStorageSync('userInfo').avtarUrl
      },
      success: function (res) {
        console.log("注册成功")
        wx.showToast({
          title: '注册成功',
        })
        wx.redirectTo({
          url: '../login/login',
        })
      },
      fail: function (res) {
        console.log("fail to connect");
      }
    })
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

  }
})