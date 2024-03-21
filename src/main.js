import "primevue/resources/themes/lara-light-indigo/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";
import PrimeVue from "primevue/config"
import "./api"


const firebaseConfig = {
    apiKey: "AIzaSyAd2ww-rF1q-5ngyIqbdtCrxKZyXx5MGnI",
    authDomain: "jwt-firebase-vue3-960c5.firebaseapp.com",
    projectId: "jwt-firebase-vue3-960c5",
    storageBucket: "jwt-firebase-vue3-960c5.appspot.com",
    messagingSenderId: "276684395048",
    appId: "1:276684395048:web:4726b0a540c5dd46d59b1d"
  };

import App from './App.vue'
import router from './router'

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')





