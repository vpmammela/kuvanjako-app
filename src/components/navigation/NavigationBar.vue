<script setup>
import { RouterLink } from 'vue-router'

</script>

<template>

    <div class="nav">
        <router-link to="/">Koti</router-link>
        <router-link to="/users">Käyttäjät</router-link>
        <router-link to="/create">Uusi Postaus</router-link>
    </div>


</template>

<style>

.nav {
    display: flex;
    justify-content: center;
}

a {
    margin: 20px;
    font-size: 18px;
}

</style>