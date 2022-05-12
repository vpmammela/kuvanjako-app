<script setup>
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { usersService } from '../../services/usersService';
import { isAuth } from '../../store';


const { data, error, isFinished } = usersService.useGetAll()

const router = useRouter()

watch(isAuth, () => {
    if(!isAuth.value) {
        router.push('/')
    }
})

</script>

<template>

<div v-if="error">Tapahtui virhe</div>
<div v-else-if="!isFinished">Ladataan...</div>
<div v-else-if="data?.users">

    <div v-for="user in data.users">
        {{ user.username }}

    </div>

</div>
</template>


<style scoped>

</style>