<script setup>
import { computed, reactive, ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { registrationService } from '../../services/registrationService';

const router = useRouter()


const userData = reactive({
    username: '',
    email: '',
    password: '',
    profile_picture: ''
})

const verifyPassword = reactive({
    password: ''
})


function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

function validateUsername(username) {
    return /^[0-9a-zA-Z_.-]+$/.test(username);
}



const isDataValid = computed(() => {
    const usernameValidation = userData.username.length > 4 && validateUsername(userData.username)
    const emailValidation = validateEmail(userData.email)
    const passwordValidation = userData.password != "" && userData.password === verifyPassword.password
    const imgValidation = dataUrl.value.length < 200000

    return {
        usernameValidation: usernameValidation ? 'OK' : '',
        emailValidation: emailValidation ? 'OK' : '',
        passwordValidation: passwordValidation ? 'OK' : '',
        imgValidation: imgValidation ? 'OK' : 'Tiedoston koko täytyy olla alle 200kt',

        
        isAllValid: usernameValidation && emailValidation && passwordValidation && imgValidation
    }
})

const createNewUser = async () => {

    if(dataUrl) {
        userData.profile_picture = dataUrl
    }

    if (!isDataValid.value.isAllValid) return

    await registrationService.useRegister(userData)

    userData.username = ''
    userData.email = ''
    userData.password = ''

    router.push('/')
}


// base64 alkaa

const dataUrl = ref('')
const img = ref(null)
const fileNameAndSize = ref('')
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter
const imageFilters = (args) => {
    const entries = Object.entries(args)
    const imgFilterValues = entries.map(a => `${a[0]}(${a[1]})`)
    return imgFilterValues.join(' ')
}
const canvasElement = ref(null)
const canvasElement2 = ref(null)

const controls = reactive({
    sx: 0,
    sy: 0,
    imgWidth: 1000,
    imgHeight: 1000,
    quality: 3,
    maxHeight: 2000,
    maxWidth: 2000,
    imgSize: 0,
    opacity: 1,
    contrast: 1,
    blur: 0,
    grayscale: 0,
    saturate: 1,
    hueRotate: 0,
    show: false
})
const isImageSet = computed(() => img.value != null)
const drawImage = () => {
    const { sx, sy, imgHeight, imgWidth } = controls
    const context = canvasElement.value.getContext('2d')
    canvasElement.value.width = imgWidth
    canvasElement.value.height = imgHeight
    context.clearRect(0, 0, imgWidth, imgHeight);
    context.fillStyle = 'black';
    context.fillRect(0, 0, imgWidth, imgHeight);
    context.filter = imageFilters({
        opacity: controls.opacity,
        contrast: controls.contrast,
        blur: controls.blur + 'px',
        grayscale: controls.grayscale,
        saturate: controls.saturate,
        'hue-rotate': controls.hueRotate + 'deg'
    })
    context.drawImage(img.value, sx, sy, imgWidth, imgHeight, 0, 0, imgWidth, imgHeight)
}
const initControls = (width, height) => {
    controls.imgWidth = width
    controls.imgHeight = height
    controls.maxHeight = parseInt(height * 2)
    controls.maxWidth = parseInt(width * 2)
}
const handleFileInput = (e) => {
    const [file] = e.target.files;
    const { name, size, type } = file;
    if (!type.includes('image')) {
        console.error('Voit ladata vain kuvatiedostoja')
        e.target.value = null
        return
    }
    const fileSize = (size / 1000).toFixed(2);
    fileNameAndSize.value = `${name} - Alkuperäinen koko: ${fileSize}kt`;
    const reader = new FileReader();
    reader.onload = (event) => {
        img.value = new Image();
        img.value.onload = () => {
            initControls(img.value.width, img.value.height)
            nextTick(setImageData)
        }
        img.value.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}
const setImageData = () => {
    dataUrl.value = canvasElement.value.toDataURL('image/jpeg', controls.quality / 10)
}
watch(controls, drawImage)


// base64 loppuu
</script>

<template>
    <div class="image-editor">
        <div class="file-input">
            <label>Valitse kuva{{ fileNameAndSize }}</label>
            <label v-if="isImageSet">Uusi koko kilotavuina: {{ (dataUrl.length / 1000).toFixed(2) }}</label>
            {{ isDataValid.imgValidation }}
            <input type="file" class="file" @change="handleFileInput" />
        </div>
    </div>

    <template v-if="isImageSet">
        <div class="canvas-container">
            <canvas ref="canvasElement"></canvas>
            <!--                 <img class="preview" :src="dataUrl"> -->


            <button @click="controls.show = !controls.show">Näytä kontrollit</button>
            <div v-if="controls.show" @pointerup="setImageData" class="controls">
                <label>Laatu: {{ controls.quality }}</label>
                <input type="range" min="1" max="10" v-model="controls.quality" />

                <label>X: {{ controls.sx }}</label>
                <input type="range" :min="-controls.maxWidth" :max="controls.maxWidth" v-model="controls.sx" />
                <label>Y: {{ controls.sy }}</label>
                <input type="range" :min="-controls.maxHeight" :max="controls.maxHeight" v-model="controls.sy" />
                <label>Leveys: {{ controls.imgWidth }}</label>
                <input type="range" min="1" max="4000" v-model="controls.imgWidth" />

                <label>Korkeus: {{ controls.imgHeight }}</label>
                <input type="range" min="1" max="4000" v-model="controls.imgHeight" />

                <label>Läpinäkyvyys: {{ controls.opacity }}</label>
                <input type="range" min="0" max="1" step="0.01" v-model="controls.opacity" />

                <label>Kontrasti: {{ controls.contrast }}</label>
                <input type="range" min="0" max="2" step="0.01" v-model="controls.contrast" />

                <label>Sumennus: {{ controls.blur }}</label>
                <input type="range" min="0" max="100" v-model="controls.blur" />

                <label>Mustavalkoinen: {{ controls.grayscale }}</label>
                <input type="range" min="0" max="1" step="0.01" v-model="controls.grayscale" />

                <label>Saturaatio: {{ controls.saturate }}</label>
                <input type="range" min="0" max="1" step="0.01" v-model="controls.saturate" />

                <label>Hue: {{ controls.hueRotate }}</label>
                <input type="range" min="0" max="360" step="1" v-model="controls.hueRotate" />
                <button @click="controls.show = !controls.show">Sulje</button>
            </div>
        </div>


    </template>


    <label>Käyttäjänimi</label>
    <small>{{ isDataValid.usernameValidation }}</small>
    <input v-model="userData.username" type="text" />

    <label>Sähköposti</label>
    <small>{{ isDataValid.emailValidation }}</small>
    <input v-model="userData.email" type="text">

    <label>Salasana</label>
    <input v-model="userData.password" type="password">

    <label>Salasana uudelleen</label>
    <small>{{ isDataValid.passwordValidation }}</small>
    <input v-model="verifyPassword.password" type="password">
    <button :disabled="!isDataValid.isAllValid" @click="createNewUser">Rekisteröidy</button>


</template>


<style scoped>
.file-input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}

.preview {
    max-width: 400px;
}

.image-editor {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

canvas {
    max-width: inherit;
    max-height: 800;
}

.controls>input {
    height: 15px;
}

.controls>button {
    margin-top: 10px;
}

.canvas-container {
    padding: 15px;
    max-width: 300px;
    max-height: 500px;
}

.controls {
    background-color: white;
    -webkit-box-shadow: 0px 25px 21px 1px rgba(0, 0, 0, 0.29);
    box-shadow: 0px 25px 21px 1px rgba(0, 0, 0, 0.29);
    bottom: 20px;
    position: fixed;
    padding: 15px;
    display: flex;
    flex-direction: column;
    font-size: 0.7em;
    width: 270px;
    margin-right: auto;
    margin-left: auto;
}
</style>