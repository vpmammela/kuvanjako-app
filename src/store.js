import { useStorage } from "@vueuse/core";
import { computed, reactive } from "vue";

const accessToken = useStorage('accessToken', null)
const refreshToken = useStorage('refreshToken', null)

export const globalState = reactive({
    accessToken,
    refreshToken
})

export const isAuth = computed(() => {
    return globalState.accessToken != null
})
