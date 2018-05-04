<template>
  <div class="ui container" >
    <div class="ui segments" style="margin-left: 15px">
      <h3>Jumlah User</h3>
      <div class="ui grid">
        <div class="four wide column">
          <div class="ui segment">
            <a class="ui red ribbon label">Sepanjang Waktu</a>
            <pie-chart v-if="allTimeUsersLoaded" :chart-backgroundcolor="allTimeUsersBackgroundColor" :chart-data="allTimeUsersData" :chart-labels="allTimeUsersLabel" :chart-title="allTimeUsersTitle"></pie-chart>
          </div>
        </div>
        <div class="four wide column">
          <div class="ui segment">
            <a class="ui red ribbon label">Per Tahun</a>
            <pie-chart v-if="yearlyUsersLoaded" :chart-backgroundcolor="yearlyUsersBackgroundColor" :chart-data="yearlyUsersData" :chart-labels="yearlyUsersLabel" :chart-title="yearlyUsersTitle"></pie-chart>
          </div>
        </div>
        <div class="eight wide column">
          <div class="ui segment">
            <a class="ui red ribbon label">Per Bulan</a>
            <line-chart class="chartXline"  v-if="monthlyUsersLoaded"  :chart-dataset="monthlyUsersDataset" :chart-labels="monthlyUsersLabel" :chart-title="monthlyUsersTitle"></line-chart>
          </div>
        </div>
      </div>
    </div>
    <div class="ui segments" style="margin-left: 15px">
      <h3>Jumlah Aktivitas</h3>
      <div class="ui grid">
        <div class="four wide column">
          <div class="ui segment">
            <a class="ui red ribbon label">Sepanjang Waktu</a>
            <pie-chart v-if="allTimeUsersActivityLoaded" :chart-backgroundcolor="allTimeUsersActivityBackgroundColor" :chart-data="allTimeUsersActivityData" :chart-labels="allTimeUsersActivityLabel" :chart-title="allTimeUsersActivityTitle"></pie-chart>
          </div>
        </div>
        <div class="four wide column">
          <div class="ui segment">
            <a class="ui red ribbon label">Per Tahun</a>
            <pie-chart v-if="yearlyUsersActivityLoaded" :chart-backgroundcolor="yearlyUsersActivityBackgroundColor" :chart-data="yearlyUsersActivityData" :chart-labels="yearlyUsersActivityLabel" :chart-title="yearlyUsersActivityTitle"></pie-chart>
          </div>
        </div>
        <div class="eight wide column">
          <div class="ui segment">
            <a class="ui red ribbon label">Per Bulan</a>
            <line-chart class="chartXline"  v-if="monthlyUsersActivityLoaded"  :chart-dataset="monthlyUsersActivityDataset" :chart-labels="monthlyUsersActivityLabel" :chart-title="monthlyUsersActivityTitle"></line-chart>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import global_json from '../../assets/js/globalVariable.json';
  import PieChart from '../PieChart.vue'
  import LineChart from '../MultipleLineChart.vue'

  const {restAPI}=require('../../assets/js/setup');

  export default {
    name: "konten",
    data(){
      return{
        allTimeUsersData:[],
        allTimeUsersLabel:[],
        allTimeUsersBackgroundColor:[],
        allTimeUsersTitle:"",
        allTimeUsersLoaded:false,
        yearlyUsersData:[],
        yearlyUsersLabel:[],
        yearlyUsersBackgroundColor:[],
        yearlyUsersTitle:"",
        yearlyUsersLoaded:false,
        monthlyUsersDataset:[],
        monthlyUsersLabel:[],
        monthlyUsersBackgroundColor:[],
        monthlyUsersTitle:"",
        monthlyUsersLoaded:false,
        allTimeUsersActivityData:[],
        allTimeUsersActivityLabel:[],
        allTimeUsersActivityBackgroundColor:[],
        allTimeUsersActivityTitle:"",
        allTimeUsersActivityLoaded:false,
        yearlyUsersActivityData:[],
        yearlyUsersActivityLabel:[],
        yearlyUsersActivityBackgroundColor:[],
        yearlyUsersActivityTitle:"",
        yearlyUsersActivityLoaded:false,
        monthlyUsersActivityData:[],
        monthlyUsersActivityLabel:[],
        monthlyUsersActivityBackgroundColor:[],
        monthlyUsersActivityTitle:"",
        monthlyUsersActivityLoaded:false,
        monthlyUsersActivityDataset:[]
      }
    },
    mounted () {
      this.requestData();
    },
    methods: {
      requestData(){
        this.$http.post(restAPI.reportuseralltime,{
          }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
          }
        ).then(function (response) {

          this.allTimeUsersData=response.body.results.map(result=>result.count);

          this.allTimeUsersLabel=response.body.results.map(result=>result.name);
          this.allTimeUsersBackgroundColor=response.body.results.map(result=>result.backgroundColor);
          this.allTimeUsersTitle="Jumlah User Sampai Sekarang";
          this.allTimeUsersLoaded=true
        }) .catch(err => {

        });
        this.$http.post(restAPI.reportuseryearly,{
          }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
          }
        ).then(function (response) {
          this.yearlyUsersData=response.body.results.map(result=>result.count);
          this.yearlyUsersLabel=response.body.results.map(result=>result._id);
          this.yearlyUsersBackgroundColor=response.body.results.map(result=>result.backgroundColor);
          this.yearlyUsersTitle="Jumlah User Pertahun";
          this.yearlyUsersLoaded=true
        }) .catch(err => {

        });
        this.$http.post(restAPI.reportusermonthly,{
          }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
          }
        ).then(function (response) {
          let data={};
          data.label="Jumlah User Perbulan";
          data.data=response.body.results.map(result=>result.count);
          data.borderColor= '#249EBF';
          data.pointBackgroundColor= 'white';
          data.borderWidth= 1;
          data.pointBorderColor= '#249EBF';
          data.backgroundColor= 'transparent';
          this.monthlyUsersDataset.push(data);
          this.monthlyUsersLabel=response.body.results.map(result=>result.month+" "+result._id.year);
          this.monthlyUsersLoaded=true;
        }) .catch(err => {

        });

        this.$http.post(restAPI.reportuseractivityalltime,{
          }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
          }
        ).then(function (response) {

          this.allTimeUsersActivityData=response.body.results.map(result=>result.count);

          this.allTimeUsersActivityLabel=response.body.results.map(result=>result.name);
          this.allTimeUsersActivityBackgroundColor=response.body.results.map(result=>result.backgroundColor);
          this.allTimeUsersActivityTitle="Jumlah User Sampai Sekarang";
          this.allTimeUsersActivityLoaded=true
        }) .catch(err => {

        });
        this.$http.post(restAPI.reportuseractivityyearly,{
          }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
          }
        ).then(function (response) {

          this.yearlyUsersActivityData=response.body.results.map(result=>result.count);

          this.yearlyUsersActivityLabel=response.body.results.map(result=>result._id.year);
          this.yearlyUsersActivityBackgroundColor=response.body.results.map(result=>result.backgroundColor);
          this.yearlyUsersActivityTitle="Jumlah Aktivitas User per bulan";
          this.yearlyUsersActivityLoaded=true
        }) .catch(err => {

        });
        this.$http.post(restAPI.reportuseractivitymonthly,{
          }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
          }
        ).then(function (response) {
          let data={};
          data.label="Jumlah Aktivitas Perbulan";
          data.data=response.body.results.map(result=>result.count);
          data.borderColor= '#249EBF';
          data.pointBackgroundColor= 'white';
          data.borderWidth= 1;
          data.pointBorderColor= '#249EBF';
          data.backgroundColor= 'transparent';
          this.monthlyUsersActivityDataset.push(data);
          console.log(this.monthlyUsersActivityDataset)
          this.monthlyUsersActivityLabel=response.body.results.map(result=>result.month+" "+result._id.year);
          this.monthlyUsersActivityLoaded=true;
        }) .catch(err => {

        });
      }
    },
    components: {
      PieChart,
      LineChart
    },

  }
</script>

<style scoped>
  .chartXline{
    height: 220px;
  }
</style>
