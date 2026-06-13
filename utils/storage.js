const { foodImages } = require('./foodImages.js')

// 获取菜品图片
function getFoodImage(foodName) {
  return foodImages[foodName] || null
}

// 获取当前用户的历史记录存储 key
function getHistoryKey() {
  const app = getApp()
  if (app.globalData.isLogin && app.globalData.userId) {
    return app.getUserDataKey(app.globalData.userId, 'history')
  }
  return 'history_public'
}

// 获取历史记录
function getHistory() {
  const key = getHistoryKey()
  return wx.getStorageSync(key) || []
}

// 添加到历史记录
function addToHistory(food) {
  const key = getHistoryKey()
  let historyList = wx.getStorageSync(key) || []

  const now = new Date()
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const historyItem = {
    name: food.name,
    viewTime: dateStr
  }

  historyList.unshift(historyItem)

  if (historyList.length > 50) {
    historyList = historyList.slice(0, 50)
  }

  wx.setStorageSync(key, historyList)
}

// 保存历史记录
function saveHistory(historyList) {
  const key = getHistoryKey()
  wx.setStorageSync(key, historyList)
}

// 格式化当前日期为 YYYY-MM-DD
function getDateStr() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

module.exports = {
  getFoodImage,
  getHistoryKey,
  getHistory,
  addToHistory,
  saveHistory,
  getDateStr
}
