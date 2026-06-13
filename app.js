App({
  onLaunch() {
    this.clearLoginStatus()
  },
  
  clearLoginStatus() {
    wx.removeStorageSync('token')
    wx.removeStorageSync('currentUserId')
    this.globalData.isLogin = false
    this.globalData.userInfo = null
    this.globalData.userId = null
  },
  
  clearAllCache() {
    // 清除所有缓存数据
    const info = wx.getStorageInfoSync()
    info.keys.forEach(key => {
      wx.removeStorageSync(key)
    })
    wx.showToast({
      title: '缓存已清除',
      icon: 'success'
    })
  },
  
  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  },
  
  getUserDataKey(userId, dataType) {
    return `user_${userId}_${dataType}`
  },
  
  globalData: {
    isLogin: false,
    userInfo: null,
    userId: null
  }
})