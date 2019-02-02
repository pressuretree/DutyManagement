<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Duty msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Duty from '@/components/Duty.vue'
import { getLoginUser } from '@/api/api';

export default {
  name: 'home',
  components: {
    Duty
  },
  methods: {
    
  },
  mounted(){
    
  },
  created () {
    this.$progress.start();

    this.$progress.done();

    
    

    // if (this.username === 'admin' && this.password === '123456') {
    //     this.$store.commit('addRoles', {
    //       roles: 'admin'
    //     });
    //     this.$router.push('/home');
    //   } else if (this.username === 'guest' && this.password === '123456') {
    //     this.$store.commit('addRoles', {
    //       roles: 'user'
    //     });
    //     this.$router.push('/home');
    //   }


   
  }
}
</script>
