import Vue from 'vue';
import VueRouter from 'vue-router';
import {store} from '@/js/stores/store';

Vue.use(VueRouter);

import Home from '@/js/components/home';
import BusesLocation from '@/js/components/buses/locate';
import Buses from '@/js/components/buses/index';
import Stops from '@/js/components/stops/index';
import Login from '@/js/components/auth/login';

const router = new VueRouter({
    mode: 'history',
    routes: [     
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/home',            
            name: 'home',
            component: Home,
        },
        {
            path: '/locate',
            name: 'buseslocation',
            component: BusesLocation,
        },
        {
            path: '/buses',
            name: 'buses',
            component: Buses,
        },
        {
            path: '/stops',
            name: 'stops',
            component: Stops,
        },      
    ]
});

router.beforeEach((to, from, next) => {     
    console.log(to)  
    console.log(store.getters['user/isAuthenticated'])
    if (to.name !== 'login') {
        if(store.getters['user/isAuthenticated']) {
            next()    
        } else{
            next({ name: 'login' })
        }
    } else {
        next()
    }
})


export default router;