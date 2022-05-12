import { useApi } from "../composables/api"

export const usersService = {
    useGetAll(){
        return useApi('/users').json()
    }
}