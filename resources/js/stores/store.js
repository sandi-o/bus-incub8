import Vue from 'vue';
import Vuex from 'vuex';

import bus from './modules/bus'
import snackbar from './modules/snackbar'
import stop from './modules/stop'
import user from './modules/user'

import bus_stop from './modules/bus_stop'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        bus_stop,
        bus,        
        snackbar,
        stop,
        user
    }
});