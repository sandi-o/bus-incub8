const state = {
    status: '',
    busstops: [],
};

const getters = {
    status: state => state.status,
    busstops: state => state.busstops,
};

const actions = {  
    apply:({commit},payload) => {        
        commit('BUS_STOP_STATUS','setting stop to bus');
        
        return new Promise((resolve,reject) => {
                axios.post('/api/buses/'+payload.bus_id+'/stop',payload)
                .then(response => {
                    commit('BUS_STOP_STATUS','stop applied');
                    commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                    resolve(response)
                }).catch((errors) => {
                    commit('snackbar/SET_SNACKBAR',{text: errors, visible: true, color: 'error', timeout: 5000},{ root: true });
                    commit('BUS_STOP_STATUS','error applying stop');
                    reject(errors.response.data)
                });
            });
    },
    applyAll:({commit},payload) => {        
        commit('BUS_STOP_STATUS','setting stops to bus');
        
        return new Promise((resolve,reject) => {
                axios.post('/api/buses/'+payload.bus_id+'/stops',payload)
                .then(response => {
                    commit('BUS_STOP_STATUS','stops applied');
                    commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                    resolve(response)
                }).catch((errors) => {
                    commit('snackbar/SET_SNACKBAR',{text: errors, visible: true, color: 'error', timeout: 5000},{ root: true });
                    commit('BUS_STOP_STATUS','error applying stops');
                    reject(errors.response.data)
                });
            });
    },

}

const mutations = {
    BUS_STOP_STATUS : (state,status) => {
        state.status = status;
    },
    BUS_STOP_LIST: (state, busstops) => {
        state.busstops = busstops
    },
    CLEAR_BUS_STOP: (state) => {
        state.busstops = []
    }
};

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations,
}