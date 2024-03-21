import axios from "axios"
import { useAuthStore } from "./stores/auth"
import router from "./router"
const axiosApiInstanse = axios.create()
const apiKey = import.meta.env.VITE_API_KEY_FIREBASE


axiosApiInstanse.interceptors.request.use((config) => {
    if(!config.url.includes('signInWithPassword') && !config.url.includes('signUp')){
    const authStore = useAuthStore()
    let params = new URLSearchParams()
    params.append('auth',  authStore.userInfo.token)
    config.params = params
    }
    return config
})

axiosApiInstanse.interceptors.response.use((response) => {
    return response
}, async function (error){
    const authStore = useAuthStore()
    const originalRequest =error.config
    if(error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        try{
            const newTokens = await axios.post(
                `https://securetoken.googleapis.com/v1/token?key=${apiKey}`,{
                    grant_type: "refresh_token",
                    refresh_token: JSON.parse(localStorage.getItem('userTokens')).refreshToken
                })
        authStore.userInfo.token = newTokens.data.access_token;
        authStore.userInfo.refereshToken = newTokens.data.refresh_token 
        localStorage.setItem("userTokens",JSON.stringify({
            token: newTokens.data.access_token,
            refreshToken: newTokens.data.refresh_token 
        }))        
    }catch{
       localStorage.removeItem('userTokens')
       router.push("/signin") 
       authStore.userInfo.token = ""
       authStore.userInfo.refereshToken = ''
    }
    }
}
)

export default axiosApiInstanse