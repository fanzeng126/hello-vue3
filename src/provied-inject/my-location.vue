<template>
  <div>
    <h1>
      当前用户定位
    </h1>
    <h2>
      {{ userLocation }}{{ userGeolocation.longitude }}{{ userGeolocation.latitude }}
    </h2>
    <br>
    <input type="text" :value="userLocation" @change="change" />
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  data () {
    return {}
  },
  setup (props) {
    const userLocation = inject('location', 'The Universe')
    const userGeolocation = inject('geolocation')
    const updateLocation = inject('updateLocation')

    return {
      userLocation,
      userGeolocation,
      updateLocation
    }
  },
  methods: {
    change (e) {
      this.updateLocation(e.target.value)
    }
  }
}
</script>
<style scoped>
</style>
