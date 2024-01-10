import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from '../views/HomeView.vue'
import App from '../App.vue'
import CardDisplay from '../views/CardDisplay.vue'
import Play from '../views/Play.vue'

const routesArray: RouteRecordRaw[] = [
    {   path: '/',
        name: 'HomeView',
        component: HomeView },
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