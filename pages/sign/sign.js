// pages/sign/sign.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  phoInput: function(e){
    this.setData({
      pho:e.detail.value,
    })
  },
  emailInput: function(e){
    this.setData({
      email:e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var number = wx.getStorageSync('number'); //获取本地缓存中的userIdEnc //用户唯一识别码
    var uid = wx.getStorageSync('uid');//获取本地缓存中的loginDevice
     //获取活动名称等信息
     var that = this//不要漏了这句，很重要
     console.log("ty"+options.e_id);
     wx.request({
       url:`http://localhost:8080/WEBPRO_18/HT_xcx_eventinfo?e_id=${options.e_id}`, 
       data: {
       message: 'ty is the The most handsome man in the ESTA',
       },
       method: 'GET',
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function (res) {
         console.log(res)
         that.setData({
            event_data:res.data[0],
         });
         console.log(res.data);//回调函数中的携带服务器响应数据
       },
       fail: function (res) {
         console.log("fail to connect");
       }
     }),
     console.log(number)
  
     //获取用户信息
     wx.request({
      url: 'http://localhost:8080/WEBPRO_18/HT_xcx_getmes',
      // url:`http://localhost:8080/WEBPRO_18/HT_xcx_getmes?u_id=uid`, 
      // data: {
      // //message: 'ty is the The most handsome man in the ESTA',

      // },
      data: {
        u_id:uid,
        },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
           user_data:res.data[0],
        });
        console.log(res.data);//回调函数中的携带服务器响应数据
      },
      fail: function (res) {
        console.log("未得到用户信息");
      }
    })
  },

  tijiao: function (e) {
    var number = wx.getStorageSync('number'); //获取本地缓存中的userIdEnc //用户唯一识别码
    var uid = wx.getStorageSync('uid');//获取本地缓存中的loginDevice
    console.log(number)
    //var eid=that.onLoad(this.data.pageOption);
    console.log(uid)
    var thisBlock = this;
   // console.log(thisBlock.data.event_data.e_id)
    wx.request({
      url: 'http://localhost:8080/WEBPRO_18/HT_xcx_esign',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        s_status:'0',
        u_id:uid,
        e_id:thisBlock.data.event_data.e_id,
        e_title:thisBlock.data.event_data.e_title,
        e_date:thisBlock.data.event_data.e_date,
        u_phone:thisBlock.data.pho,
        u_email:thisBlock.data.email,
        u_number:thisBlock.data.user_data.u_number,
        u_name:thisBlock.data.user_data.u_name,
      },
      success: function (res) {
        console.log("插入成功");
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