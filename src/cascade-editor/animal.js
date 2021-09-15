const data = [
  {
    value: 1,
    label: '一年级',
    isLeaf: true,
    parentId: -1
  },
  {
    value: 2,
    label: '二年级',
    isLeaf: true,
    parentId: -1
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
