<script setup>
import { publicationService } from '../../services/publicationService';
import PublicationView from './PublicationView.vue';

const { data, error, isFinished } = publicationService.useGetall()

</script>


<template>
    <h1>PublicationViewAll OK!</h1>
    <div v-if="error">Valitettavasti datan lataaminen ei onnistunut</div>
    <div v-else-if="!isFinished">Ladataan...</div>
    <template v-else-if="data?.publications">
        <div class="container">
            <div class="item" v-for="publication, key in data.publications">
                <PublicationView :publication="publication"></PublicationView>
            </div>
        </div>
    </template>
</template>

<style scoped>
img {
    width: 400px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

body {
    margin: 30px;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: gray;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

h1 {
    text-align: center;
}
</style>
