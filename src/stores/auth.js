import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosApiInstanse from "../api"

const apiKey = import.meta.env.VITE_API_KEY_FIREBASE

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    token: '',
    email: '',
    userId: '',
    refereshToken: '',
    expiresIn: ''
  })
  const error = ref('');
  const loader = ref(false)


  const auth = async (payload, type) => {
    const stringUrl = type === "signup" ? "signUp" : "signInWithPassword"
    error.value = ""
    loader.value = true
    try{
      let response = await axiosApiInstanse.post(`https://identitytoolkit.googleapis.com/v1/accounts:${stringUrl}?key=${apiKey}`, {
        ...payload,
        returnSecureToken: true
      });
      userInfo.value ={
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }

      loader.value = false
      localStorage.setItem("userTokens", JSON.stringify({token: userInfo.value.token, refreshToken: userInfo.value.refreshToken,   expiresIn: response.data.expiresIn}))
    } catch(err){
      switch(err.response.data.error.message){
        case 'EMAIL_EXISTS':
          error.value = "Email exists"
          break;
        case 'OPERATION_NOT_ALLOWED':
          error.value = 'Operation not allowed'
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          error.value = 'Too many attempts, try later'
          break;  
        default: error.value = "Error"
          break;  
      }
      loader.value = false
      throw error.value
    }

  }

  const logout = () => {
    userInfo.value = {
      token: '',
      email: '',
      userId: '',
      refereshToken: '',
      expiresIn: ''
    }
  }  

  return { auth, userInfo, error, loader, logout }
})
