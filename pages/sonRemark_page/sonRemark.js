Page({

  /**
   * 页面的初始数据
   */
  data: {
    rawData: '',
    topic: '添加评论...',
    text: '\n',
    mainComment: {},
    thirdSessionKey: '',
    commentIndex: 0,
    sonComments: [],
    max: 500,
    pubSonComment: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // console.log(JSON.parse(options.mainComment))
    this.setData({
      mainComment: JSON.parse(options.mainComment),
      thirdSessionKey: options.thirdSessionKey
    })

    wx.request({
      url: 'https://www.xqdiary.top/sp/getSonComments',
      data: {
        commentId: that.data.mainComment.id,
        commentIndex: that.data.commentIndex
      },
      success: (res) => {
        // console.log(res.data)
        that.setData({
          sonComments:res.data,
          commentIndex: that.data.commentIndex + 10
        })
      },
      fail: (res) => {

      }
    })
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
    let that = this
    wx.getStorage({
      key: 'rawData',
      success: function(res) {
        // console.log(res.data)
        that.setData({
          rawData: res.data
        })
      },
    })
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
    console.log('onPullDownRefresh', '下拉刷新....');
    this.reloadCommnets()
    wx.stopPullDownRefresh()
  },

  reloadCommnets: function () {
    let that = this
    that.setData({
      commentIndex: 0,
      sonComments: []
    })
    wx.request({
      url: 'https://www.xqdiary.top/sp/refreshSonComments',
      data: {
        commentId: that.data.mainComment.id
      },
      success: (res) => {
        that.setData({
          sonComments: res.data,
          commentIndex: that.data.commentIndex + 10
        })
        wx.showToast({
          title: '刷新成功',
          icon: "none",
          duration: 1200
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '请求失败，请稍后再试',
          icon: "none",
          duration: 1500
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '加载中...',
    })
    this.loadMoreComments()
  },

  loadMoreComments: function () {
    let that = this
    wx.request({
      url: 'https://www.xqdiary.top/sp/getSonComments',
      data: {
        commentId: that.data.mainComment.id,
        commentIndex: that.data.commentIndex
      },
      success: (res) => {
        if (res.data != '') {
          console.log(res.data)
          let sonComments = that.data.sonComments

          that.setData({
            sonComments: sonComments.push(res.data)
          })
          wx.hideLoading()
        } else {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '到底了',
            duration: 2000
          })
        }
      },
      fail: (res) => {
        wx.hideLoading()
      }
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  inputs: function(e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // console.log(value)
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      pubSonComment: value
    });
  },
  publishSonComment: function() {
    let that = this
    let rawData = JSON.parse(this.data.rawData)
    console.log(that.data.thirdSessionKey)
    console.log(rawData.nickName)
    console.log(rawData.avatarUrl)
    console.log(that.data.mainComment.id)
    console.log(that.data.pubSonComment)
    wx.request({
      url: 'https://www.xqdiary.top/sp/commentsReply',
      data: {
        thirdSessionKey: that.data.thirdSessionKey,
        content: that.data.pubSonComment,
        photoId: that.data.photoId,
        fromURL: rawData.avatarUrl,
        fromname: rawData.nickName,
        commentId: that.data.mainComment.id
      },
      success: (res) => {
        console.log(res.data)
        if (res.data == 1) {
          this.reloadCommnets()
          that.setData({
        pubSonComment:""
          })
        } else {
          if (res.data = -1) {
            wx.showToast({
              title: '发送失败',
              icon: "none",
              duration: 1300
            })
          } else {
            wx.showToast({
              title: '请登陆进行评论',
              icon: "none",
              duration: 1300
            })
          }
        }
      },
      fail: (res) => {

      }
    })
  }
})