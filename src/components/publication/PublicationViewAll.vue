<script setup lang="ts">


import { publicationService } from '../../services/publicationService';
import PublicationView from './PublicationView.vue';



const { data, error, isFinished } = publicationService.useGetall()


</script>


<template>

    <div v-if="error">Valitettavasti datan lataaminen ei onnistunut</div>
    <div v-else-if="!isFinished">Ladataan...</div>
    <template v-else-if="data?.publications">

            <div class="container">
        <template v-for="publication in data.publications">

                <div class="item">
                    <PublicationView :publication="publication"></PublicationView>
            </div>
            <div ref="intersectionTrigger"></div>
        </template>
                </div>
    </template>



</template>
<style scoped>
a:link {
    text-decoration: none;
}


.item {
/*     filter: grayscale(100%); */
    z-index: 0;
    margin: 50px;
    
}

.item:hover {
    filter: none;
    transition: all 0.35s;

}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

</style>
