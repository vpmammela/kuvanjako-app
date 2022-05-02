import { createRouter, createWebHistory } from 'vue-router'
import PublicationViewAll from './components/publication/PublicationViewAll.vue'
import UsersView from './components/user/UsersView.vue'
import PublicationCreate from './components/publication/PublicationCreate.vue'
import PublicationViewDetails from './components/publication/PublicationViewDetails.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes : [
        {
            path: "/",
            name: "Julkaisut",
            component: PublicationViewAll
        },
        {
            path: "/users",
            name: "Käyttäjät",
            component: UsersView
        },
        {
            path: "/create",
            name: "Uusi postaus",
            component: PublicationCreate
        },
        {
            path: '/publication/:publicationId',
            name: 'Yksittäinen postaus',
            component: PublicationViewDetails,
            props: true
        }
    ],
    scrollBehavior(){
        document.getElementById('app').scrollIntoView()
    }
})