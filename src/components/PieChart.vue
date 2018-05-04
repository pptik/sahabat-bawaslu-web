<script>
import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  props: {
    chartData: {
      type: Array | Object,
      required: false
    },
    chartLabels: {
      type: Array,
      required: true
    },
    chartTitle: {
      type: String,
      required: true
    },
    chartBackgroundcolor:{
      type: Array,
      required:true
    }
  },
  data () {
    return {
      options: {
        legend: {
          display: true
        },
        responsive: true
      }
    }
  },
  mounted () {
    this.renderChart({
      labels: this.chartLabels,
      datasets: [
        {
          label: this.chartTitle,
          backgroundColor: this.chartBackgroundcolor,
          data: this.chartData
        }
      ]
    }, this.options)
  }
}
</script>
