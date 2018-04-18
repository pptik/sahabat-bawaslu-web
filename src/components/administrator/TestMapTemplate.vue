<template>
  <section class="ui container">
    <navigation :highlight1="true" :highlight2="false" :highlight3="false"></navigation>
    <main-content></main-content>
    <copyright></copyright>
  </section>
</template>

<script>
    import '../../assets/js/slick.min.js'
    import Navigation from './Navigation.vue';
    import LeftNavigation from './LeftNavigation.vue';
    import MainContent from './TestMapContent.vue';

    import global_json from '../../assets/js/globalVariable.json';

    export default {
        name: "index",
      beforeCreate(){

      },
        created () {

        },
        data(){
          return{
            username: this.$session.get('username'),

          }
        },
        components: {
          MainContent,
          'left-navigation' : LeftNavigation,
          'navigation' : Navigation,
          'main-content' : MainContent
        }
    }
</script>

<style>
  @import '../../assets/css/custom.css';

</style>
