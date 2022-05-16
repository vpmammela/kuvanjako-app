<script setup>
import { RouterLink } from 'vue-router';
import { publicationService } from '../../services/publicationService';
import PublicationView from './PublicationView.vue';


const { data, error, isFinished } = publicationService.useGetall()



</script>


<template>
    <div v-if="error">Valitettavasti datan lataaminen ei onnistunut</div>
    <div v-else-if="!isFinished">Ladataan...</div>
    <template v-else-if="data?.publications">

        <template v-for="publication in data.publications">
            <router-link :to="`/publication/${publication._id}`">
                <PublicationView :publication="publication"></PublicationView>
            </router-link>
           
        </template>
    </template>
</template>
<style scoped>
a:link {
    text-decoration: none;
}

</style>
