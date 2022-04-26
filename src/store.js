import { computed, reactive } from "vue";

export const globalState = reactive({
    accessToken: null
})

export const isAuth = computed(() => {
    return globalState.accessToken != null
})