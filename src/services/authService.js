import { useApi } from "../composables/api"
import { setError, setSuccess } from "../composables/notification"
import { globalState } from "../store"

export const authService = {
    async useLogin(payload){
        
        const {data, error} = await useApi('/login').post(payload).json()

        if(!error.value && data.value){

            setSuccess("Tervetuloa " + data.value.account.username)
            globalState.accessToken = data.value.access_token
        }
        else {
            setError("Tarkista käyttäjätiedot")
        }
    },
    useLogout(){
        useApi('/logout').post().onFetchFinally(() => {
            globalState.accessToken = null
            setSuccess("Sinut on kirjattu ulos")
        })

    }
}

