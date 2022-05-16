<script setup>
import { reactive } from 'vue';
import { publicationService } from '../../services/publicationService';
import { isAuth } from '../../store';



defineProps({
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
     <div v-if="isAuth" class="likes" @click.prevent>
        <button @click="publicationService.usePatch(publication._id)">Like</button> {{ publication.likes.length }}
    </div>
    
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: whitesmoke;
    padding: 10px;
    /* margin-bottom: 20px; */
    font-family: 'copperplate';
}
.likes {
    display: flex;
    justify-content: space-between;
    background-color: whitesmoke;
    padding: 10px;
    /* margin-bottom: 20px; */
    font-family: 'copperplate';
}
img {
    width: 400px;
}
</style>