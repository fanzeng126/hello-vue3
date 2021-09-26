
/**
 * 父子结构的数据递归过去其抽象节点树
 * @param {*} ast 需要返回的对象
 * @param {*} a 第一个数据
 * @param  {...any} options 余下的数据
 * @returns ast
 *示例数据
 *  const options = {
      value: 0,
      label: '父节点',
      isLeaf: false,
      children: [
        {
          value: 1,
          label: '一年级',
          isLeaf: false,
          children: [
            {
              value: 19,
              label: '九班',
              isLeaf: false,
              children: [
                { value: 111, label: '小李', isLeaf: true },
                { value: 112, label: '小明', isLeaf: true },
                { value: 113, label: '小张', isLeaf: true },
                { value: 114, label: '小华', isLeaf: true }
              ]
            }
          ]
        }
      ]
    }
 */

export function useAst (level, parentKey, grandParentKey, ast, a, ...options) {
  const temp = { level, label: a.label, isLeaf: a.isLeaf, originalData: a }
  if (!a.isLeaf) temp.children = a.children
  if (level > 1 && level < 4) {
    temp.parentKey = parentKey
  }
  if (level === 3) {
    temp.grandParentKey = grandParentKey
  }
  ast[a.value] = temp
  if (options.length > 0) {
    return useAst(level, parentKey, grandParentKey, ast, ...options)
  } else {
    return ast
  }
}
