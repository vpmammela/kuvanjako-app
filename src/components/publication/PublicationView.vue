<script setup>
import { ref } from 'vue';


defineProps ({
    publication: Object
})

</script>

<template>
    <div class="container">
    <div class="item">
    {{ publication.title }}
    <img @error="error = true" :src="publication.url" />
    <!-- ternari jos publication.owner = null niin palauttaa publications.owner.username, jos null niin "anonyymi" -->
    {{ publication.owner ? publication.owner.username : "anonyymi" }}
    </div>
    </div>

</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}
.item{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: gray;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    font-family: 'copperplate';
}
img {
    width: 400px;
}
</style>