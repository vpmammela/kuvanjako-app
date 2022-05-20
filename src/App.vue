<script setup>

import { RouterView } from 'vue-router';
import BaseLayout from './components/layout/BaseLayout.vue';
import NotificatioContainer from './components/notification/NotificatioContainer.vue';
import { globalState } from './store';

if(globalState.darkMode){
    const element = document.body;
    element.classList.toggle("dark-mode");
}



function darkMode() {
   const element = document.body;
   element.classList.toggle("dark-mode");
   globalState.darkMode = !globalState.darkMode
}

</script>

<template>
    <BaseLayout>
<div class="dark-button">
    <button @click="darkMode()">Dark mode</button>
</div>

        <NotificatioContainer></NotificatioContainer>
        <router-view></router-view>
    </BaseLayout>
</template>

<style>
body {
    margin: 0px;
}

.dark-mode {
  background-color: black;
  color: grey
}

</style>
