import { useApi } from "../composables/api"


export const accountService = {
    useGet(){
        return useApi('/account').json()
    },
    useUpdate(payload) {
        return useApi('/account').patch(payload).json()
    },
    
}