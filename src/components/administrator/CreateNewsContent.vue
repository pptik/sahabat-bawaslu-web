<template>
  <span>
    <h1>Buat Berita</h1>
    <div v-if="loading" class="ui active inverted dimmer">
             <div class="ui text loader">Loading</div>
           </div>
    <div class="ui negative message" v-if="hasError">
          <p>{{errorText}}</p>
    </div>
    <div class="ui positive message" v-if="hasMessage">
          <p>{{messageText}}</p>
    </div>
    <form class="ui form">
    <div class="field">
          <div>Judul</div>
          <input type="text" autocomplete="title" placeholder="Tulis Judul" v-model="title"/>
        </div>
       <div class="field">
          <div>Sinopsis</div>
          <textarea  v-model="desc" name="comment" placeholder="Tulis Deksripsi" rows="3" ></textarea>
        </div>
     <div class="field">
       <label>Konten</label>
       <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="content">
       </vue-editor>
     </div>
     <div class="field">
       <label>Hashtag</label>
       <input type="text" placeholder="Hashtag pisahkan dengan koma tanpa #" v-model="hashtag"/>
     </div>
     <div class="ui checkbox">
      <input type="checkbox" id="checkbox" v-model="isChallenge">
      <label for="checkbox">Check bila challenge</label>
     </div>
    <div id="challenge" class="field" style="display: none">    
     <div class="field">
       <label>Poin Challenge</label>
       <input type="text" placeholder="Poin Challenge" v-model="poin"/>
     </div>
     <div class="field">
       <label>Kadaluarsa Challenge</label>
       <input type="text" id="datepicker" placeholder="Expire" v-model="expire" name="expire" />
     </div>
    </div>
      <div class="container">
          <button v-on:click.prevent="kirimNews" type="button" class="small ui blue button">Submit</button>
        </div>
    </form>
  </span>
</template>

<script>
  const {restAPI}=require('../../assets/js/setup');
  const {globalSetup}=require('../../assets/js/setup');
  import { VueEditor } from 'vue2-editor'
  export default {
    name: "konten",
    data(){
      return{
        errorText:'',
        hasError:false,
        loading:false,
        hasMessage:false,
        isChallenge:false,
        messageText:'',
        title:'',
        content:'',
        desc:'',
        poin: '',
        expire: '',
        hashtag: '',
        hashtagList: []
      }
    },
    components: {
      VueEditor
    },
    created(){

    },
    mounted() {
      var vm = this
      this.reset();
      //datepicker
      $( function() {
        $( "#datepicker" ).datepicker({ 
          dateFormat: 'dd/mm/yy',
          onSelect:function(selectedDate, datePicker) {            
            vm.expire = selectedDate;
          }
        });
      } )
      $("#checkbox").click(function() {
        if($("#checkbox").is(':checked'))
          $("#challenge").css({"display":""});  // checked
        else
          $("#challenge").css({"display":"none"});  // unchecked
      });

      
    },
    methods: {
      kirimNews(){
        //this.loading=true;
        let errorCheck=false;
        this.hasMessage=false;
        this.hasError=false;
        if(this.title===""){
          errorCheck=true;
          this.hasError=true;
          this.errorText='Judul tidak boleh kosong';
        }
        if(this.content===""){
          errorCheck=true;
          this.hasError=true;
          this.errorText='Konten tidak boleh kosong';
        }
        if(this.desc===""){
          errorCheck=true;
          this.hasError=true;
          this.errorText='Silahkan Isi Deskripsi Singkat';
        }
        if(this.hashtag===""){
            // errorCheck=true;
            // this.hasError=true;
            // this.errorText='Silahkan Isi Hashtag';
            this.hashtagList.push('');
          }else{ 
            var string = this.hashtag;
            var split=string.split(",");
              for(var i=0; i<split.length; i++){
                this.hashtagList.push(split[i]);
              } 
          }
        if(this.isChallenge===true){
          if(this.poin===""){
            errorCheck=true;
            this.hasError=true;
            this.errorText='Silahkan Isi Poin Challange';
          }
          if(this.expire===""){
            errorCheck=true;
            this.hasError=true;
            this.errorText='Silahkan Isi Kadaluarsa Challange';
          }
        }

        if(!errorCheck){
          let news = {
              Title: this.title,
              Content:this.content,
              Desc:this.desc,
              Tags: this.hashtagList
            }

          if(this.isChallenge) {            
            news = {
              Title: this.title,
              Content:this.content,
              Desc:this.desc,
              IsChallenge: "true",
              ChallengePoin: this.poin,
              ChallengeExpire: this.expire,
              Tags: this.hashtagList
            }
          } 
          
          //alert(JSON.stringify(news));
          this.loading=true;
          this.$http.post(restAPI.createnews,news,{
              headers:{
                access_token:this.$session.get('access_token')
              },
            }).then(function (data) {
            console.log(data);
            if(data.body.success === true){
              this.hasMessage=true;
              this.messageText=data.body.rm;
              this.reset();
            }else if(data.body.success === false){
              this.hasError=true;
              this.errorText=data.body.rm;
            }
            this.loading=false;
          });
        }
      },
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData();
        this.loading=true;
        this.hasMessage=false;
        this.hasError=false;
        formData.append('docFile', file);
        this.$http.post(restAPI.uploadFile,formData
        ).then(function (data) {
          console.log(data);
          if(data.body.success === true){
            let url = data.body.results.http_path;
            Editor.insertEmbed(cursorLocation, 'image', url);
            this.loading=false;
            resetUploader();
          }else {
            this.loading=false;
            this.hasError=true;
            this.errorText="Gagal Mengupload Gambar";
          }
        }).catch(err=>{
          console.log(err);
          this.loading=false;
          this.hasError=true;
          this.errorText="server not responding, please try again";
        });
      }
    ,
      reset() {
        // reset form to initial state
        this.title='';
        this.content='';
        this.desc='';
        this.hasError = false;
        this.isChallenge=false;
        this.poin='';
        this.expire='';
        this.hashtag='';
      }
    }
  }
</script>

<style scoped>

</style>
