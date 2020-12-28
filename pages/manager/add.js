// pages/manager/add.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uploaderList: [],
    uploaderNum:0,
    showUpload:true,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: null,
    endYear: null,
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
    let that = this;
   
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    //var lastArray = obj1.dateTimeArray.pop();
    //var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
    });
  },
  // 选择日期时间
  changeDateTime1(e) {
    this.setData({
      dateTime1: e.detail.value
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1,
      dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr

    });
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
      url: 'http://localhost:8080/WEBPRO_18/xcx_release',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        title:value.title,
        desc:value.desc,
        job:value.job,
        place:value.place,
        longtitude:that.data.addressInfo.longitude,
        latitude:that.data.addressInfo.latitude,
        date:value.date,
        person:value.person,
        name:value.name,
        category:that.data.category,
        phone:value.phone,
        ddl:that.data.dateTimeArray1[0][that.data.dateTime1[0]]+"-"+that.data.dateTimeArray1[1][that.data.dateTime1[1]]+"-"+that.data.dateTimeArray1[2][that.data.dateTime1[2]]+" "+that.data.dateTimeArray1[3][that.data.dateTime1[3]]+":"+that.data.dateTimeArray1[4][that.data.dateTime1[4]]+":"+that.data.dateTimeArray1[5][that.data.dateTime1[5]]
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
  // // 设置权限
  //      // 删除图片
  //      clearImg:function(e){
  //       var nowList = [];//新数据
  //       var uploaderList = this.data.uploaderList;//原数据
        
  //       for (let i = 0; i < uploaderList.length;i++){
  //           if (i == e.currentTarget.dataset.index){
  //               continue;
  //           }else{
  //               nowList.push(uploaderList[i])
  //           }
  //       }
  //       this.setData({
  //           uploaderNum: this.data.uploaderNum - 1,
  //           uploaderList: nowList,
  //           showUpload: true
  //       })
  //   },
  //   //展示图片
  //   showImg:function(e){
  //       var that=this;
  //       wx.previewImage({
  //           urls: that.data.uploaderList,
  //           current: that.data.uploaderList[e.currentTarget.dataset.index]
  //       })
  //   },
    // //上传图片
    // upload: function(e) {
    //     var that = this;
    //     wx.chooseImage({
    //         count: 9 - that.data.uploaderNum, // 默认9
    //         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //         success: function(res) {
    //             console.log(res)
    //             // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //             let tempFilePaths = res.tempFilePaths;
    //             let uploaderList = that.data.uploaderList.concat(tempFilePaths);
    //             if (uploaderList.length==9){
    //                 that.setData({
    //                     showUpload:false
    //                 })
    //             }
    //             that.setData({
    //                 uploaderList: uploaderList,
    //                 uploaderNum: uploaderList.length,
    //             })
    //         }
    //     })
    // },

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