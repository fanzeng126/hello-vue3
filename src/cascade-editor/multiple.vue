<template>
  <div class="cascade">
    <vt-cascade
      v-model="value"
      :options="options"
      prefix-icon="search"
      suffix-icon="down"
      clearable>
      <template v-slot:firstLevel="{options}">
        <ul>
          <li
            v-for="(item) in options"
            :key="item.value"
            :check="item.value === value[0]"
            @click="clickFirstLevel(item)">
            <input
              type="checkbox"
              :checked="item.check"
              @change="changeFirstLevel(item)"
              class="icon-left">
            <span>
              {{ item.label }}
            </span>
            <vt-icon
              v-if="!item.isLeaf"
              icon="right"
              class="icon-right" />
          </li>
        </ul>
      </template>
      <template v-slot:secondLevel="{options}">
        <ul>
          <li
            v-for="(item) in options"
            :key="item.value"
            :check="item.value === value[1]"
            @click="clickSecondLevel(item)">
            <input
              type="checkbox"
              :checked="item.check"
              @change="changeSecondLevel(item)"
              class="icon-left">
            <span>
              {{ item.label }}
            </span>
            <vt-icon
              v-if="!item.isLeaf"
              icon="right"
              class="icon-right" />
          </li>
        </ul>
      </template>
      <template v-slot:thirdLevel="{options}">
        <ul>
          <li
            v-for="(item) in options"
            :key="item.value"
            :check="item.value === value[2]"
            @click="clickThirdLevel(item)">
            <input
              type="checkbox"
              :checked="item.check"
              class="icon-left">
            <span>
              {{ item.label }}
            </span>
          </li>
        </ul>
      </template>
    </vt-cascade>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: [],
      options: [
        {
          value: 1,
          label: '一年级',
          isLeaf: false,
          children: [
            { value: 11, label: '一班', isLeaf: true },
            { value: 12, label: '二班', isLeaf: true },
            { value: 13, label: '三班', isLeaf: true },
            { value: 14, label: '四班', isLeaf: true },
            { value: 15, label: '五班', isLeaf: true },
            { value: 16, label: '六班', isLeaf: true },
            { value: 17, label: '七班', isLeaf: true },
            { value: 18, label: '八班', isLeaf: true },
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
            },
            { value: 191, label: '十班', isLeaf: true },
            { value: 192, label: '十一班', isLeaf: true },
            { value: 193, label: '十二班', isLeaf: true },
            { value: 194, label: '十三班', isLeaf: true },
            { value: 195, label: '十四班', isLeaf: true }
          ]
        },
        {
          value: 2,
          label: '二年级',
          isLeaf: false,
          children: [
            { value: 21, label: '一班', isLeaf: true },
            { value: 22, label: '二班', isLeaf: true },
            { value: 23, label: '三班', isLeaf: true },
            { value: 24, label: '四班', isLeaf: true },
            { value: 25, label: '五班', isLeaf: true },
            { value: 26, label: '六班', isLeaf: true },
            {
              value: 27,
              label: '七班',
              isLeaf: false,
              children: [
                { value: 271, label: '叶李', isLeaf: true },
                { value: 272, label: '叶明', isLeaf: true },
                { value: 273, label: '叶张', isLeaf: true },
                { value: 274, label: '叶华', isLeaf: true }
              ]
            },
            {
              value: 28,
              label: '八班',
              isLeaf: false,
              children: [
                { value: 281, label: '范李', isLeaf: true },
                { value: 282, label: '范明', isLeaf: true },
                { value: 283, label: '范张', isLeaf: true },
                { value: 284, label: '范华', isLeaf: true }
              ]
            }
          ]
        },
        { value: 3, label: '三年级', isLeaf: true },
        { value: 4, label: '四年级', isLeaf: true },
        { value: 5, label: '五年级', isLeaf: true },
        { value: 6, label: '六年级', isLeaf: true },
        { value: 7, label: '七年级', isLeaf: true },
        { value: 8, label: '初一年级', isLeaf: true },
        { value: 9, label: '初二年级', isLeaf: true },
        { value: 10, label: '初三年级', isLeaf: true },
        { value: 11, label: '高一年级', isLeaf: true },
        { value: 12, label: '高二年级', isLeaf: true },
        { value: 13, label: '高三年级', isLeaf: true },
        { value: 14, label: '大一年级', isLeaf: true },
        { value: 15, label: '大二年级', isLeaf: true },
        { value: 16, label: '大三年级', isLeaf: true },
        { value: 17, label: '大四年级', isLeaf: true }
      ]
    }
  },
  watch: {
  },
  methods: {
    clickFirstLevel (item) {
      console.log('clickFirstLevel', item)
      if (item.value !== this.value[0]) {
        this.value = [item.value]
      } else {
        this.value = [...this.value]
      }
    },
    changeFirstLevel (item) {
      if (!item.isLeaf) {
        console.log('changeFirstLevel', item)
        item.children.forEach(element => {
          element.check = event.target.checked
          this.changeFirstLevel(element)
        })
      }
    },
    clickSecondLevel (item) {
      if (item.value !== this.value[1]) {
        this.value.splice(1, this.value.length, item.value)
      } else {
        this.value = [...this.value]
      }
    },
    changeSecondLevel (item) {
      if (!item.isLeaf) {
        item.children.forEach(element => {
          element.check = event.target.checked
        })
      }
    },
    clickThirdLevel (item) {
      if (item.value !== this.value[0]) {
        this.value.splice(2, this.value.length, item.value)
      } else {
        this.value = [...this.value]
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
.cascade {
  font-size: 0px;
}
ul {
  padding: 0;
  li {
    position: relative;
    padding-left: 32px;
    cursor: pointer;
    .icon-left {
      position:absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 8px;
      fill: $primaryColor;
    }
    .icon-right {
      position:absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 8px;
    }
  }
  li:hover {
    background: $normalGreyBackground;
    color: $primaryColor;
  }
  li[check=true] {
    font-weight: 700;
    color: $primaryColor;
  }
}
</style>
