<template>
  <base-layout>
    <template  v-slot:header>
      <h1>
        template
      </h1>
    </template>
    <template  v-slot:default>
      <h1>
        main
      </h1>
    </template>
    <template v-slot:footer>
      <h5>
        footer
      </h5>
    </template>
  </base-layout>
  <tode-list>
    <template v-slot:default="slotProps">
      <i class="fas fa-check"></i>
      <span class="green">{{ slotProps.item }}</span>
    </template>
  </tode-list>
</template>

<script>

import baseLayout from './base-layout.vue'
import todeList from './tode-list.vue'
export default {
  components: {
    'base-layout': baseLayout,
    'tode-list': todeList
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
