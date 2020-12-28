// pages/action/actionDetail.js

var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    n_id:0,
    listInfo:{},
    commentInfo:{},
    isLike:true,
    isShowComment:false,
    detail:'',
    userInfo: wx.getStorageSync('userInfo'),
    status: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.n_id)
    this.setData({
      n_id:options.n_id
    })
    this.getInfo();
    this.getCommentInfo();
    this.getCollectStutus();
  },

  getInfo: function(){
    var that = this//不要漏了这句，很重要
    
     //获取思修活动信息
     wx.request({
      url:`http://localhost:8080/WEBPRO_18/xcx_update_news_eye`, 
      data: {
        n_id:that.data.n_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        // console.log(listInfo);//回调函数中的携带服务器响应数据
      },
      fail: function (res) {
        console.log("fail to connect");
      }
    })
    //获取思修活动信息
    wx.request({
      url:`http://localhost:8080/WEBPRO_18/xcx_get_news`, 
      data: {
        type: 0
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        const listInfo = res.data.filter(item => item.n_id == that.data.n_id)
        that.setData({
          listInfo: listInfo[0],
        });
        console.log(listInfo);//回调函数中的携带服务器响应数据
      },
      fail: function (res) {
        console.log("fail to connect");
      }
    })
  },
  getCommentInfo: function(){
    var that = this//不要漏了这句，很重要

    wx.request({
      url:`http://localhost:8080/WEBPRO_18/xcx_get_news_comment`, 
      data: {
        n_id: that.data.n_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          commentInfo: res.data,
        });
        console.log(res.data);//回调函数中的携带服务器响应数据
      },
      fail: function (res) {
        console.log("fail to connect");
      }
    })
  },
  // handleLike: function(){
  //   this.setData({
  //     isLike:!this.data.isLike
  //   })
  // },
  getCollectStutus: function(){
    var that = this//不要漏了这句，很重要
    wx.request({
      url:`http://localhost:8080/WEBPRO_18/get_news_collect_status`, 
      data: {
        n_id: that.data.n_id,
        u_id: wx.getStorageSync('uid'),
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res) 
        if(res.data == ""){
          console.log("status: ''")
          that.setData({
            isLike:true,
            status:''
          })
        }
        else{
          if(res.data[0].status == '0'){
            console.log(2423423)
            that.setData({
              isLike:true,
              status:0
            })
          }
          else if(res.data[0].status == '1'){
            that.setData({
              isLike:false,
              status:1
            })
          }
        }
       
        // console.log(res.data);//回调函数中的携带服务器响应数据
      },
      fail: function (res) {
        console.log("fail to connect");
      }
    })
  },
  
  handleComment: function(){
    this.setData({
      isShowComment:!this.data.isShowComment
    })
  },
  commentInput:function(e){
    console.log(e.detail.value)
    this.setData({
      detail: e.detail.value
    })
  },
  handleSendComment: function(){
    var that = this//不要漏了这句，很重要
    //获取思修活动信息
    wx.request({
      url:"http://localhost:8080/WEBPRO_18/xcx_send_new_comment", 
      data: {
        n_id: that.data.n_id,
        touxiang:that.data.userInfo.avatarUrl,
        name:wx.getStorageSync('uname'),
        detail:that.data.detail,
        date:util.formatTime(new Date()),
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '评论成功',
          icon:'none'
        })
        that.setData({
          isShowComment:false,
        })
        that.getCommentInfo();
     
      },
      fail: function (res) {
        console.log("fail to connect");
      }
    })
  },
  handleLike: function(){
    var that = this
    //that.getCollectStutus();
    console.log(that.data.status)
    if(that.data.status==""){
      console.log(111222)
      wx.request({
        url:"http://localhost:8080/WEBPRO_18/xcx_set_news_collect", 
        data: {
          n_id: that.data.n_id,
          u_id: wx.getStorageSync('uid'),
          title:that.data.listInfo.n_title,
          date:that.data.listInfo.n_date,
          cover:that.data.listInfo.n_pic,
          status:1,
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '收藏成功',
          })
          that.setData({
            isLike:false,
            status:1,
          })
          that.getCollectStutus();
        },
        fail: function (res) {
          console.log("fail to connect");
        }
      })
    }
    else if(that.data.status=='1'){
      wx.request({
        url:"http://localhost:8080/WEBPRO_18/xcx_delete_news_collect", 
        data: {
          n_id: that.data.n_id,
          u_id: wx.getStorageSync('uid'),
        },
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '取消收藏成功',
          })
          that.setData({
            isLike:true,
            status:0,
          })
          that.getCollectStutus();
        },
        fail: function (res) {
          console.log("fail to connect");
        }
      })
    }
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
    let url = encodeURIComponent('/pages/action/actionDetail?n_id=' + this.data.n_id);
 
    return {
      title: "热点详情",
      path:`/pages/index/index?url=${url}` 
    }
 
  }

})