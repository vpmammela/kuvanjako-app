<script setup>
import { ref } from 'vue';


defineProps ({
    publication: Object
})

</script>

<template>

    <div class="item">
    {{ publication.title }}
    <img @error="error = true" :src="publication.url" />
    <!-- ternari jos publication.owner = null niin palauttaa publications.owner.username, jos null niin "anonyymi" -->
    {{ publication.owner ? publication.owner.username : "anonyymi" }}
    </div>

</template>

<style scoped>
.item{
    font-family: 'copperplate';
}
img {
    width: 400px;
}
</style>