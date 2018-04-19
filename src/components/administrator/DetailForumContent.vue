<template>
  <span>
    <h1>Forum Detail</h1>
    <div v-if="loading" class="ui active inverted dimmer">
      <div class="ui text loader">Loading</div>
    </div>
    <div class="ui negative message" v-if="hasError">
          <p>{{errorText}}</p>
    </div>
    <div class="ui positive message" v-if="hasMessage">
          <p>{{messageText}}</p>
    </div>

     <div class="ui segment comments">
       <div class="ui bottom right attached label" >
         <a class="ui label" v-for="tag,key in tagList">
           {{tag}}
         </a>
       </div>
      <a v-if="status===0" class="ui green ribbon label">Aktif</a>
      <a v-if="status===1" class="ui red ribbon label">Non Aktif</a>
      <h3>{{title}}</h3>
      <div class="comment">
        <a class="avatar">
          <img v-bind:src="displayPicture">
        </a>
        <div class="content">
          <a class="author">{{username}}</a>
          <div class="metadata">
            <span class="date">{{date}} </span>
          </div>
          <div class="action">
            <a class="ui blue label">
            <i class="comment icon"></i><label>{{comment}}</label>
          </a>
            <a class="ui red label">
            <i class="angle down icon"></i><label>{{downvote}}</label>
          </a>
          <a class="ui green label">
            <i class="angle up icon"></i><label>{{upvote}}</label>
          </a>
          <a class="ui yellow label">
            <i class="star outline icon" ></i><label>{{favorite}}</label>
          </a>
          <a v-if="status===1" class="ui green label" v-on:click.prevent="aktivasiForum(ForumID,0)">
            <label>Aktivasi</label>
          </a>
          <a v-if="status===0" class="ui red label" v-on:click.prevent="aktivasiForum(ForumID,1)">
            <label>Non aktiv</label>
          </a>
          </div>
        </div>
      </div>
    </div>
    <div class="ui horizontal divider">
      {{answerList.length}} Jawaban
    </div>
    <div v-for="answer,key in answerList" class="ui comments">
       <div class="ui divider"></div>
      <div class="comment">
        <a class="avatar">
          <img v-bind:src="answer.user_detail.display_picture">
        </a>
        <div class="content">
          <a class="author">{{answer.post_by.username}}</a>
          <div class="metadata">
            <span class="date">dijawab {{answer.created_at_from_now}} </span>
          </div>
          <div v-if="!answer.loadmore" class="text">
            {{answer.synopsis}}....
            <br/>
            <button v-on:click.prevent="readMore(key)" class="astext"><b>Read More...</b></button>
          </div>
          <div v-if="answer.loadmore" class="text">
            {{answer.answer_content}}....
          </div>
          <div class="action">
            <a class="ui red label">
            <i class="angle down icon"></i><label>{{answer.downvote}}</label>
          </a>
          <a class="ui green label">
            <i class="angle up icon"></i><label>{{answer.upvote}}</label>
          </a>
          <a class="ui yellow label">
            <i class="star outline icon" ></i><label>{{answer.favorite}}</label>
          </a>
          </div>
        </div>



        <div v-if="answer.hasComment"  class="ui comments" >
          <button v-if="!answer.showComment" v-on:click.prevent="togglecomment(key)" class="mini ui primary basic button" ><b>Lihat Komentar</b></button>
          <div v-if="answer.showComment" v-for="comment,key in answer.reply"class="comment">
            <a class="avatar">
              <img v-bind:src="comment.user_detail.display_picture">
            </a>
            <div class="content">
              <a class="author">{{comment.post_by.username}}</a>
              <div class="metadata">
                <span class="date">dijawab {{comment.created_at_from_now}} </span>
              </div>
              <div v-if="!comment.loadmore" class="text">
                {{comment.synopsis}}....
                <br/>
                <button v-on:click.prevent="readMore(key)" class="astext"><b>Read More...</b></button>
              </div>
              <div v-if="comment.loadmore" class="text">
                {{comment.comment}}....
              </div>
              <div class="action">
                <a class="ui red label">
                  <i class="angle down icon"></i><label>{{comment.downvote}}</label>
                </a>
                <a class="ui green label">
                  <i class="angle up icon"></i><label>{{comment.upvote}}</label>
                </a>
                <a class="ui yellow label">
                  <i class="star outline icon" ></i><label>{{comment.favorite}}</label>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button v-if="answerList.length>0" :disabled="noMore== true" v-on:click.prevent="loadForums()" class="ui button blue" style="width: 100%"><b>Load More</b></button>

  </span>
</template>

<script>
  const {restAPI}=require('../../assets/js/setup');
  const {globalSetup}=require('../../assets/js/setup');

  export default {
    name: "konten",
    data(){
      return{
        ForumID : this.$route.params.ForumID,
        errorText:'',
        hasError:false,
        loading:false,
        title:'',
        desc:'',
        hasMessage:false,
        messageText:'',
        noMore:false,
        status:0,
        displayPicture:"",
        username:"",
        date:"",
        downvote:0,
        upvote:0,
        favorite:0,
        comment:0,
        tagList:[],
        answerList:[],
        Skip:0,
      }
    },

    created(){
      this.loadForums();
      this.loadAnswers();
    },
    mounted() {
      this.reset();
    },
    methods: {
      loadForums(){
        this.$http.post(restAPI.detailforum,{
          ForumID:this.ForumID
        },{
            headers:{
              access_token:this.$session.get('access_token')
            },
          }
        ).then(function (data) {

          if(data.body.success === true){
            this.reset();
            let results=data.body.results;
            this.title=results.title;
            this.status=results.status;
            this.upvote=results.upvote;
            this.downvote=results.downvote;
            this.favorite=results.favorite;
            this.username=results.post_by.username;
            this.date=results.created_at;
            this.displayPicture=results.user_detail.display_picture;
            this.tagList=results.tags;
            this.comment=results.comment;
            console.log(this.tagList)


          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
          this.loading=false;
        });
      },
      loadAnswers(){
        this.$http.post(restAPI.forumanswerlist,{
          ForumID:this.ForumID,
          Skip:this.Skip
        },{
            headers:{
              access_token:this.$session.get('access_token')
            },
          }
        ).then(function (data) {

          if(data.body.success === true){
            this.reset();
            let results=data.body.results;
            if(results.length>0){
              for(let i=0;i<results.length;i++){
                results[i].showComment=false;

                if(results[i].reply.length>0)results[i].hasComment=true;
                else results[i].hasComment=false;
              }
              this.answerList=this.answerList.concat(results);
              this.reset();
              this.skip=this.skip+5;
              if (results.length<5){
                this.noMore=true;
              }

            }
            if(results.length===0){
              this.noMore=true;
            }



            console.log(results);
            this.answerList=results;



          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
          this.loading=false;
        });
      },
      aktivasiForum(forumID,x){
        let aktivasiAPI="";
        if(x===0)aktivasiAPI=restAPI.aktivasiforum;
        if(x===1)aktivasiAPI=restAPI.deaktivasiforum;
        this.$http.post(aktivasiAPI,{
          ForumID:forumID
        },{
            headers:{
              access_token:this.$session.get('access_token')
            },
          }
        ).then(function (data) {
          console.log(data)
          if(data.body.success === true){
            let results=data.body.results;
            console.log(results);
            this.status=results.status;
          }else if(data.body.success === false){
            this.hasError=true;
            this.errorText=data.body.rm;
          }
          this.loading=false;
        });
      },
      readMore(index){
        this.answerList[index].loadmore=true;
      },
      togglecomment(index){
        this.answerList[index].showComment=true;
      },
      reset() {
        // reset form to initial state
        this.hasError = false;
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
