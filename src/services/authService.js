import { useApi } from "../composables/api"
import { setError, setSuccess } from "../composables/notification"
import { globalState } from "../store"




export const authService = {
    async useLogin(payload){
        
        const {data, error} = await useApi('/login').post(payload).json()
        

        if(!error.value && data.value){

            setSuccess("Tervetuloa " + data.value.account.username)
            globalState.accessToken = data.value.access_token
            globalState.refreshToken = data.value.refresh_token
        }
        else {
            setError("Tarkista käyttäjätiedot")
        }
    },
    useLogout(){
        useApi('/logout').post().onFetchFinally(() => {
            globalState.accessToken = null
            globalState.refreshToken = null
            setSuccess("Sinut on kirjattu ulos")
        })

    },
    async useRefreshToken(){ 
        
        globalState.accessToken = globalState.refreshToken
        const { data } = await useApi('/login').patch().json()
        globalState.accessToken = data.value.access_token

        location.reload()
        
}
}