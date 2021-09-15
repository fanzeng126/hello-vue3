const data = [
  {
    value: 1,
    label: '一年级',
    isLeaf: false,
    parentId: -1,
    children: [
      { value: 11, label: '一班', isLeaf: true, parentId: 1 },
      { value: 12, label: '二班', isLeaf: true, parentId: 1 },
      { value: 13, label: '三班', isLeaf: true, parentId: 1 },
      { value: 14, label: '四班', isLeaf: true, parentId: 1 },
      { value: 15, label: '五班', isLeaf: true, parentId: 1 },
      { value: 16, label: '六班', isLeaf: true, parentId: 1 },
      { value: 17, label: '七班', isLeaf: true, parentId: 1 },
      { value: 18, label: '八班', isLeaf: true, parentId: 1 },
      {
        value: 19,
        label: '九班',
        isLeaf: false,
        parentId: 1,
        children: [
          { value: 111, label: '小李', isLeaf: true, parentId: 19, grandParentId: 1 },
          { value: 112, label: '小明', isLeaf: true, parentId: 19, grandParentId: 1 },
          { value: 113, label: '小张', isLeaf: true, parentId: 19, grandParentId: 1 },
          { value: 114, label: '小华', isLeaf: true, parentId: 19, grandParentId: 1 }
        ]
      },
      { value: 191, label: '十班', isLeaf: true, parentId: 1 },
      { value: 192, label: '十一班', isLeaf: true, parentId: 1 },
      { value: 193, label: '十二班', isLeaf: true, parentId: 1 },
      { value: 194, label: '十三班', isLeaf: true, parentId: 1 },
      { value: 195, label: '十四班', isLeaf: true, parentId: 1 }
    ]
  },
  {
    value: 2,
    label: '二年级',
    isLeaf: false,
    parentId: -1,
    children: [
      { value: 21, label: '一班', isLeaf: true, parentId: 2 },
      { value: 22, label: '二班', isLeaf: true, parentId: 2 },
      { value: 23, label: '三班', isLeaf: true, parentId: 2 },
      { value: 24, label: '四班', isLeaf: true, parentId: 2 },
      { value: 25, label: '五班', isLeaf: true, parentId: 2 },
      { value: 26, label: '六班', isLeaf: true, parentId: 2 },
      {
        value: 27,
        label: '七班',
        isLeaf: false,
        parentId: 2,
        children: [
          { value: 271, label: '叶李', isLeaf: true, parentId: 27, grandParentId: 2 },
          { value: 272, label: '叶明', isLeaf: true, parentId: 27, grandParentId: 2 },
          { value: 273, label: '叶张', isLeaf: true, parentId: 27, grandParentId: 2 },
          { value: 274, label: '叶华阿萨德请问多群无强无敌去', isLeaf: true, parentId: 27, grandParentId: 2 }
        ]
      },
      {
        value: 28,
        label: '八班',
        isLeaf: false,
        parentId: 2,
        children: [
          { value: 281, label: '范李', isLeaf: true, parentId: 28, grandParentId: 2 },
          { value: 282, label: '范明', isLeaf: true, parentId: 28, grandParentId: 2 },
          { value: 283, label: '范张', isLeaf: true, parentId: 28, grandParentId: 2 },
          { value: 284, label: '范华', isLeaf: true, parentId: 28, grandParentId: 2 }
        ]
      }
    ]
  },
  { value: 3, label: '三年级', isLeaf: true, parentId: -1 },
  { value: 4, label: '四年级', isLeaf: true, parentId: -1 },
  { value: 5, label: '五年级', isLeaf: true, parentId: -1 },
  { value: 6, label: '六年级', isLeaf: true, parentId: -1 },
  { value: 7, label: '七年级', isLeaf: true, parentId: -1 },
  { value: 8, label: '初一年级', isLeaf: true, parentId: -1 },
  { value: 9, label: '初二年级', isLeaf: true, parentId: -1 },
  { value: 10, label: '初三年级', isLeaf: true, parentId: -1 },
  { value: 11, label: '高一年级', isLeaf: true, parentId: -1 },
  { value: 12, label: '高二年级', isLeaf: true, parentId: -1 },
  { value: 13, label: '高三年级', isLeaf: true, parentId: -1 },
  { value: 14, label: '大一年级', isLeaf: true, parentId: -1 },
  { value: 15, label: '大二年级', isLeaf: true, parentId: -1 },
  { value: 16, label: '大三年级', isLeaf: true, parentId: -1 },
  { value: 17, label: '大四年级', isLeaf: true, parentId: -1 }
]

export default {
  data () {
    return {
      options: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(JSON.parse(JSON.stringify(data)))
        }, 500)
      }).then(res => {
        this.options = res
      })
    }
  }
}
