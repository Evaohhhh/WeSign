//index.js
//获取应用实例
import { isLogin } from '../../utils/permission'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    appid:'wx9f8f8d7fc02ac384',
    secret:'d26c225bdfd8ff0a29eb5d34deab06f4',
    IsGetInfo: false,
    number:'',
    code:'',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (!wx.getStorageSync('userInfo')) {
      this.data.IsGetInfo=true;
      // wx.switchTab({ url: '/pages/home/home' })
    }
    if(wx.getStorageSync('isLogin')){
      wx.switchTab({
        url: '../main/main',
      })
    }
    // } else {
    //   wx.redirectTo({url: '/pages/register/register'})
    // }
  },
  handleRegister: function(){
    wx.navigateTo({
      url: '../main/main',
    })
  },
  handleLogin:function(){
    var that = this.data;
    wx.request({
      url: 'http://localhost:8080/WEBPRO_18/xcx_login_in',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        number:that.number,
        code:that.code,
      },
      success: function (res) {
        console.log(res)
        if(res.statusCode==500){
          console.log("账号或密码错误");
          wx.showModal({
            content:'账号或密码错误'
          })
        }
        else{
          wx.setStorageSync('isLogin',true);
          console.log("登录成功");
          wx.redirectTo({
            url: '../main/main',
          })
        }
       
      },
      fail: function (res) {
        wx.showModal({
          content:'连接数据库失败'
        })
        console.log("fail to connect");
      }
    })
  },
  numberInput: function(e){
    this.setData({
      number:e.detail.value,
    })
    wx.setStorageSync('number', e.detail.value)
  },
  codeInput: function(e){
    this.setData({
      code:e.detail.value,
    })
  },
  getUserInfo: function(){
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        wx.setStorageSync('userInfo', res.userInfo);//存储userInfo
        that.setData({
          IsGetInfo: true,
        })
      },
      fail: function(res){
        console.log(res)
      }
    });
  }
})

