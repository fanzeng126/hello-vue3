<template>
  <input
    v-focus
    type="text">
  <textarea
    v-focus
    type="text" />
  <div
    v-mussel-scrollbar
    class="scroll-box">
    <p>
      x12345
    </p>
    <br>
    <p>
      x12345
    </p>
    <br>
    <p>
      x12345
    </p>
    <br>
    <p>
      x12345
    </p>
    <br>
    <p>
      x12345
    </p>
    <br>
    <p>
      x12345
    </p>
    <br>
    <p>
      x12345
    </p>
    <br>
  </div>
</template>
<script>
export default {
  directives: {
    focus: function mounted (el) {
      el.focus()
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="postcss" scoped>
.scroll-box {
  height: 600px;
  width: 400px;
  border: 1px solid rebeccapurple;
  left: 200px;
  position: relative;
  overflow: auto;
  p {
    font-size: 32px;
  }
  br {
        font-size: 0;
        height: 0;
  }
}
</style>
