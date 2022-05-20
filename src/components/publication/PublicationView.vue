<script setup lang="ts">

import { RouterLink, useRouter } from 'vue-router';
import { publicationService } from '../../services/publicationService';
import { globalState, isAuth } from '../../store';
import { ThumbUpOutline } from 'mdue'
import { reactive, ref, toRefs, watch } from 'vue';



const router = useRouter()

const commentData = reactive({
    body: ''
})

const props = defineProps({
    publication: Object,
    showDetails: Boolean
})

let { publication, showDetails } = toRefs(props)

let likes = ref(publication.value.likes)
let isLoading = ref(false)

let comments = ref(publication.value.comments)
let checkComments = ref(false)

watch(isLoading, async () => {
    const res = await publicationService.useGetById(publication.value._id)
    likes.value = res.data.value.publication.likes
    isLoading.value = false
})

watch(checkComments, async () => {
    const res = await publicationService.useGetById(publication.value._id)
    comments.value = res.data.value.publication.comments
    checkComments.value = false
})


const deleteOwnPost = async () => {
    await publicationService.useDeleteOwnPost(publication.value._id)

    router.push('/')

}

async function toggleLike(id) {
    await publicationService.usePatch(id)
    isLoading.value = true
}

async function postComment(id) {
    await publicationService.usePostComment(id, commentData)
    commentData.body = ''
    checkComments.value = true
}

async function deleteOwnComment(commentId) {
    await publicationService.useDeleteOwnComment(publication.value._id, commentId)
    checkComments.value = true
}
const showDelete = ref(false)


</script>

<template>
    <div class="container">
        <div class="router-container">
            <router-link :to="`/publication/${publication._id}`">
                <img :src="publication.url" />
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

        <div v-if="publication.owner !== null">
            <div v-if="isAuth && showDetails && globalState.userId == publication.owner._id" class="modify-container">
            <button @click="showDelete = !showDelete">Muokkaa</button>
            <div v-if="showDelete">
                Tällä hetkellä ainoa muokkaus on postauksen poisto.
                <button @click="deleteOwnPost">Poista</button>
            </div>
        </div>
  
        </div>



    <div v-if="showDetails && isAuth">
        <div class="description">
            {{ publication.description }}
        </div>
        <template v-for="comment in comments">
            <div class="comments">
                <div v-if="comment.owner._id === globalState.userId" class="users-own-comments">

                    {{ comment.owner.username }}:
                    {{ comment.body }}
                    <button @click="deleteOwnComment(comment._id)">poista</button>
                </div>
                <div v-else>
                    {{ comment.owner.username }}:
                    {{ comment.body }}
                </div>
            </div>
        </template>
        <div class="comment-container">
            <input v-model="commentData.body" type="text" class=input-comment />
            <button @click="postComment(publication._id)">Lähetä</button>
        </div>

    </div>

</template>

<style scoped>
.users-own-comments {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.comments {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: solid 2px;
    padding: 10px;
}

.comment-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 10px;
}


.description {
    text-align: center;
}

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