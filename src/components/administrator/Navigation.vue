<template>
  <nav class="ui secondary pointing menu">
    <router-link to="/" class="item">
      <span v-bind:class="{primarytext:highlight1}">Sahabat Banwaslu</span>
    </router-link>
    <div class="right menu">
      <a href="/admin/user/addleader" class="item grey-text">
        <aside>
          <router-link to="/admin/user/addleader" class="grey-text">Add Leader</router-link>
        </aside>
      </a>

      <a href="#" v-on:click.prevent="keluar" class="item grey-text">
        <aside>
          <span v-bind:class="{primarytext:highlight2}">Logout</span>
        </aside>
      </a>
    </div>
  </nav>
</template>

<script>
  export default {
    props: {
      highlight1: {
        type: Boolean,
        required: true
      },
      highlight2: {
        type: Boolean,
        required: true
      }
    },
   data (){
     return{
      //highlight:false
     }
   },
    methods: {
      keluar:function () {
        this.$session.destroy();
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>
