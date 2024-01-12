import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from '../views/HomeView.vue'
import CardDisplay from '../views/CardDisplay.vue'
import Play from '../views/Play.vue'
import newGamePlay from '../views/newGamePlay.vue'

const routesArray: RouteRecordRaw[] = [
    {   path: '/',
        name: 'HomeView',
        component: HomeView },
    {   path: '/display',
        name: 'carddisplay',
        component: CardDisplay },
    {   path: '/play',
        name: 'play',
        component: Play },
    {   path: '/play/newergame',
        name: 'newergame',
        component: newGamePlay}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routesArray
})

export default router;