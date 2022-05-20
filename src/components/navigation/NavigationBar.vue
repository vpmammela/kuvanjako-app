<script setup>
import { onMounted, onUnmounted, provide, ref } from 'vue';
import { RouterLink } from 'vue-router'
import { authService } from '../../services/authService';
import { isAuth } from '../../store';
import LoginView from '../login/LoginView.vue';
import { Home, Account, Plus, Login, Logout } from 'mdue'



const showLoginView = ref(false)

provide('showLogin', showLoginView)

const width = ref(0)

const setScreenWidth = () => {
    width.value = window.innerWidth
}

onMounted(() => {
    setScreenWidth()
    window.addEventListener('resize', setScreenWidth)
})

onUnmounted(() => {
    window.removeEventListener('resize', setScreenWidth)
})

const logout = () => {
     authService.useLogout()
}

</script>

<template>

    <div v-if="width > 600" class="nav">
        <router-link to="/">Koti</router-link>
        <router-link v-if="isAuth" to="/users">Käyttäjät</router-link>
        <router-link to="/create">Uusi Postaus</router-link>
        <a href="#" v-if="isAuth" @click.prevent="logout">Ulos</a>
        <a href="#" v-else @click.prevent="showLoginView = !showLoginView">Kirjaudu</a>

    </div>
    <div v-else class="nav-mobile">
        <router-link to="/">
            <Home class="icon"></Home>
            </router-link>
        
        <router-link v-if="isAuth" to="/users">
        <Account class="icon"></Account>
        </router-link>

        <router-link to="/create">
            <Plus class="icon"></Plus>
        </router-link>
        <a href="#" v-if="isAuth" @click.prevent="logout">
        <Logout class="icon"></Logout></a>
        <a href="#" v-else @click.prevent="showLoginView = !showLoginView">
        <Login class="icon"></Login></a>
        
    </div>

    <LoginView v-if="showLoginView && !isAuth"></LoginView>

</template>

<style>

.nav {
    display: flex;
    justify-content: center;
    z-index: 40;
}

.nav-mobile {
    display: flex;
    position: fixed;
    bottom: 0px;
    background-color: white;
    width: 100%;
    justify-content: space-evenly;
}

a {
    margin: 20px;
    font-size: 18px;
    text-decoration: none;
    color: black;
}

.icon {
    font-size: 32px;
    color: black;
}

</style>