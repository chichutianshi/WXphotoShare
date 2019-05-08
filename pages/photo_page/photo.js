Page({
  /**
   * 页面的初始数据
   */
  data: {
    photoUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    photoId: '',
    likeNum: '',
    avatarURL: '',
    location: '',
    instruction: '',
    nickname: '',
    islike: '',
    index: ''
  },
  previewImage: function (e) {
    // console.log(e.currentTarget.dataset.index)
    wx.previewImage({
      current: this.data.photoUrls[e.currentTarget.dataset.index],
      // 当前显示图片的http链接		  	
      urls: this.data.photoUrls
      // 需要预览的图片http链接列表		
    })
  },
  increaseOrDeLike: function(e) {
    let that = this
    if (that.data.islike == 0) {
      that.setData({
        islike: 1,
        likeNum: that.data.likeNum + 1
      })
    } else {
      that.setData({
        islike: 0,
        likeNum: that.data.likeNum - 1
      })
    }
  },
  to_remark: function() {
    wx.navigateTo({
      url: '../remark_page/remark?photoId=' + this.data.photoId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // console.log(options.introduce)
    let Urls = JSON.parse(options.photoUrls)
    for (let i = 0; i < Urls.length; i++) {
      Urls[i] = "https://www.xqdiary.top/loadPic/" + options.photoId + "/" + Urls[i]
      //Urls[i] = "https://www.xqdiary.top/loadPic/" + options.photoId+"/"+Urls[i]
    }
    // console.log(Urls[0])
    // console.log(options.like)
    if (options.like == 'true') {
      this.setData({
        photoUrls: Urls,
        instruction: options.introduce,
        avatarURL: options.avatarURL,
        nickname: options.nickname,
        likeNum: options.likeNum,
        islike: 1,
        photoId: options.photoId,
        location: options.location,
        index: options.index
      })
    } else {
      this.setData({
        photoUrls: Urls,
        instruction: options.introduce,
        avatarURL: options.avatarURL,
        nickname: options.nickname,
        likeNum: options.likeNum,
        islike: 0,
        photoId: options.photoId,
        location: options.location
      })
    }

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

  }
})