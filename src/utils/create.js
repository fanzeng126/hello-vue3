export function getUserList (val = '') {
  const firstLabel = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '刘', '范']
  const otherLabel = '阿擦拭的强无敌二哥仍然人金太阳甜言蜜语入荣耀不方便他仍然有人提建议明天潼不热特然跟任何人大青蛙多群无个人二个人出发点尔特投入和安定区是低V是的方式得我威丰味同仁堂核桃仁虎头热好人同一天一天与科目一教育基于六月苦与他人合同如火如荼和融通你让他阿斯顿撒旦请问二维个v冰川时代而我废物范围分为热尔不发个不停恶女问发给不放过部分'
  let rows = Math.ceil(Math.random() * 20)
  const userList = []
  while (rows > 0) {
    rows--
    const random1 = Math.floor(Math.random() * firstLabel.length)
    const random2 = Math.floor(Math.random() * otherLabel.length)
    userList.push({
      name: `${val}----${firstLabel[random1]}-${otherLabel.substring(random2, Math.ceil(Math.random() * 2) + random2)}`,
      id: rows
    })
  }
  return userList
}
