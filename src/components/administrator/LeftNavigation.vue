<template>
  <nav class="ui middle aligned divided list ">
    <div class="ui left pointing dropdown link item">
    Materi

      <div class="menu">
        <div class="item"><router-link to="/admin/material/list" class="grey-text">List</router-link></div>
        <div class="item"><router-link to="/admin/material" class="grey-text">Tambah Modul</router-link></div>
        <div class="item"><router-link to="/admin/video" class="grey-text">Tambah Video</router-link></div>
      </div>

    </div>
    <div class="ui left pointing dropdown link item">
      Berita

      <div class="menu">
        <div class="item"><router-link to="/admin/news/list" class="grey-text">List</router-link></div>
        <div class="item"><router-link to="/admin/create/news" class="grey-text">Tambah Berita</router-link></div>
      </div>
    </div>
    <div class="ui left pointing dropdown link item">
      Kuis

      <div class="menu">
        <div class="item"><router-link to="/admin/quiz/list" class="grey-text">List</router-link></div>
        <div class="item"><router-link to="/admin/create/quiz" class="grey-text">Tambah Kuis</router-link></div>
      </div>
    </div>

    <div class="ui left pointing dropdown link item">
      Forum
      <div class="menu">
        <div class="item"><router-link to="/admin/forum/list" class="grey-text">List</router-link></div>
      </div>
    </div>
    <router-link to="/admin/report" class="ui left pointing dropdown link item">
      Report
    </router-link>

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
