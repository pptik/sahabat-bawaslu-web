<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    chartDataset: {
      type: Array | Object,
      required: false
    },
    chartTitle: {
      type: String,
      required: false
    },
    chartLabels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: true
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: this.chartTitle,
          borderColor: '#249EBF',
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          backgroundColor: 'transparent',
          data: this.chartData
        },
      ]
    }, this.options)
  }
}
</script>
