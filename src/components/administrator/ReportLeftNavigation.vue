<template>
  <nav class="ui left fixed vertical icon drodown menu ">
    <router-link to="/admin/home" class="item">
      <i class="backward icon"></i>
    </router-link>
    <router-link to="/admin/report" class="item">
      <i class="home icon"></i>
    </router-link>
    <div class="ui left pointing dropdown link item">
      <i class="user icon"></i>
      <router-link to="/admin/report/user/list" class="menu">
        <div class="item">List</div>
      </router-link>
    </div>
  </nav>
</template>

<script>
  export default {
    mounted(){
      $('.ui.dropdown')
        .dropdown();
    },
   data (){
     return{
      //highlight:false
     }
   },
    methods: {

    }
  }
</script>

<style scoped>

</style>
