<script setup>
import { RouterView } from 'vue-router';
import BaseLayout from './components/layout/BaseLayout.vue';



</script>

<template>
    <BaseLayout>
        <router-view></router-view>
    </BaseLayout>
</template>

<style>
* {
    margin: 0px;
}
</style>
