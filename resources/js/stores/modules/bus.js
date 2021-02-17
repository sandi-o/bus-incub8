const state = {   
    status: '',
    buses: [],
    bus: {}
};

const getters = {
    status: state => state.status,
    buses: state => state.buses,
    bus: state => state.bus,
};

const actions = {
    fetchData: ({commit}) => {        
        return new Promise((resolve, reject) => {
            commit('BUS_STATUS','fetching data');
            axios.get('/api/buses')
            .then(response => {
                commit('BUS_STATUS', 'success');
                commit('SET_BUSS', response.data);
                resolve(response.data);
            })
            .catch(err => {
                commit('BUS_STATUS', 'error');
                reject(err);
            })
        });
    },
    create: ({commit,dispatch}, payload) => {
        commit('BUS_STATUS','storing data');
        return new Promise((resolve, reject) => {
            axios.post('/api/buses', payload)
            .then(response => {
                commit('BUS_STATUS', 'stored');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('BUS_STATUS', 'error storing');
                commit('snackbar/SET_SNACKBAR',{text: 'Error creating bus!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },  
    update: ({commit,dispatch}, payload) => {
        commit('BUS_STATUS','updating data');
        return new Promise((resolve, reject) => {
            axios.post('/api/buses/'+payload.id, payload)
            .then(response => {
                commit('BUS_STATUS', 'updated');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('BUS_STATUS', 'error updating');
                commit('snackbar/SET_SNACKBAR',{text: 'Error updating bus!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },
};

const mutations = {
    BUS_STATUS: (state, status) => {
        state.status = status;
    },
    SET_BUSS: (state, data) => {
        state.buses= data
    },
    CLEAR_BUSS: (state) => {
        state.buses= []
    },
    SET_BUS: (state, bus) => {
        state.bus = bus
    },
    CLEAR_BUS: (state) => {
        state.bus = {}
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations,
}