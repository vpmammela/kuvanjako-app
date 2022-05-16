import { createFetch } from "@vueuse/core";
import { authService } from "../services/authService";
import { globalState, isAuth } from "../store";

export const useApi = createFetch({
    baseUrl: 'https://vara.onrender.com/api',  // tähän oma rajapinta
    options: {
        beforeFetch({ options }){
            /* console.log('options' + JSON.stringify(options)) */
            if(isAuth.value){
                options.headers = {
                    Authorization: `Bearer ${globalState.accessToken}` 
                }
            }

            return { options }
        },
        onFetchError({data, error}){

            if (data?.msg && data.msg instanceof Array && data.msg.includes('Unauthorized')){

                authService.useRefreshToken()

            }
            authService.useLogout

            return {data, error}

        }
    }
})