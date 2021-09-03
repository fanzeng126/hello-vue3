<template>
  <div class="main">
    <table  cellspacing="0" >
      <thead>
      <tr>
          <th class="cell">1 </th>
          <th class="cell">2 </th>
          <th class="cell">3</th>
          <th class="cell">4 </th>
          <th class="cell">5 </th>
          <th class="cell">6 </th>
          <th class="cell">7 </th>
          <th class="cell">8 </th>
          <th class="cell">9 </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in 30" :key="index">
          <td class="cell">a </td>
          <td class="cell">b </td>
          <td class="cell">c </td>
          <td class="cell">d </td>
          <td class="cell">e </td>
          <td class="cell">d </td>
          <td class="cell">g </td>
          <td class="cell">h </td>
          <td class="cell">i </td>
      </tr>
      </tbody>
  </table>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="postcss" scoped>
.cell {
  padding: 4px;
  border: 1px solid #666;
}
.main {
  height: 500px;
  width: 500px;
  overflow: auto;
}
td, th {
    /* 设置td,th宽度高度 */
    border:1px solid gray;
    width:100px;
    height:30px;
}
th {
    background-color:lightblue;
}
table {
    table-layout: fixed;
    width: 200px; /* 固定宽度 */
}
td:first-child, th:first-child {
    position:sticky;
    left:0; /* 首行永远固定在左侧 */
    z-index:1;
    background-color:lightpink;
}
thead tr th {
    position:sticky;
    top:0; /* 列首永远固定在头部  */
}
th:first-child{
    z-index:2;
    background-color:lightblue;
}
</style>
