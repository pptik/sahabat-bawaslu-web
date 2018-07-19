<template>
  <span>
    <h1>Add Leader</h1>
    <div v-if="loading" class="ui active inverted dimmer">
             <div class="ui text loader">Loading</div>
           </div>
    <div class="ui negative message" v-if="hasError">
          <p>{{errorText}}</p>
          <ul id="example-1">
            <li v-for="error in errorList">
              {{ error }}
            </li>
          </ul>
    </div>
    <div class="ui positive message" v-if="hasMessage">
          <p>{{messageText}}</p>
    </div>
    <form class="ui form">
      <div class="field">
          <div>Email</div>
          <input type="text" autocomplete="email" placeholder="user@mail.com" v-model="email"/>
      </div>
      <div class="field">
          <div>Username</div>
          <input type="text" autocomplete="username" placeholder="user" v-model="username"/>
      </div>
      <div class="field">
          <div>Phone Number</div>
          <input type="text" autocomplete="phonenumber" placeholder="Example : 082240190909" v-model="phonenumber"/>
      </div>
      <div class="field">
          <div>Password</div>
          <input type="password" autocomplete="password" placeholder="Password" v-model="password"/>
        </div>
        <div class="field">
          <div>Confirm Password</div>
          <input type="password" placeholder="password" v-model="confirmpassword"/>
        </div>
      <div class="container">
          <button v-on:click.prevent="daftarLeader" type="button" class="small ui blue button">Submit</button>
      </div>
    </form>
  </span>
</template>

<script>
  const {restAPI}=require('../../assets/js/setup');
  const {globalSetup}=require('../../assets/js/setup');

  export default {
    name: "konten",
    data(){
      return{
        errorText:'',
        hasError:false,
        nomor:1,
        loading:false,
        email:'',
        username:'',
        phonenumber:'',
        password: '',
        confirmpassword: '',
        hasMessage:false,
        messageText:'',
        errorList:[],
      }
    },

    created(){

    },
    mounted() {
      this.reset();
    },
    methods: {
      reset() {
        // reset form to initial state
        this.hasError = false;
        this.title="";
        this.desc="";
      },
      daftarLeader(){
        this.loading=true;
        this.hasMessage=false;
        this.hasError=false
        if(this.email===''){
          this.hasError=true;
          this.errorList.push("Email Tidak Boleh Kosong")
        }
        if(this.username===''){
          this.hasError=true;
          this.errorList.push("Username Tidak Boleh Kosong")
        }
        if(this.phonenumber===''){
          this.hasError=true;
          this.errorList.push("Nomor Handphone Tidak Boleh Kosong")
        }
        if(this.password===''){
          this.hasError=true;
          this.errorList.push("Password Tidak Boleh Kosong")
        }
        if(this.password!==this.confirmpassword){
          this.hasError=true;
          this.errorList.push("Password Anda Tidak Sesuai")
        }
        if(!this.hasError){
          this.loading=true;
          this.$http.post(restAPI.addleader,{
              Email: this.email,
              Username:this.username,
              PhoneNumber: this.phonenumber,
              Password:this.password,
              SignupType:1

            },{
              headers:{
               access_token:this.$session.get('access_token')
              },
            }
          ).then(function (data) {
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
        }else {
          this.loading=false
        }
      }
    }
  }
</script>

<style scoped>

</style>
