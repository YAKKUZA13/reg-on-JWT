<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import router from './router';

const authStore = useAuthStore();

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem("userTokens"));
  if(tokens){
     authStore.userInfo.token = tokens.token
     authStore.userInfo.refereshToken = tokens.refereshToken
     authStore.userInfo.expiresIn = tokens.expiresIn
    }
}
const logout = () => {
  localStorage.removeItem('userTokens')
  router.push("/signin") 
  authStore.logout()   
}

checkUser()
</script>

<template>
  <div class="menu">
    <router-link class="menu__link" to="/">Home</router-link>
    <router-link class="menu__link" to="/signin" v-if="!token">Login</router-link>
    <router-link class="menu__link" to="/cars" v-if="token">Cars</router-link>
    <router-link class="menu__link" to="/signin" v-if="token" @click.prevent="logout" >Logout</router-link>

  </div>

 <div class="container">
  <RouterView />
</div>

</template>

<style scoped>
.container{
  margin: auto;
  font-family: "Arial", sans-serif ;
  max-width: 700px;
}
.menu{
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 20px;
}
.menu__link{
  color: #000;
  margin: 20px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
