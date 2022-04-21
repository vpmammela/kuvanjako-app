import { createRouter, createWebHistory } from 'vue-router'
import PublicationViewAll from './components/publication/PublicationViewAll.vue'
import UsersView from './components/user/UsersView.vue'
import PublicationCreate from './components/publication/PublicationCreate.vue'

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
        }
    ]
})