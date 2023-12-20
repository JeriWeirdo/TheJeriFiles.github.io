import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import home from '../home.vue'
import CardDisplay from '../CardDisplay.vue'
import play from '../play.vue'

const routesArray: RouteRecordRaw[] = [
    {   path: '/',
        name: 'home',
        component: home },
    {   path: '/display',
        name: 'cardDisplay',
        component: CardDisplay },
    {   path: '/play',
        name: 'play',
        component: play }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routesArray
})

export default router;