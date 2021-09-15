<template>
  <div class="box">
    <div
      v-for="(item, i) in ticket"
      :key="i">
      <div>
        {{ item.title }}
        <span>
          <vt-icon
            icon="down"
            @click="click" />
        </span>
      </div>
      <div
        class="content"
        :style="{ height }">
        {{ item.content }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      height: 0,
      ticket: [
        {
          title: '我的标题',
          content: `平海书记许兄制道服，所以清其意而洁其身也。同年范仲淹请为赞云：
道家者流，衣裳楚楚。君子服之，逍遥是与。
虚白之室，可以居处。华胥之庭，可以步武。
岂无青紫，宠为辱主。岂无狐貉，骄为祸府。
重此如师，畏彼如虎。旌阳之孙，无忝于祖。 [4] 
印跋
后纸有文同、吴立礼、戴蒙、柳贯、胡助、刘魁、戴仁、司马垔、吴宽等多家题跋。钤鉴藏印：“高阳图书”、“寿国公图书印”、“东汉太尉祭酒家学”、“十六世孙主奉右胜谨藏图书”、“怀州军康记”等多方，另钤清梁清标、安岐诸印，又清乾隆、嘉庆、宣统内府诸印。 [2] `
        },
        {
          title: '我的世界',
          content: '我哈哈哈哈哈哈'
        }
      ]
    }
  },
  methods: {
    click () {
      console.log('展开')
      this.height = '200px'
    }
  }
}
</script>
<style lang="postcss" scoped>
.box {
  font-size: 0;
  position: relative;
  left: 20px;
  top: 20px;
  width: 200px;
  height: 200px;
  & > div {
    font-size: 14px;
  }
}
.content {
  will-change: height;
  overflow: hidden;
  transition: all .3s;
}
</style>
