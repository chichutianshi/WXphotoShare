Page({

  /**
   * 页面的初始数据
   */
  data: {
    rawData: '',
    text: '\n',
    mainComments: [],
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    isShow: true,
    currentTab: 0,
    showLoading: true,
    topic: '添加评论...',
    instruction: '',
    max: 500,
    avatarURL: '',
    nickname: '',
    likeNum: '',
    islike: '',
    photoId: '',
    commentIndex: 0,
    pubComment: '',
    thirdSessionKey: '',
    location: '',
    //所有图片的高度  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // console.log(options.introduce)
    // let Urls = JSON.parse(options.photoUrls)
    // for (let i = 0; i < Urls.length; i++) {
    //   Urls[i] = "https://www.xqdiary.top/loadPic/" + options.photoId + "/" + Urls[i]
    //   //Urls[i] = "https://www.xqdiary.top/loadPic/" + options.photoId+"/"+Urls[i]
    // }
    // console.log(Urls[0])
    this.setData({
      photoId: options.photoId,
    })
    // console.log(that.data.thirdSessionKey)
    // console.log(options.like)
    wx.request({
      url: 'https://www.xqdiary.top/sp/getMainPhotoComment',
      data: {
        photoId: this.data.photoId,
        commentIndex: this.data.commentIndex
      },
      success: (res) => {
        // console.log(res.data)
        that.setData({
          mainComments: res.data,
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
    if (that.data.thirdSessionKey == '') {
      wx.getStorage({
        key: 'thirdSessionKey',
        success: function(res) {
          // console.log(res.data)
          that.setData({
            thirdSessionKey: res.data
          })
        },
      })
    }
    // console.log(this.data.location)
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

  reloadCommnets: function() {
    let that = this
    that.setData({
      commentIndex: 0,
      mainComments: []
    })
    wx.request({
      url: 'https://www.xqdiary.top/sp/refreshComments',
      data: {
        photoId: that.data.photoId
      },
      success: (res) => {
        that.setData({
          mainComments: res.data,
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
  loadMoreComments: function() {
    let that = this
    console.log(that.data.commentIndex)
    wx.request({
      url: 'https://www.xqdiary.top/sp/getMainPhotoComment',
      data: {
        photoId: that.data.photoId,
        commentIndex: that.data.commentIndex
      },
      success: (res) => {
        // console.log(res.data)
        if (res.data != '') {
          // console.log(res.data)
          let comments = res.data
          let mainComments = that.data.mainComments.concat(comments)
          // console.log(that.data.mainComments.concat(comments))

          that.setData({
            mainComments: mainComments,
            commentIndex: that.data.commentIndex + 10
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

  to_commit: function(e) {
    let that = this
    // console.log(e.target.dataset.vid)
    // console.log(that.data.mainComments[e.target.dataset.vid])
    wx.navigateTo({
      url: '../sonRemark_page/sonRemark?thirdSessionKey=' + that.data.thirdSessionKey + "&mainComment=" + JSON.stringify(that.data.mainComments[e.target.dataset.vid]),
    })
  },

  //展示图片
  previewImage: function(e) {
    // console.log(e.currentTarget.dataset.index)
    wx.previewImage({
      current: this.data.imgUrls[e.currentTarget.dataset.index],
      // 当前显示图片的http链接		  	
      urls: this.data.imgUrls
      // 需要预览的图片http链接列表		
    })
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
      pubComment: value
    });
  },

  publishMainComment: function() {
    let that = this
    // console.log(this.data.rawData)
    if (this.data.rawData == '') {
      wx.showToast({
        title: '请登陆进行评论',
        icon: 'none',
        duration: 1300
      })
    } else {
      if (that.data.pubComment != '') {
        wx.showLoading({
          title: '发送中',
        })
        let rawData = JSON.parse(this.data.rawData)
        // console.log(that.data.thirdSessionKey)
        // console.log(rawData.nickName)
        // console.log(rawData.avatarUrl)
        // console.log(that.data.photoId)
        // console.log(that.data.pubComment)
        wx.request({
          url: 'https://www.xqdiary.top/sp/publishMainComment',
          data: {
            thirdSessionKey: that.data.thirdSessionKey,
            content: that.data.pubComment,
            photoId: that.data.photoId,
            fromURL: rawData.avatarUrl,
            fromname: rawData.nickName
          },
          success: (res) => {
            wx.hideLoading()
            // console.log(res.data)
            if (res.data == 1) {
              this.afterPublishRefresh()
              wx.showToast({
                title: '发送成功',
                icon:'none',
                duration:1200
              })
              that.setData({
                pubComment: ''
              })
            } else {
              if (res.data = -2) {
                wx.showToast({
                  title: '请登陆进行评论',
                  icon: "none",
                  duration: 1300
                })
              } else {
                wx.showToast({
                  title: '发送失败',
                  icon: "none",
                  duration: 1300
                })
              }
            }
          },
          fail: (res) => {
            wx.hideLoading()
          }
        })
      } else {
        wx.showToast({
          title: '评论不能为空',
          icon: "none",
          duration: 1300
        })
      }

    }

  },
  afterPublishRefresh: function() {
    let that = this
    wx.request({
      url: 'https://www.xqdiary.top/sp/afterPublishRefresh',
      data: {
        photoId: that.data.photoId
      },
      success: (res) => {
        console.log(res.data)
        that.setData({
          mainComments:that.data.mainComments.concat(res.data)
        })
      },
      fail: (res) => {

      }
    })
  }

})