// 菜品库 - 30道菜品
const foodLibrary = [
  // 米饭类
  {
    name: "蛋炒饭",
    staple: "饭",
    ingredients: ["鸡蛋", "鸡肉"],
    methods: ["炒"],
    description: "经典蛋炒饭，配嫩滑鸡肉"
  },
  {
    name: "鸡肉盖浇饭",
    staple: "饭",
    ingredients: ["鸡肉", "土豆"],
    methods: ["炖", "炒"],
    description: "浓郁鸡肉汁拌饭"
  },
  {
    name: "咖喱鸡饭",
    staple: "饭",
    ingredients: ["鸡肉", "土豆", "胡萝卜"],
    methods: ["炖"],
    description: "香浓咖喱配米饭"
  },
  {
    name: "黄焖鸡米饭",
    staple: "饭",
    ingredients: ["鸡肉", "土豆"],
    methods: ["炖"],
    description: "软烂入味的黄焖鸡"
  },
  {
    name: "香菇滑鸡饭",
    staple: "饭",
    ingredients: ["鸡肉", "香菇"],
    methods: ["蒸", "炒"],
    description: "滑嫩香菇鸡肉"
  },
  // 面条类
  {
    name: "鸡丝面",
    staple: "面",
    ingredients: ["鸡肉", "青菜"],
    methods: ["煮", "炒"],
    description: "鲜美鸡丝配面条"
  },
  {
    name: "红烧牛肉面",
    staple: "面",
    ingredients: ["牛肉"],
    methods: ["炖", "煮"],
    description: "浓郁红烧牛肉面"
  },
  {
    name: "担担面",
    staple: "面",
    ingredients: ["猪肉", "青菜"],
    methods: ["煮"],
    description: "香辣担担面"
  },
  {
    name: "热干面",
    staple: "面",
    ingredients: ["芝麻酱"],
    methods: ["煮", "炒"],
    description: "武汉特色热干面"
  },
  {
    name: "阳春面",
    staple: "面",
    ingredients: ["青菜"],
    methods: ["煮"],
    description: "清淡鲜美阳春面"
  },
  // 馒头类
  {
    name: "馒头配酱菜",
    staple: "馒头",
    ingredients: ["黄瓜"],
    methods: ["蒸"],
    description: "简单美味早餐"
  },
  // 包子类
  {
    name: "鲜肉大包",
    staple: "包子",
    ingredients: ["猪肉"],
    methods: ["蒸"],
    description: "多汁鲜肉大包"
  },
  {
    name: "菜包",
    staple: "包子",
    ingredients: ["青菜", "胡萝卜", "黄瓜"],
    methods: ["蒸"],
    description: "清爽蔬菜包子"
  },
  {
    name: "小笼包",
    staple: "包子",
    ingredients: ["猪肉"],
    methods: ["蒸"],
    description: "一口一个小笼包"
  },
  // 炒菜类
  {
    name: "宫保鸡丁",
    staple: "其他",
    ingredients: ["鸡肉", "花生"],
    methods: ["炒"],
    description: "经典川菜宫保鸡丁"
  },
  {
    name: "鱼香肉丝",
    staple: "其他",
    ingredients: ["猪肉", "胡萝卜", "木耳"],
    methods: ["炒"],
    description: "酸甜可口鱼香肉丝"
  },
  {
    name: "清炒时蔬",
    staple: "其他",
    ingredients: ["青菜", "胡萝卜", "黄瓜"],
    methods: ["炒"],
    description: "清爽健康炒时蔬"
  },
  {
    name: "红烧排骨",
    staple: "其他",
    ingredients: ["猪肉"],
    methods: ["炖", "煎"],
    description: "软烂入味红烧排骨"
  },
  {
    name: "番茄炒蛋",
    staple: "其他",
    ingredients: ["鸡蛋", "番茄"],
    methods: ["炒"],
    description: "家常番茄炒蛋"
  },
  // 煮汤类
  {
    name: "鸡汤",
    staple: "其他",
    ingredients: ["鸡肉", "香菇"],
    methods: ["煮", "炖"],
    description: "滋补养生鸡汤"
  },
  {
    name: "冬瓜排骨汤",
    staple: "其他",
    ingredients: ["猪肉", "冬瓜"],
    methods: ["煮", "炖"],
    description: "清润解暑汤"
  },
  // 蒸煮类
  {
    name: "清蒸鱼",
    staple: "其他",
    ingredients: ["鱼"],
    methods: ["蒸"],
    description: "鲜嫩清蒸鱼"
  },
  {
    name: "蒸蛋羹",
    staple: "其他",
    ingredients: ["鸡蛋"],
    methods: ["蒸"],
    description: "嫩滑如丝蒸蛋羹"
  },
  {
    name: "红烧肉",
    staple: "其他",
    ingredients: ["猪肉"],
    methods: ["炖", "煎"],
    description: "肥而不腻红烧肉"
  },
  // 煎炸类
  {
    name: "煎荷包蛋",
    staple: "其他",
    ingredients: ["鸡蛋"],
    methods: ["煎"],
    description: "金黄溏心荷包蛋"
  },
  {
    name: "炸鸡翅",
    staple: "其他",
    ingredients: ["鸡肉"],
    methods: ["煎", "炸"],
    description: "香酥可口炸鸡翅"
  },
  {
    name: "糖醋里脊",
    staple: "其他",
    ingredients: ["猪肉"],
    methods: ["煎", "炒"],
    description: "酸甜可口糖醋里脊"
  }
]

module.exports = {
  foodLibrary
}
