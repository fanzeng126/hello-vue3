<template>
  <p>
    <slot
      name="head"
      :student="teacher" />
    <slot
      name="foot"
      :student="school" />
    <slot :student="student" />
  </p>
</template>
<script>
export default {
  data () {
    return {
      student: { name: '范增' },
      teacher: { name: '叶天旭' },
      school: { name: '罗宝寺' }
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
