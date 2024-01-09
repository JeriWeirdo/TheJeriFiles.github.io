import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from '../Home.vue'
import CardDisplay from '../CardDisplay.vue'
import Play from '../Play.vue'

const routesArray: RouteRecordRaw[] = [
    {   path: '/',
        name: 'home',
        component: Home },
    {   path: '/display',
        name: 'carddisplay',
        component: CardDisplay },
    {   path: '/play',
        name: 'play',
        component: Play }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routesArray
})

export default router;