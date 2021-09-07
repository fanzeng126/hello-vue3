<template>
  <div>
    <v-switch :case="arr">
      <template v-slot:head>
        <p>1</p>
      </template>
      <template v-slot:foot>
        <p>2</p>
      </template>
      <template v-slot:default>
        <p>3</p>
      </template>
    </v-switch>
  </div>
</template>

<script>
import child from './switch.vue'
export default {
  components: {
    'v-switch': child
  },
  data () {
    return {
      arr: ['head']
    }
  }
}
</script>
