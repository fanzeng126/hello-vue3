<template>
  <input type="text" :value="location"  @change="changeName"/>
  <input type="number" :value="geolo.longitude"  @change="changeLong"/>
  <my-location />
</template>
<script>
import { provide, reactive, readonly, ref } from 'vue'
import myLocation from './my-location.vue'
export default {
  components: {
    'my-location': myLocation
  },
  setup (props) {
    const location = ref('北极')
    const geolo = reactive({
      longitude: 90,
      latitude: 135
    })
    provide('location', readonly(location))
    provide('geolocation', geolo)
    provide('updateLocation', (val) => {
      location.value = val
    })

    return {
      geolo,
      location
    }
  },
  methods: {
    changeName (e) {
      this.location = e.target.value
    },
    changeLong (e) {
      this.geolo.longitude = e.target.value
    }
  }
}
</script>
