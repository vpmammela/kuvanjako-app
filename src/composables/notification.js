import { readonly, ref } from 'vue'

const notificationData = ref({})

const setNotificationByType = (message, color) => {
    const key = Math.floor(Math.random() * 1_000_000).toString(16)

    notificationData.value[key] = {
        message: message,
        color: color
    }

    setTimeout(() => {
        removeNotificationByKey(key)
    }, 5000)
}

export const setError = (errorMsg) => {
    setNotificationByType(errorMsg, 'red')
}

export const setSuccess = (successMsg) => {
    setNotificationByType(successMsg, 'green')
}

export const removeNotificationByKey = (key) => {
    delete notificationData.value[key]
}

export const getNotifications = readonly(notificationData)