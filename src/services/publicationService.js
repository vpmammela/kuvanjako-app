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
        return useApi(`/publications/${publicationId}/like`).patch()
    },
    usePostComment(publicationId, payload){
        return useApi(`/publications/${publicationId}/comments`).post(payload).json()
    },
    useDeleteOwnComment(publicationId, commentId){
        return useApi(`/publications/${publicationId}/comments/${commentId}`).delete()
    },
    useDeleteOwnPost(publicationId){
        return useApi(`/publications/${publicationId}`).delete()
    }
    
}