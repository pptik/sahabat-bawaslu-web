<template>
  <div class="ui container" >
    <div v-if="loading" class="ui active inverted dimmer">
      <div class="ui text loader">Loading</div>
    </div>
    <div class="ui negative message" v-if="hasError">
      <p>{{errorText}}</p>
    </div>
    <div class="ui positive message" v-if="hasMessage">
      <p>{{messageText}}</p>
    </div>
    <div class="ui fluid category search" v-on:keyup.enter="searchUser" v-on:keyup.space="searchUser">
      <div class="ui icon input">
        <input v-model="searchString" class="prompt" type="text" placeholder="Cari User">
        <i class="search icon"></i>
      </div>
    </div>
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
        relawanList:[],
        searchString:'',
        errorText:'',
        hasError:false,
        loading:false,
        hasMessage:false,
        messageText:'',
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

        }) .catch(err => {

        });
      },
      searchUser(){
        this.hasError=false;
        if(this.searchString===""){
          this.loadData();
        }else {
          this.$http.post(restAPI.reportusersearchlist,{
              SearchString:this.searchString
            },{
              headers:{
                access_token:this.$session.get('access_token')
              },
            }
          ).then(function (data) {
            if(data.body.success === true){
              let results=data.body.results;
              if(results.length>0){
                this.leaderList=data.body.leaderlist;
                this.relawanList=data.body.relawanlist;
              }else {
                this.hasError=true;
                this.errorText="Tidak ditemukan data";
              }
            }else if(data.body.success === false){
              this.hasError=true;
              this.errorText=data.body.rm;
            }
            this.loading=false;
          });
        }
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
