var url="";
Page({
  /**
   * 页面的初始数据
   */
  data:   {
    avatarUrl: '../../resources/mine_green.jpg',
    nickname:'授权登陆',
    thirdSessionKey:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'thirdSessionKey',
      success: function (res) {
        wx.getStorage({
          key: 'rawData',
          success: function (res) {
            var obj = JSON.parse(res.data)
            url = obj['avatarUrl']
            // console.log(url)
            that.setData({
              avatarUrl: url,
              nickname: obj['nickName']
            });
          },
          fail: function (res) {
            console.log("unlogin")
          }
        })},
    })
    

    // if(url!=null&&url!="")
    // {
    //   console.log("sas")
    //   this.setData({
    //     avatarUrl: url
    //   })
    // }
    
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
    this.onLoad()
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
    
  },

  to_publish:function(){
    wx.navigateTo({
      url: '../publish_page/publish',
    })
  },

  redirect:function(){
    wx.getStorage({
      key: 'thirdSessionKey',
      success: function(res) {

      },
      fail:function(){
        wx.navigateTo({
          url: '../login_page/login',
        })
      }
    })
  },

  outLogin:function(e){
    var that=this
    wx.getStorage({
      key: 'thirdSessionKey',
      success: function(res) {
        wx.request({
          url: 'http://localhost:8080/outLogin',
          data:{
            thirdSessionKey:res.data
          },
          success:function(res){
            if(res.data==1){
              wx.removeStorage({
                key: 'thirdSessionKey',
                success: function(res) {
                  wx.removeStorage({
                    key: 'rawData',
                    success: function(res) {},
                  })
                  that.setData({
                    avatarUrl: '../../resources/mine_green.jpg',
                    nickname: '授权登陆',
                  })
                  wx.showToast({
                    title: '退出成功',
                    icon:"success"
                  })
                },
                fail:function(){
                  wx.showToast({
                    title: '退出失败',
                    icon: "success"
                  })
                }
              })
            }
          },
          fail:function(){
            wx.showToast({
              title: '退出失败',
              icon: "success"
            })
          }
        })
      },
    })
  }
})