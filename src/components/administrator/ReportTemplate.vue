<template>
  <section class="ui container">
    <div class="ui stackable sixteen column grid">
     <left-navigation></left-navigation>
      <div class="sixteen wide column">
        <main-content></main-content>
      </div>

    </div>
    <copyright></copyright>
  </section>
</template>

<script>
    import '../../assets/js/slick.min.js'
    import Navigation from './Navigation.vue';
    import LeftNavigation from './ReportLeftNavigation.vue';
    import MainContent from './ReportContent.vue';

    import global_json from '../../assets/js/globalVariable.json';

    export default {
        name: "index",
      beforeCreate(){
        if(this.$session.get('role') !== 0){
          this.$router.push({path:'/notfound'})
        }
        document.title = 'Sahabat Banwaslu | Home';
      },
      mounted(){
        $('.ui.dropdown')
          .dropdown();
      },
        data(){
          return{
            username: this.$session.get('username')
          }
        },
        components: {
          LeftNavigation,
          MainContent,
          'main-content' : MainContent
        }
    }
</script>

<style>
  @import '../../assets/css/custom.css';

</style>
