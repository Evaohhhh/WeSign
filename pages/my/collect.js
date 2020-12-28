// pages/my/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    eventListInfo:[],
    newsListinfo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEvent(),
    this.getNew()
  },

  swichNav: function (e) {
    console.log(e);
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current,
    })
    that.getEvent()
    that.getNew()
  },

  swiperChange: function (e) {
      console.log(e);
      this.setData({
          currentTab: e.detail.current,
      })
  },

  getEvent: function(){
    var that = this//不要漏了这句，很重要
      
    //获取思修活动信息
    wx.request({
      url:`http://localhost:8080/WEBPRO_18/xcx_get_collect`, 
      data: {
        type: 1,
        u_id: wx.getStorageSync('uid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          eventListInfo:res.data,
        });
        console.log(res.data);//回调函数中的携带服务器响应数据
      },
      fail: function (res) {
        console.log("fail to connect");
      }
    })
  },
  getNew: function(){
    var that = this//不要漏了这句，很重要
      
    //获取思修活动信息
    wx.request({
      url:`http://localhost:8080/WEBPRO_18/xcx_get_collect`, 
      data: {
        type: 2,
        u_id: wx.getStorageSync('uid')
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          newsListinfo:res.data,
        });
        console.log(res.data);//回调函数中的携带服务器响应数据
      },
      fail: function (res) {
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
    this.getEvent()
    this.getNew()
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