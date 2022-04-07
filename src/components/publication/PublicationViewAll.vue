<script setup>
// Tuodaan vue:sta ref, eli funktio reaktiivisen datan luomiseksi
import { reactive, ref } from 'vue';
import PublicationView from './PublicationView.vue';

// Tehdään muuttuja johon reaktiivinen publications lista asetetaan 
// kun data on saatu palvelimelta. Ref wrappaa sille annetun arvon reaktiiviseen
// objektiin jolla kerrotaan vue:lle että 
// käyttöliittymän tulee päivittää muutokset selaimessa kun data muuttuu.
const publications = ref([])

const state = reactive({
    error: false
})

// Tehdään asynkroninen funktio jotta voidaan 
// käsitellä ei-tosiaikaista dataa
const getAllPublications = async () => {

    try {
        // Haetaan selaimen fetch työkalua käyttämällä data kurssiprojektin REST rajapinnasta.
        // Asetetaan vastaus response nimiseen muuttujaan, kun await on saanut vastauksen palvelimelta
        const response = await fetch('https://vara.onrender.com/api/publications')


        // Fetch palauttaa vastauksen response-tyyppisenä objektina. Tiedetään että vastaus on 
        // json formaatissa joten voimme suorittaa response-tyypillä olevan asynkronisen metodin 
        // .json(). Se parsii json formaatissa olevan datan javaScript objektiksi.
        // Asetetaan vastauksena saatu javaScript objekti esimerkin takia omaan objektiin
        // nimeltä data.
        const data = await response.json()

        if (response.status > 300) {
            if (response.status == 404) {
                throw new Error("Dataa ei löytynyt")
            }
            throw new Error(data.msg)
        }

        // Insomnialla tehdyn kyselyn perusteella tiedetään että data-objektissa
        // täytyy olla avain nimeltä publications (data.publications). Siirretään tämä publications array 
        // aiemmin luotuun reaktiiviseen publications arrayhin

        // Ref:llä luotu reaktiivinen data vaatii sen että koodissa pitää käyttää 
        // publications.value:ta kun sen reaktiivista dataa halutaan muuttaa tai lukea 
        // javaScriptillä.
        publications.value = data.publications

    }

    catch (e) {
        console.log(e)
        state.error = true
    }

}

// Suoritetaan asynkroninen funktio heti komponentin rakentuessa jotta data olisi
// mahdollisimman pian saatavilla komponentissa
getAllPublications()
</script>


<template>
    <h1>PublicationViewAll OK!</h1>
    <div v-if="state.error">Valitettavasti data lataaminen ei onnistunut</div>
    <div v-else class="container">
        <div class="item" v-for="publication, key in publications" :key="key">
            <PublicationView :publication="publication"></PublicationView>
        </div>
    </div>
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
</style>
