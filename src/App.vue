<script setup>
import { RouterView } from 'vue-router';
import BaseLayout from './components/layout/BaseLayout.vue';
import NotificatioContainer from './components/notification/NotificatioContainer.vue';



</script>

<template>
    <BaseLayout>
        <NotificatioContainer></NotificatioContainer>
        <router-view></router-view>
    </BaseLayout>
</template>

<style>
body {
    margin: 0px;
}
</style>
