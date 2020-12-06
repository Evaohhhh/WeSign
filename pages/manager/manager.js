// pages/manager/manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventInfo:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.init();
  },
  init: function(){
	var that = this;
	wx.request({
	  url: 'http://localhost:8080/WEBPRO_18/xcx_get_event',
	  method: 'GET',
	  header: {
	    'content-type': 'application/json' // 默认值
	  },
	  data: {
	  },
	  success: function (res) {
	    console.log(res.data)
	    that.setData({
	      eventInfo:res.data,
	    })
	   
	  },
	  fail: function (res) {
	    wx.showModal({
	      content:'连接数据库失败'
	    })
	    console.log("fail to connect");
	  }
	})
  },
  handleDelete: function(e){
    console.log(e)
    const e_id= e.currentTarget.dataset.id
    const u_id= wx.getStorageSync('uid')
    var that = this;
    wx.request({
      url: 'http://localhost:8080/WEBPRO_18/xcx_del_event',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        e_id:e_id,
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '删除成功',
        })
		that.init();
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