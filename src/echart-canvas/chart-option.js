export default {
  data () {
    return {
      gridPadding: {
        top: 10,
        left: 10,
        bottom: 10,
        right: 10
      },
      xAlign: 60,
      YAlign: 30
    }
  },
  computed: {
    yBottom () {
      return this.gridPadding.bottom + this.YAlign
    },
    xLeft () {
      return this.gridPadding.left + this.xAlign
    }

  }
}
