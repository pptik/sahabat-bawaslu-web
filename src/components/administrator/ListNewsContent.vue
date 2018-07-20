<template>
  <span>
    <h1>News List</h1>
    <div v-if="loading" class="ui active inverted dimmer">
             <div class="ui text loader">Loading</div>
           </div>
    <div class="ui negative message" v-if="hasError">
          <p>{{errorText}}</p>
    </div>
    <div class="ui positive message" v-if="hasMessage">
          <p>{{messageText}}</p>
    </div>
    <div v-for="news,key in newsList" class="ui segment comments">
      <a v-if="news.status===0" class="ui green ribbon label">Aktif</a>
      <a v-if="news.status===1" class="ui red ribbon label">Non Aktif</a>
      <h3>{{news.title}}</h3>
      <p>
        {{news.content}}
      </p>
      <div class="comment">
        <a class="avatar">
          <img v-bind:src="news.user_detail.display_picture">
        </a>
        <div class="content">
          <a class="author">{{news.post_by.username}}</a>
          <div class="metadata">
            <span class="date">{{news.created_at_string}} </span>
          </div>
          <div class="action">
            <a class="ui red label">
            <i class="angle down icon"></i><label>{{news.downvote}}</label>
          </a>
          <a class="ui green label">
            <i class="angle up icon"></i><label>{{news.upvote}}</label>
          </a>
          <a class="ui yellow label">
            <i class="star outline icon" ></i><label>{{news.favorite}}</label>
          </a>
          <a v-if="news.status===1" class="ui green label" v-on:click.prevent="aktivasiForum(news._id,key,0)">
            <label>Aktivasi</label>
          </a>
          <a v-if="news.status===0" class="ui red label" v-on:click.prevent="aktivasiForum(news._id,key,1)">
            <label>Non aktiv</label>
          </a>
          </div>
        </div>
      </div>
    </div>
    <button v-if="newsList.length>0" :disabled="noMore== true" v-on:click.prevent="loadNews()" class="ui button blue" style="width: 100%"><b>Load More</b></button>

  </span>
</template>

<script>
  const {restAPI}=require('../../assets/js/setup');
  const {globalSetup}=require('../../assets/js/setup');

  export default {
    name: "konten",
    data(){
      return{
        searchString:'',
        errorText:'',
        hasError:false,
        loading:false,
        title:'',
        desc:'',
        hasMessage:false,
        messageText:'',
        skip:0,
        newsList:[],
        noMore:false
      }
    },

    created(){
      this.loadNews();
    },
    mounted() {
      this.reset();
    },
    methods: {
      loadNews(){
        this.$http.post(restAPI.newslist,{
          Skip:this.skip
        },{
            headers:{
              access_token:this.$session.get('access_token')
            },
          }
        ).then(function (data) {
          if(data.body.success === true){
            let results=data.body.results;
            if(results.length>0){
              this.newsList=this.newsList.concat(results);
              this.reset();
              this.skip=this.skip+5;
              console.log(this.newsList);
              if (results.length<5){
                this.noMore=true;
              }
            }
            if(results.length===0){
              this.noMore=true;
            }
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
          this.loading=false;
        });
      },
      aktivasiForum(newsID,key,x){
        let aktivasiAPI="";
        if(x===0)aktivasiAPI=restAPI.aktivasinews;
        if(x===1)aktivasiAPI=restAPI.deaktivasinews;
        this.$http.post(aktivasiAPI,{
          NewsID:newsID
        },{
            headers:{
              access_token:this.$session.get('access_token')
            },
          }
        ).then(function (data) {
          if(data.body.success === true){
            let results=data.body.results;
            console.log(results);
            this.newsList[key].status=results.status;
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
          this.loading=false;
        });
      },
      reset() {
        // reset form to initial state
        this.hasError = false;
        this.title="";
        this.desc="";
      }
    }
  }
</script>

<style scoped>
  .astext {
    background:none;
    border:none;
    margin:0;
    padding:0;
  }
</style>
