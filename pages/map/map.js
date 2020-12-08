Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 中心点纬度、经度
    latitude: "",
    longitude: "",
    // 标记点 当前位置
    markers: [],
    // 圆
    circles: [],
    // 控件 回到当前位置
    controls: []
  },

  // 回到当前位置
  locationClick: function (event) {
    var thisBlock = this;

    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        console.log(res);

        thisBlock.setData({
          latitude: res.latitude,
          longitude: res.longitude,

          markers: [{
            iconPath: "/images/map/address.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 10,
            height: 10,
            title: "当前位置",
            callout: {
              padding: 10,
              content: "当前位置",
              bgColor: "#DC143C",
              color: "#ffffff",
              display: "ALWAYS"
            },
            label: { content: "locationclick" },
            anchor: {}
          }],
        })
      },
    })
  },

  // 选择位置
  selectedClick: function () {
    // 设置权限
    wx.openSetting({
      success: function (res) {
        console.log(res);

        // 选择位置
        wx.chooseLocation({
          success: function (res) {
            console.log(res);

            // 打开位置
            wx.openLocation({
              latitude: res.latitude,
              longitude: res.longitude,
              name: res.name,
              address: res.address,
            })
          },
        })
      }
    })
  },

  regionChange: function (res) {
    // 改变中心点位置
    if (res.type == "end") {
      var thisBlock = this;
      this.mapCtx = wx.createMapContext("centerChange");
      this.mapCtx.getCenterLocation({
        success: function (res) {
          console.log(res);

          thisBlock.setData({
            latitude: res.latitude,
            longitude: res.longitude,

            markers: [{
              iconPath: "/images/map/address.png",
              id: 0,
              latitude: res.latitude,
              longitude: res.longitude,
              width: 35,
              height: 35,
              title: "当前位置",
              callout: {
                padding: 10,
                content: "当前位置",
                bgColor: "#DC143C",
                color: "#FFFF00",
                display: "ALWAYS"
              },
              label: { content: "region" },
              anchor: {}
            }],
          })
        }
      })
    }
  },

  // 回到当前位置
  controlClick: function (res) {
    console.log(res);
    var thisBlock = this;

    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        console.log(res);

        thisBlock.setData({
          latitude: res.latitude,
          longitude: res.longitude,

          markers: [{
            iconPath: "/images/map/address.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 35,
            height: 35,
            title: "当前位置",
            callout: {
              padding: 10,
              content: "当前位置",
              bgColor: "#DC143C",
              color: "#FFFF00",
              display: "ALWAYS"
            },
            label: { content: "locationcontrol" },
            anchor: {}
          }],
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 获取当前位置
    var thisBlock = this;
    wx.getLocation({
      type: "wgs84",
      success: function (res) {
        console.log(res);

        thisBlock.setData({
          latitude: res.latitude,
          longitude: res.longitude,

          markers: [{
            //iconPath: "/images/map/address.png",
            id: 0,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 10,
            height: 35,
            title: "当前位置",
            callout: {
              padding: 10,
              content: "当前位置👇",
              bgColor: "#000000",
              color: "#FFFFff",
              //字体颜色
              display: "ALWAYS"
            },
            label: { content: "北师珠" },
            anchor: {}
          }],

          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            radius: 10,
            strokeWidth: 2,
            fillColor: "#FAFAD2",
            color: "#90EE90"
          }],

          controls: [{
            id: 1001,
            position: { left: 10, top: 10, width: 35, height: 35 },
            iconPath: "/images/map/location.png",
            clickable: true
          }],
        })
      },
    })
  },

  // 跳转到其他页面
  lineClick: function (res) {
    wx.navigateTo({
      url: '../Map/mapline',
    })
  }
})