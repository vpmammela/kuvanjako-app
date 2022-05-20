
import { useApi } from "../composables/api"
import { setError, setSuccess } from "../composables/notification"


export const registrationService = {
    async useRegister(payload) {

        const {data, error} =  await useApi('/register').post(payload).json()

        if(!error.value && data.value) {
            setSuccess("Rekisteröityminen onnistui, voit kirjautua sisään")
            
        }
        else {
            setError("Rekisteröityminen ei onnistunut")
        }
    }
}