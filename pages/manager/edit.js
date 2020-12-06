
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    addressInfo:'',
    index:0,
    category:'0',
    objectArray: [
      {
        id: 0,
        name: '请选择'
      },
      {
        id: 1,
        name: '思修活动'
      },
      {
        id: 2,
        name: '青协志愿活动'
      },
      {
        id: 3,
        name: '社会活动'
      },
	],

  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      category: e.detail.value,
    })
    console.log(this.data.category)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id,
    })
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
        console.log(res.data.filter(item=>item.e_id==options.id)[0])
        const eventInfo = res.data.filter(item=>item.e_id==options.id)[0];
        that.setData({
          title:eventInfo.e_title,
          desc:eventInfo.e_desc,
          job:eventInfo.e_job,
          place:eventInfo.e_place,
          longtitude:eventInfo.e_longtitude,
          latitude:eventInfo.e_latitude,
          date:eventInfo.e_date,
          person:eventInfo.e_person,
          name:eventInfo.e_name,
          index:eventInfo.e_fenlei,
          phone:eventInfo.e_phone,
          ddl:eventInfo.e_ddl,
                
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  handleAdd: function(e){
    const value= e.detail.value;
    console.log(e.detail.value);
    var that = this;

    wx.request({
      url: 'http://localhost:8080/WEBPRO_18/xcx_edit_event',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        title:value.title,
        desc:value.desc,
        job:value.job,
        place:value.place,
        longtitude:that.data.longtitude,
        latitude:that.data.latitude,
        date:value.date,
        person:value.person,
        name:value.name,
        category:that.data.category,
        phone:value.phone,
        ddl:value.ddl,
        id:that.data.id,
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: './manager',
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
  
  // 选择位置
  selectedClick(){
    var that = this;
    wx.openSetting({
      success: function (res) {
        console.log(res);
        console.log("选择位置")
        // 选择位置
        wx.chooseLocation({
          success: function (res) {
            console.log(res);
            that.setData({
              addressInfo:res
            })
            that.setData({
              latitude: res.latitude,
              longtitude: res.longitude,
              place:res.name+res.address,
            })
            // // 打开位置
            // wx.openLocation({
            //   latitude: res.latitude,
            //   longitude: res.longitude,
            //   name: res.name,
            //   address: res.address,
            // })
          },
        })
      }
    })
  },
  // 设置权限
   

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