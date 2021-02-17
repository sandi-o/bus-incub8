const state = {   
    status: '',
    stops: [],
    stop: {}
};

const getters = {
    status: state => state.status,
    stops: state => state.stops,
    stop: state => state.stop,
};

const actions = {
    fetchData: ({commit}) => {        
        return new Promise((resolve, reject) => {
            commit('STOP_STATUS','fetching data');
            axios.get('/api/stops')
            .then(response => {
                commit('STOP_STATUS', 'success');
                commit('SET_STOPS', response.data);
                resolve(response.data);
            })
            .catch(err => {
                commit('STOP_STATUS', 'error');
                reject(err);
            })
        });
    },
    create: ({commit,dispatch}, payload) => {
        commit('STOP_STATUS','storing data');
        return new Promise((resolve, reject) => {
            axios.post('/api/stops', payload)
            .then(response => {
                commit('STOP_STATUS', 'stored');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('STOP_STATUS', 'error storing');
                commit('snackbar/SET_SNACKBAR',{text: 'Error creating stop!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },
    remove: ({commit}, payload) => {
        commit('STOP_STATUS','removing data');
        return new Promise((resolve, reject) => {
            axios.delete('/api/stops/'+payload.id)
            .then(response => {
                commit('STOP_STATUS', 'removed');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('STOP_STATUS', 'error removing');
                commit('snackbar/SET_SNACKBAR',{text: 'Error removing stop!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },
    update: ({commit,dispatch}, payload) => {
        commit('STOP_STATUS','updating data');
        return new Promise((resolve, reject) => {
            axios.post('/api/stops/'+payload.id, payload)
            .then(response => {
                commit('STOP_STATUS', 'updated');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('STOP_STATUS', 'error updating');
                commit('snackbar/SET_SNACKBAR',{text: 'Error updating stop!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },
};

const mutations = {
    STOP_STATUS: (state, status) => {
        state.status = status;
    },
    SET_STOPS: (state, data) => {
        state.stops= data
    },
    CLEAR_STOPS: (state) => {
        state.stops= []
    },
    SET_STOP: (state, stop) => {
        state.stop = stop
    },
    CLEAR_STOP: (state) => {
        state.stop = {}
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations,
}