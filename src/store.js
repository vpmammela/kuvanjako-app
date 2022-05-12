import { useStorage } from "@vueuse/core";
import { computed, reactive } from "vue";

const accessToken = useStorage('accessToken', null)

export const globalState = reactive({
    accessToken
})

export const isAuth = computed(() => {
    return globalState.accessToken != null
})