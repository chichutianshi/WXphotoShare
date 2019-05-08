Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectRow: 0,
    note: [],
    thirdSessionKey: ''
  },

  increaseOrDeLike: function(e) {
    let that = this
    let notes = that.data.note
    let note = notes[e.target.dataset.vid]
    if (note.like == false) {
      // console.log(e.target.dataset.vid)
      if (e.target.dataset.vid != undefined) {
        // console.log(note.likeNum)
        note.likeNum = note.likeNum + 1
        note.like = true
        notes[e.target.dataset.vid] = note
        that.setData({
          note: notes,
        })
      }
    } else {
      if (e.target.dataset.vid != undefined) {
        // console.log(note.likeNum)
        note.likeNum = note.likeNum - 1
        note.like = false
        notes[e.target.dataset.vid] = note
        that.setData({
          note: notes,
        })
      }
    }
  },

  loaddetail: function(e) {
    let index = e.target.dataset.vid
    // console.log(index)
    if (index != undefined) {
      wx.request({
        url: 'https://www.xqdiary.top/sp/GetPhotoDetail',
        data: {
          photoId: this.data.note[index].photoId
        },
        success: (res) => {
          //console.log(res.data.photoUrls)
          // console.log(this.data.note[index].location)
          if (this.data.note[index].location != undefined) {
            wx.navigateTo({
              url: '../photo_page/photo?photoUrls=' + JSON.stringify(res.data.photoUrls) + "&photoId=" + this.data.note[index].photoId + "&introduce=" + this.data.note[index].instruction + "&avatarURL=" + this.data.note[index].avatarURL + "&nickname=" + this.data.note[index].nickname + "&likeNum=" + this.data.note[index].likeNum + "&like=" + this.data.note[index].like + "&location=" + this.data.note[index].location+"&index="+index
            })
          } else {
            wx.navigateTo({
              url: '../photo_page/photo?photoUrls=' + JSON.stringify(res.data.photoUrls) + "&photoId=" + this.data.note[index].photoId + "&introduce=" + this.data.note[index].instruction + "&avatarURL=" + this.data.note[index].avatarURL + "&nickname=" + this.data.note[index].nickname + "&likeNum=" + this.data.note[index].likeNum + "&like=" + this.data.note[index].like + "&location=" + "未知" + "&index=" + index
            })
          }

        },
        fail: (res) => {

        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    // wx.getStorage({
    //   key: 'rawData',
    //   success: function(res) {
    //     console.log(res.data)
    //   },
    //   fail:function(res){
    //     wx.navigateTo({
    //       url: '../login_page/login',
    //     })
    //   }
    // })
    wx.getStorage({
      key: 'thirdSessionKey',
      success: function(res) {
        var temp = res.data;
        // console.log(temp)
        wx.request({
          // url: 'https://www.xqdiary.top/sp/uuidLogin',
          url: 'https://www.xqdiary.top/sp/uuidLogin',
          data: {
            thirdSessionKey: temp
          },
          success: (res) => {
            //console.log("状态值"+res.data.status)
            if (res.data.status == 0) {
              that.setData({
                thirdSessionKey: temp
              })
            } else {
              wx.removeStorage({
                key: 'thirdSessionKey',
                success: function(res) {
                  wx.removeStorage({
                    key: 'rawData',
                    success: function(res) {},
                  })
                },
                fail: function() {

                }
              })
              wx.navigateTo({
                url: '../login_page/login',
              })
            }
          }
        })
      },
      fail: function(res) {
        wx.navigateTo({
          url: '../login_page/login',
        })
      },
      complete: function() {
        // console.log(that.data.note)
        if (that.data.note.length == 0) {
          //console.log("come in")
          wx.request({
            //url: 'https://www.xqdiary.top/sp/loadPhotos',
            url: 'https://www.xqdiary.top/sp/loadPhotos',
            data: {
              selectRow: that.data.selectRow,
              thirdSessionKey: ''
            },
            success: (res) => {
              // console.log(res.data)
              let notes = res.data
              for (let i = 0; i < notes.length; i++) {
                notes[i].like = false
              }
              that.setData({
                note: res.data,
                selectRow: that.data.selectRow + 14
              })
              // console.log(that.data.selectRow)
            },

            fail: (res) => {
              console.log("请求失败!")
            }
          })
        }
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

  reloadData: function() {
    let that = this
    this.setData({
      note: [],
      selectRow: 0
    })
    wx.request({
      //url: 'https://www.xqdiary.top/sp/loadPhotos',
      url: 'https://www.xqdiary.top/sp/loadPhotos',
      data: {
        selectRow: that.data.selectRow,
        thirdSessionKey: ''
      },
      success: (res) => {
        let notes = res.data
        for (let i = 0; i < notes.length; i++) {
          notes[i].like = false
        }
        // console.log(res.data)
        that.setData({
          note: notes,
          selectRow: that.data.selectRow + 14
        })
        wx.showToast({
          title: '刷新成功',
          icon: "none",
          duration: 1200
        })
        // console.log(that.data.selectRow)
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('onPullDownRefresh', '下拉刷新....');
    this.reloadData()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '加载中...',
    })
    this.loadMore()
  },
  loadMore: function() {
    let that = this
    wx.request({
      //url: 'https://www.xqdiary.top/sp/loadPhotos',
      url: 'https://www.xqdiary.top/sp/loadPhotos',
      data: {
        selectRow: that.data.selectRow,
        thirdSessionKey: ''
      },
      success: (res) => {
        if (res.data != '') {
          console.log(res.data)
          let notes = res.data
          for (let i = 0; i < notes.length; i++) {
            notes[i].like = false
          }
          var newNote = that.data.note.concat(notes)
          // console.log(newNote.length)
          that.setData({
            note: newNote,
            selectRow: that.data.selectRow + 14
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

  }

})