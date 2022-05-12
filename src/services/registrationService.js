import { useApi } from "../composables/api"


export const registrationService = {
    async useRegister(payload) {
        return await useApi('/register').post(payload).json()
    }
}