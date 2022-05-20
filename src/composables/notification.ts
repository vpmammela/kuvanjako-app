import { readonly, ref } from 'vue'

interface ErrorCode {
    [key:string]: ErrorMessage
}

interface ErrorMessage {
    message?: string,
    color?: string
}

const notificationData = ref<ErrorCode>({})


const setNotificationByType = (message:string, color:string) => {
    const key = Math.floor(Math.random() * 1_000_000).toString(16)

    notificationData.value[key] = {
        message: message,
        color: color
    }

    setTimeout(() => {
        removeNotificationByKey(key)
    }, 5000)
}

export const setError = (errorMsg:string) => {
    setNotificationByType(errorMsg, 'red')
}

export const setSuccess = (successMsg:string) => {
    setNotificationByType(successMsg, 'green')
}

export const removeNotificationByKey = (key:string|number) => {
    delete notificationData.value[key]
}

export const getNotifications:any = readonly(notificationData)