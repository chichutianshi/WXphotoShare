Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    const rawData = e.detail.rawData;
    if (rawData != null) {
      wx.login({
        success(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'http://localhost:8080/WeChatlogin',
              //url: 'https://www.xqdiary.top/sp/WeChatlogin',
              data: {
                code: res.code,
                rawData: rawData
              },
              success(sres) {
                if (sres.data.status == 0) {
                  wx.setStorage({
                    key: 'thirdSessionKey',
                    data: sres.data.thirdSessionKey,
                  })
                  wx.setStorage({
                    key: 'rawData',
                    data: rawData
                  })
                  console.log(sres.data)
                  wx.navigateBack({})
                } else {
                  wx.showToast({
                    title: '登陆失败,服务器忙',
                    icon: 'none',
                    duration: 2000
                  })
                  console.log("登陆失败！")
                }

              },
              fail(res) {
                wx.showToast({
                  title: '登陆失败,服务器忙',
                  icon: 'none',
                  duration: 2000
                })
                console.log("登陆失败！" + res.errMsg)
              }
            })
          } else {
            console.log('登陆失败!' + res.errMsg)
          }
        }
      })
    } else {
      wx.showToast({
        title: '登陆失败,确认授权后登陆',
        icon: 'none',
        duration: 2000
      })
    }
  }
})