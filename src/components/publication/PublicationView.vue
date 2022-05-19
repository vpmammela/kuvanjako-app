<script setup>

import { RouterLink } from 'vue-router';
import { publicationService } from '../../services/publicationService';
import { isAuth } from '../../store';
import { ThumbUpOutline } from 'mdue'
import { ref, toRefs, watch } from 'vue';



const props = defineProps({
    publication: Object

})

let { publication } = toRefs(props)
let likes = ref(publication.value.likes)
let isLoading = ref(false)

watch(isLoading, async () => {
    const res = await publicationService.useGetById(publication.value._id)
    likes.value = res.data.value.publication.likes
    isLoading.value = false
})

async function toggleLike(id) {
    await publicationService.usePatch(id)
    isLoading.value = true
}


</script>

<template>
    <div class="container">
        <div class="router-container">
            <router-link :to="`/publication/${publication._id}`">
                <img @error="error = true" :src="publication.url" />
            </router-link>
            <div class="caption">
                {{ publication.title }}
            </div>
            <div class="caption-bottom" v-if="isAuth">
                <div class="likes">
                    <ThumbUpOutline class="like-button" @click="toggleLike(publication._id)"></ThumbUpOutline>
                    {{ likes.length }}
                </div>
                <div class="posted-by">
                    Posted by: {{ publication.owner ? publication.owner.username : "anonyymi" }}
                </div>
            </div>
        </div>
    </div>


<!--     <div class="description">
        {{ publication.description }}
    </div> -->
</template>

<style scoped>
.container {
    background: #fff;
    padding: 1rem;
    box-shadow: 0 20px 20px 20px rgba(0, 0, 0, 0.2);
    margin-top: 30px;
}

.container>img {
    max-width: 100%;
    height: auto;
}

.caption {
    font-size: 1.8rem;
    text-align: center;
    line-height: 2em;
    font-family: 'Poor Story', cursive;
}

.caption-bottom {
    display: flex;
    justify-content: space-between;
}

.posted-by {
    font-size: 0.8rem;
    text-align: right;
    line-height: 2em;
    font-family: 'Poor Story', cursive;
}

.description {
    font-size: 1.8rem;
    margin-top: 20px;
    display: flex;
    justify-content: center;
}


.likes {
    display: flex;
    justify-content: left;
}

img {
    width: 400px;
}

.like-button {
    font-size: 20px;
}
.like-button:hover {
    cursor: pointer;
}


</style>