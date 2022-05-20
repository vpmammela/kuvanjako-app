<script setup lang="ts">
import NavigationBar from '../navigation/NavigationBar.vue';

</script>


<template>
<div class="nav">
    <NavigationBar></NavigationBar>
</div>
    <div class="container">
        <slot>


        </slot>
    </div>
</template>


<style scoped>


.container {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    padding-top: 120px;
}

.nav {
    display: flex;
    position: fixed;
    z-index: 100;
    top: 0px;
    width: 100%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: white;
}

</style>