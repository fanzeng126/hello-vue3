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
            <span>
              {{ item.label }}
            </span>
            <vt-icon
              v-if="item.children"
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
            <span>
              {{ item.label }}
            </span>
            <vt-icon
              v-if="item.children"
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
            <span>
              {{ item.label }}
            </span>
            <vt-icon
              v-if="item.children"
              icon="right"
              class="icon-right" />
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
          children: [
            { value: 11, label: '一班' },
            { value: 12, label: '二班' },
            { value: 13, label: '三班' },
            { value: 14, label: '四班' },
            { value: 15, label: '五班' },
            { value: 16, label: '六班' },
            { value: 17, label: '七班' },
            { value: 18, label: '八班' },
            {
              value: 19,
              label: '九班',
              children: [
                { value: 111, label: '小李' },
                { value: 112, label: '小明' },
                { value: 113, label: '小张' },
                { value: 114, label: '小华' }
              ]
            },
            { value: 191, label: '十班' },
            { value: 192, label: '十一班' },
            { value: 193, label: '十二班' },
            { value: 194, label: '十三班' },
            { value: 195, label: '十四班' }
          ]
        },
        {
          value: 2,
          label: '二年级',
          children: [
            { value: 21, label: '一班' },
            { value: 22, label: '二班' },
            { value: 23, label: '三班' },
            { value: 24, label: '四班' },
            { value: 25, label: '五班' },
            { value: 26, label: '六班' },
            {
              value: 27,
              label: '七班',
              children: [
                { value: 271, label: '叶李' },
                { value: 272, label: '叶明' },
                { value: 273, label: '叶张' },
                { value: 274, label: '叶华' }
              ]
            },
            {
              value: 28,
              label: '八班',
              children: [
                { value: 281, label: '范李' },
                { value: 282, label: '范明' },
                { value: 283, label: '范张' },
                { value: 284, label: '范华' }
              ]
            }
          ]
        },
        { value: 3, label: '三年级' },
        { value: 4, label: '四年级' },
        { value: 5, label: '五年级' },
        { value: 6, label: '六年级' },
        { value: 7, label: '七年级' },
        { value: 8, label: '初一年级' },
        { value: 9, label: '初二年级' },
        { value: 10, label: '初三年级' },
        { value: 11, label: '高一年级' },
        { value: 12, label: '高二年级' },
        { value: 13, label: '高三年级' },
        { value: 14, label: '大一年级' },
        { value: 15, label: '大二年级' },
        { value: 16, label: '大三年级' },
        { value: 17, label: '大四年级' }
      ]
    }
  },
  watch: {
  },
  methods: {
    clickFirstLevel (item) {
      if (item.value !== this.value[0]) {
        this.value = [item.value]
      } else {
        this.value = [...this.value]
      }
    },
    clickSecondLevel (item) {
      if (item.value !== this.value[1]) {
        this.value.splice(1, this.value.length, item.value)
      } else {
        this.value = [...this.value]
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
    padding-left: 16px;
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
