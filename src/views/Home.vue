<template>
  <div class="home">
    <c-study ref="currentRef" :user="user" />
    <!-- <button @click="changeUser">
      切换名称
    </button> -->
  </div>
</template>

<script>
import { ref, watch, provide, onMounted } from 'vue'
import study from '../set-up/parent.vue'
export default {
  components: {
    'c-study': study
  },
  setup () {
    provide('name', '范增')
    provide('age', {
      max: 100,
      min: 18
    })
    const user = ref(0)
    provide('user', user)

    const currentRef = ref(null)

    onMounted(function () {
      console.log('currentRef', currentRef.value)
    })

    const changeUser = function () {
      user.value = Math.ceil(Math.random() * 100)
    }
    watch(user, function (val) {
      console.log('val', val)
    })
    return {
      user,
      changeUser,
      currentRef
    }
  }
}
</script>
<style lang="postcss" scoped>
.home {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
