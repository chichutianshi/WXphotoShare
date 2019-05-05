Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: '添加评论...',
    text: '\n',
    mainComment: {},
    thirdSessionKey: '',
    commentIndex: 0,
    sonComments: [{
        avatarUrl: "http://vpic.video.qq.com/19254956/m0017iz4vuk_ori_1.jpg",
        nickname: "StarCraft",
        comment: "骄傲的开始攻击啊看到过哈哈地发掘的大海"
      },
      {
        avatarUrl: "http://vpic.video.qq.com/19254956/m0017iz4vuk_ori_1.jpg",
        nickname: "StarCraft",
        comment: "骄傲的开始攻击啊看到过哈哈地发掘的大海"
      },
      {
        avatarUrl: "http://vpic.video.qq.com/19254956/m0017iz4vuk_ori_1.jpg",
        nickname: "StarCraft",
        comment: "骄傲的开始攻击啊看到过哈哈地发掘的大海"
      },
      {
        avatarUrl: "http://vpic.video.qq.com/19254956/m0017iz4vuk_ori_1.jpg",
        nickname: "StarCraft",
        comment: "骄傲的开始攻击啊看到过哈哈地发掘的大海"
      },
      {
        avatarUrl: "http://vpic.video.qq.com/19254956/m0017iz4vuk_ori_1.jpg",
        nickname: "StarCraft",
        comment: "骄傲的开始攻击啊看到过哈哈地发掘的大海"
      },
      {
        avatarUrl: "http://vpic.video.qq.com/19254956/m0017iz4vuk_ori_1.jpg",
        nickname: "StarCraft",
        comment: "骄傲的开始攻击啊看到过哈哈地发掘的大海"
      },
      {
        avatarUrl: "http://vpic.video.qq.com/19254956/m0017iz4vuk_ori_1.jpg",
        nickname: "StarCraft",
        comment: "骄傲的开始攻击啊看到过哈哈地发掘的大海"
      },
      {
        avatarUrl: "http://vpic.video.qq.com/19254956/m0017iz4vuk_ori_1.jpg",
        nickname: "StarCraft",
        comment: "骄傲的开始攻击啊看到过哈哈地发掘的大海"
      }
    ],
    max: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    console.log(JSON.parse(options.mainComment))
    this.setData({
      mainComment: JSON.parse(options.mainComment),
      thirdSessionKey: options.thirdSessionKey
    })

    // wx.request({
    //   url: 'https://www.xqdiary.top/sp/getSonComments',
    //   data: {
    //     commentId: that.data.mainComment.id,
    //     commentIndex: that.data.commentIndex
    //   },
    //   success: (res) => {
    //     that.setData({
    //       sonComments:res.data,
    //       commentIndex: that.data.commentIndex + 10
    //     })
    //   },
    //   fail: (res) => {

    //   }
    // })
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
    // console.log(this.data.thirdSessionKey)
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

  }
})