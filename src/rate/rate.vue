<template>
  <div class="box">
    <div
      v-for="(item, i) in data"
      :key="i">
      <span class="star" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [1, 2, 3, 4, 5]
    }
  }
}
</script>
<style lang="postcss" scoped>
.box {
  font-size: 0px;
  display: flex;
  flex-direction: row;
  & > div {
    & > span {
      display: inline-block;
    }
  }
}
span::before {
  display: block;
  content: "\e717";
  font-size: 10px;
  text-align: center;
  height: 16px;
  width: 16px;
  color: #333;
}
</style>
