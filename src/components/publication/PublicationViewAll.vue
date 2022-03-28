<script setup>

const message = 'Tämä on testi'
const loggedIn = false

</script>

<template>
<h1>PublicationViewAll OK!</h1>
<p>{{ message }}</p>

<h1 v-if="loggedIn">loggedIn on true!</h1>
<h1 v-else>loggedIn on false.... :(</h1>
</template>

<style>
body {
    margin: 30px;
}
</style>
