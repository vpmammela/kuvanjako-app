<script setup>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { publicationService } from '../../services/publicationService';

const publicationData = reactive({
    title: '',
    description: '',
    url: '',
    visibility: 2,  // Julkinen postaus
    tags: []
})

const router = useRouter()

const isDataValid = computed(() => {

    const urlValidation = publicationData.url.includes('https://')
    const descriptionValidation = publicationData.description.length < 1000
    const titleValidation = publicationData.title.length > 2

    return {
        urlValidation: urlValidation ? 'OK' : 'Vain https osoitteet ovat sallittu',
        descriptionValidation: descriptionValidation ? 'OK' : 'Kuvauksen teksti on liian pitkä',
        titleValidation: titleValidation ? 'OK' : 'Otsikon täytyy olla ainakin kolme merkkiä pitkä',
        isAllValid: urlValidation && descriptionValidation && titleValidation
    }
})

const createNewPublication = async () => {

    if(!isDataValid.value.isAllValid) return

    const {data, error} = await publicationService.usePost(publicationData)

    if(data.value && !error.value){
        publicationData.title = ''
        publicationData.description = ''
        publicationData.url = ''

        router.push('/')
    }
}

</script>

<template>

    <div class="form-container">
        <div class="publication-form">
            
            <label>Otsikko</label>
            <small>{{ isDataValid.titleValidation }}</small>
            <input v-model="publicationData.title" type="text">

            <label>Kuvaus</label>
            <small>{{ isDataValid.descriptionValidation }}</small>
            <input v-model="publicationData.description" type="text">

            <label>URL</label>
            <small>{{ isDataValid.urlValidation }}</small>
            <input v-model="publicationData.url" type="text">

            <button :disabled="!isDataValid.isAllValid" @click="createNewPublication">Lähetä</button>

        </div>

    </div>
</template>

<style scoped>

.form-container {
    display: flex;
    justify-content: center;
}
.publication-form {
    display: flex;
    flex-direction: column;
    height: 200px;
    width: 200px;
}
</style>