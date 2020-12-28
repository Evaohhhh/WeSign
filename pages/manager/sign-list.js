// pages/manager/sign-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    currentTab: 0,
    listInfo:[],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/WEBPRO_18/xcx_event_order',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        status:that.data.currentTab
      },
      success: function (res) {
        that.setData({
          listInfo:res.data
        })
        console.log(res.data)
      },
      fail: function (res) {
        wx.showModal({
          content:'连接数据库失败'
        })
        console.log("fail to connect");
      }
    })
  },
  
  getSignList: function(stauts){
    var that = this;
    wx.request({
      url: 'http://localhost:8080/WEBPRO_18/xcx_event_order',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        status:stauts
      },
      success: function (res) {
        that.setData({
          listInfo:res.data
        })
        console.log(res.data)
      },
      fail: function (res) {
        wx.showModal({
          content:'连接数据库失败'
        })
        console.log("fail to connect");
      }
    })
  },
  handlePass:function(e){
    var that = this;
    console.log(e.currentTarget.dataset.id)
    wx.showModal({
      content: '请确定要通过报名审核',
      success (res) {
        if (res.confirm) {
          console.log('确定')
          wx.request({
            url: 'http://localhost:8080/WEBPRO_18/xcx_sign_pass',
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              s_id:e.currentTarget.dataset.id
            },
            success: function (res) {
              wx.showToast({
                title: '通过成功',
              })
              that.setData({
                currentTab:1,
              })
              that.getSignList(1);
            },
            fail: function (res) {
              wx.showModal({
                content:'连接数据库失败'
              })
              console.log("fail to connect");
            }
          })
        } 
        else if (res.cancel) {
        console.log('取消')
        }
      }
    })
  },
  handleFail:function(e){
    var that = this;
    console.log(e.currentTarget.dataset.id)
    wx.showModal({
      content: '请确定要不通过这位同学的报名审核',
      success (res) {
        if (res.confirm) {
          console.log('确定')
          wx.request({
            url: 'http://localhost:8080/WEBPRO_18/xcx_sign_fail',
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              s_id:e.currentTarget.dataset.id
            },
            success: function (res) {
              wx.showToast({
                title: '不通过成功',
              })
              that.setData({
                currentTab:2,
              })
              that.getSignList(2);
            },
            fail: function (res) {
              wx.showModal({
                content:'连接数据库失败'
              })
              console.log("fail to connect");
            }
          })
        } 
        else if (res.cancel) {
        console.log('取消')
        }
      }
    })
  },
  swichNav: function (e) {
    console.log(e);
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current,
    })
    that.getSignList(e.target.dataset.current)
  },

  swiperChange: function (e) {
      console.log(e);
      this.setData({
          currentTab: e.detail.current,
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