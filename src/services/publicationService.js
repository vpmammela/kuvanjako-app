import { useApi } from "../composables/api"

export const publicationService = {
    useGetall(){
        return useApi('/publications').json()
    },
    useGetById(publicationId){
        return useApi(`/publications/${publicationId}`).json()
    },
    usePost(payload){
        return useApi('/publications').post(payload).json()
    },
    usePatch(publicationId){
        console.log("usePatch suoritettu")
        return useApi(`/publications/${publicationId}/like`).patch()
    }
}