// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
//选项卡
data: {
  currentIndex: 0,
  "firstList": [{ name: 'w券1', money: '5.00' }, { name: 'w券2', money: '50.00'}, { name: 'w券2', money: '50.00'}, { name: 'w券2', money: '50.00'}, { name: 'w券2', money: '50.00'}, { name: 'w券2', money: '50.00'}],
  "secondList": [{ name: 'y券1', money: '10.00' }, { name: 'y券2', money: '20.00' }],
  "thirdList": [{ name: 'g券1', money: '30.00' }, { name: 'g券2', money: '40.00' }],
},

//swiper切换时会调用
pagechange: function (e) {
  if ("touch" === e.detail.source) {
    let currentPageIndex = this.data.currentIndex
    currentPageIndex = (currentPageIndex + 1) % 3
    this.setData({
      currentIndex: currentPageIndex
    })
  }
},
//用户点击tab时调用
titleClick: function (e) {
  let currentPageIndex =
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx
    })
},
  //用户点击tab时调用
  titleClick1: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
      var that = this//不要漏了这句，很重要
    //获取思修活动信息
    wx.request({
      url: 'http://localhost:8080/WEBPRO_18/HT_xcx_sixiuinfo',//思修活动
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
          sixiu_data: res.data,
          //text1: res.data
        });
        console.log(res.data);//回调函数中的携带服务器响应数据
      },
      fail: function (res) {
        console.log("fail to connect");
      }
    })
  },
  titleClick2: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
      var that = this//不要漏了这句，很重要
     //获取青协活动
     wx.request({
      url: 'http://localhost:8080/WEBPRO_18/HT_xcx_qingxieinfo',//青协活动
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
          qingxie_data: res.data,
          //text1: res.data
        });
        console.log(res.data);//回调函数中的携带服务器响应数据
      },
      fail: function (res) {
        console.log("fail to connect");
      }
    })
  },
  titleClick3: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
      var that = this//不要漏了这句，很重要
      //获取社会活动
    wx.request({
      url: 'http://localhost:8080/WEBPRO_18/HT_xcx_shehuiinfo',//社会活动
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
          shehui_data: res.data,
          //text1: res.data
        });
        console.log(res.data);//回调函数中的携带服务器响应数据
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
    var that = this//不要漏了这句，很重要
    //获取思修活动信息
    wx.request({
      url: 'http://localhost:8080/WEBPRO_18/HT_xcx_sixiuinfo',//思修活动
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
          sixiu_data: res.data,
          //text1: res.data
        });
        console.log(res.data);//回调函数中的携带服务器响应数据
      },
      fail: function (res) {
        console.log("fail to connect");
      }
    })
  },

  //搜索框
  showInput: function () {
    this.setData({
    inputShowed: true
    });
    },
    hideInput: function () {
    this.setData({
    inputVal: "",
    inputShowed: false
    });
    // getList(this);
    },
    clearInput: function () {
    this.setData({
    inputVal: ""
    });
    // getList(this);
    },
    inputTyping: function (e) {
    //搜索数据
    // getList(this, e.detail.value);
    this.setData({
    inputVal: e.detail.value
    });
    },
    menuTap:function(e){
      var current=e.currentTarget.dataset.current;//获取到绑定的数据
      //改变menuTapCurrent的值为当前选中的menu所绑定的数据
      this.setData({
      menuTapCurrent:current
      });
     
     
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