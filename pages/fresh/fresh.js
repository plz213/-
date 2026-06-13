const { foodLibrary } = require('../../utils/foodLibrary.js')
const { getFoodImage, addToHistory } = require('../../utils/storage.js')

Page({
  data: {
    stapleIndex: 0,
    ingredientIndex: 0,
    methodIndex: 0,
    result: null,
    staples: ['未选择', '饭', '面', '馒头', '包子', '其他'],
    ingredients: ['未选择', '鸡肉', '猪肉', '牛肉', '鱼', '鸡蛋', '青菜', '土豆', '胡萝卜', '黄瓜', '番茄', '香菇', '木耳'],
    methods: ['未选择', '炒', '煮', '蒸', '炖', '煎']
  },

  onLoad(options) {
    if (options.foodName) {
      const foodName = decodeURIComponent(options.foodName)
      const matchedFood = foodLibrary.find(food => food.name === foodName)
      if (matchedFood) {
        const result = {
          name: matchedFood.name,
          method: matchedFood.methods[0],
          ingredient: matchedFood.ingredients.join('、'),
          description: matchedFood.description,
          staple: matchedFood.staple,
          pic: getFoodImage(matchedFood.name)
        }
        this.setData({ result })
        addToHistory(result)
      }
    }
  },

  selectStaple(e) {
    this.setData({ stapleIndex: parseInt(e.currentTarget.dataset.index) })
  },

  selectIngredient(e) {
    this.setData({ ingredientIndex: parseInt(e.currentTarget.dataset.index) })
  },

  selectMethod(e) {
    this.setData({ methodIndex: parseInt(e.currentTarget.dataset.index) })
  },

  startRandom() {
    wx.showToast({
      title: '正在抽取...',
      icon: 'loading',
      duration: 1000
    })

    setTimeout(() => {
      this.getRandomFood()
    }, 1000)
  },

  getRandomFood() {
    const selectedStaple = this.data.staples[this.data.stapleIndex]
    const selectedIngredient = this.data.ingredients[this.data.ingredientIndex]
    const selectedMethod = this.data.methods[this.data.methodIndex]

    // 计算每个菜品的匹配分数
    const scoredFoods = foodLibrary.map(food => {
      let score = 0
      if (selectedStaple !== '未选择' && food.staple === selectedStaple) {
        score += 3
      }
      if (selectedIngredient !== '未选择' && food.ingredients.includes(selectedIngredient)) {
        score += 2
      }
      if (selectedMethod !== '未选择' && food.methods.includes(selectedMethod)) {
        score += 2
      }
      if (selectedStaple === '未选择') score += 1
      if (selectedIngredient === '未选择') score += 1
      if (selectedMethod === '未选择') score += 1
      return { food, score }
    })

    const validFoods = scoredFoods.filter(item => item.score > 0)

    let resultFood
    let resultScore
    if (validFoods.length > 0) {
      const totalScore = validFoods.reduce((sum, item) => sum + item.score, 0)
      let random = Math.random() * totalScore

      for (let item of validFoods) {
        random -= item.score
        if (random <= 0) {
          resultFood = item.food
          resultScore = item.score
          break
        }
      }

      const maxScore = (selectedStaple !== '未选择' ? 3 : 0) +
                      (selectedIngredient !== '未选择' ? 2 : 0) +
                      (selectedMethod !== '未选择' ? 2 : 0) + 3
      const matchPercentage = Math.round((resultScore / maxScore) * 100)

      if (matchPercentage >= 80) {
        wx.showToast({
          title: '完美匹配！',
          icon: 'success',
          duration: 1500
        })
      } else if (matchPercentage >= 50) {
        wx.showToast({
          title: '不错的匹配！',
          icon: 'none',
          duration: 1500
        })
      }
    } else {
      const randomIndex = Math.floor(Math.random() * foodLibrary.length)
      resultFood = foodLibrary[randomIndex]
      resultScore = 0
      wx.showToast({
        title: '未找到匹配，随机推荐',
        icon: 'none',
        duration: 1500
      })
    }

    const result = {
      name: resultFood.name,
      method: resultFood.methods[0],
      ingredient: resultFood.ingredients.join('、'),
      description: resultFood.description,
      staple: resultFood.staple,
      pic: getFoodImage(resultFood.name),
      score: resultScore
    }

    this.setData({ result })
    addToHistory(result)
  },

  changeFood() {
    this.getRandomFood()
  },

  resetFilter() {
    this.setData({
      stapleIndex: 0,
      ingredientIndex: 0,
      methodIndex: 0,
      result: null
    })
  }
})
