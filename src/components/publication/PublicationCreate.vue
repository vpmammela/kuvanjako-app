<script setup>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { publicationService } from '../../services/publicationService';
import { isAuth } from '../../store';


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

    if (!isDataValid.value.isAllValid) return

    const { data, error } = await publicationService.usePost(publicationData)

    if (data.value && !error.value) {
        publicationData.title = ''
        publicationData.description = ''
        publicationData.url = ''

        router.push('/')
    }
}


</script>

<template>



    <label>Otsikko</label>
    <small>{{ isDataValid.titleValidation }}</small>
    <input v-model="publicationData.title" type="text">

    <label>Kuvaus</label>
    <small>{{ isDataValid.descriptionValidation }}</small>
    <input v-model="publicationData.description" type="text">

    <div v-if="isAuth" class="visibility-div">
        <label>Näkyvyys</label>
        <small>Valitse ketkä näkevät julkaisusi</small>
        <select v-model="publicationData.visibility">
            <option value=2>Julkinen</option>
            <option value=1>Kirjautuneet</option>
            <option value=0>Vain itse ja admin</option>
        </select>
    </div>

    <label>URL</label>
    <small>{{ isDataValid.urlValidation }}</small>
    <input v-model="publicationData.url" type="text">

    <button :disabled="!isDataValid.isAllValid" @click="createNewPublication">Lähetä</button>


</template>

<style scoped>
.visibility-div {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 4px;
}
</style>