<template>
  <div class="ui container" >
    Mulai :<datePicker v-model="startDate"></datePicker>
    Akhir :<datePicker v-model="endDate"></datePicker>
    <button  v-on:click.prevent="searchActivity()" class="ui mini button blue"><b>Cari Data</b></button>
    <div>

      <table class="ui very basic collapsing celled table">
        <tbody>
        <tr>
          <td>
            <div class="content">
              Tanggal
            </div>
          </td>
          <td>
            {{tanggalMulaiText}} s/d {{tanggalAkhirText}}
          </td>
        </tr>
        <tr>
          <td>
            <div class="content">
              Materi
            </div>
          </td>
          <td>
            {{jumlahAktivitasMateri}}
          </td>
        </tr>
        <tr>
          <td>
            <div class="content">
              Berita
            </div>
          </td>
          <td>
            {{jumlahAktivitasBerita}}
          </td>
        </tr>
        <tr>
          <td>
            <div class="content">
              Forum
            </div>
          </td>
          <td>
            {{jumlahAktivitasForum}}
          </td>
        </tr>
        <tr>
          <td>
            <div class="content">
              Total
            </div>
          </td>
          <td>
            {{jumlahAktivitasTotal}}
          </td>
        </tr>


        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
  import global_json from '../../assets/js/globalVariable.json';
  import datePicker from 'vuejs-datepicker';
  import moment from 'moment';

  const {restAPI}=require('../../assets/js/setup');

  export default {
    name: "konten",
    data(){
      return{
        activityList:[],
        startDate: new Date(),
        endDate: new Date(),
        tanggalMulaiText:"",
        tanggalAkhirText:"",
        jumlahAktivitasTotal:0,
        jumlahAktivitasMateri:0,
        jumlahAktivitasBerita:0,
        jumlahAktivitasForum:0,
      }
    },
    mounted () {
      this.loadData();
    },
    methods: {
      loadData(){

      },
      searchActivity(){

        let tanggalMulai=moment(this.startDate);
        tanggalMulai.locale('id');
        this.tanggalMulaiText=tanggalMulai.format('LL');
        let tanggalAkhir=moment(this.endDate);
        tanggalAkhir.locale('id');
        this.tanggalAkhirText=tanggalAkhir.format('LL');

        this.$http.post(restAPI.reportuseractivitysearchlist,{
            StartDate:this.startDate,
            EndDate:this.endDate
          },{
            headers:{
              access_token:this.$session.get('access_token')
            },
          }
        ).then(function (data) {
          if(data.body.success === true){
            console.log(data.body)
            if(data.body.summary.length>0){
              let summary=data.body.summary;
              this.jumlahAktivitasTotal=0;
              for(let i=0;i<summary.length;i++){
                this.jumlahAktivitasTotal+=summary[i].count;
                switch (summary[i]._id){
                  case 1:
                    this.jumlahAktivitasMateri=summary[i].count;
                    break;
                  case 2:
                    this.jumlahAktivitasBerita=summary[i].count;
                    break;
                  case 3:
                    this.jumlahAktivitasForum=summary[i].count;
                    break;
                }
              }
            }
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
          this.loading=false;
        });
      }
    },

    components: {
      datePicker
    },

  }
</script>

<style scoped>
  .chartXline{
    height: 220px;
  }
</style>
