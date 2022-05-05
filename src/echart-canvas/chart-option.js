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
      YAlign: 30,
      barAlign: 35,
      barWidth: 10,
      barMargin: 5,
      series: [
        [110, 120, 130],
        [156, 20, 30],
        [210, 130, 30],
        [10, 0, 19],
        [25, 36, 58],
        [98, 32, 0],
        [10, 0, 19],
        [25, 36, 58],
        [98, 32, 0]
      ],
      colors: ['#00FF74', '#00ABFF', '#FFB700']
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
