import { useStorage } from "@vueuse/core";
import { computed, reactive } from "vue";

const accessToken = useStorage('accessToken', null)
const refreshToken = useStorage('refreshToken', null)
const userId = useStorage('userId', null)
const darkMode = useStorage('darkMode', false)


export const globalState = reactive({
    accessToken,
    refreshToken,
    userId,
    darkMode
})

export const isAuth = computed(() => {
    return globalState.accessToken != null
})
