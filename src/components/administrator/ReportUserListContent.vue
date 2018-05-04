<template>
  <div class="ui container" >
    <div class="ui" style="margin-left: 15px">
      <label>Leader</label>
      <table class="ui celled padded table">
        <thead>
        <tr>
          <th>No</th>
          <th>Username</th>
          <th>Email</th>
          <th>No Telepon</th>
          <th>Kode Referensi</th>
          <th>Jumlah Relawan</th>
          <th>Poin</th>
          <th>Bergabung</th>
        </tr></thead>
        <tbody>
        <tr v-for="user,key in leaderList">
          <td>
            {{key+1}}
          </td>
          <td>
            {{user.username}}
          </td>
          <td>
            {{user.email}}
          </td>
          <td>
            {{user.phone_number}}
          </td>
          <td>
            {{user.reference_code}}
          </td>
          <td>
            {{user.user_reference.length}}
          </td>
          <td>
            {{user.leader_poin}}
          </td>
          <td>
            {{user.created_at_string}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="ui" style="margin-left: 15px">
      <label>Relawan</label>
      <table class="ui celled padded table">
        <thead>
        <tr>
          <th>No</th>
          <th>Username</th>
          <th>Email</th>
          <th>No Telepon</th>
          <th>Leader</th>
          <th>Bergabung</th>
        </tr></thead>
        <tbody>
        <tr v-for="user,key in relawanList">
          <td>
            {{key+1}}
          </td>
          <td>
            {{user.username}}
          </td>
          <td>
            {{user.email}}
          </td>
          <td>
            {{user.phone_number}}
          </td>
          <td>
            {{user.referenced_by.Username}}
          </td>
          <td>
            {{user.created_at_string}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
  import global_json from '../../assets/js/globalVariable.json';

  const {restAPI}=require('../../assets/js/setup');

  export default {
    name: "konten",
    data(){
      return{
        leaderList:[],
        relawanList:[]
      }
    },
    mounted () {
      this.loadData();
    },
    methods: {
      loadData(){
        this.$http.post(restAPI.reportuserleaderlist,{
          }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
          }
        ).then(function (response) {
          this.leaderList=response.body.results;
          console.log(response.body)
        }) .catch(err => {

        });
        this.$http.post(restAPI.reportuserrelawanlist,{
          }, {
            headers: {
              access_token: this.$session.get('access_token')
            },
          }
        ).then(function (response) {
          this.relawanList=response.body.results;
          console.log(response.body)
        }) .catch(err => {

        });
      },
      sort:function(s) {
        //if s == current sort, reverse
        if(s === this.currentSort) {
          this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSort = s;
      }
    },

    components: {
    },

  }
</script>

<style scoped>
  .chartXline{
    height: 220px;
  }
</style>
