import Cookies from 'js-cookie';
import Vue from 'vue';

const state = {
    access_token: Cookies.get('access_token') || '',
    status: '',
    hasLoadedOnce: false,
    profile: {},
    users: [],
    user: {},
    err: []
};

const getters = {
    isAuthenticated: state => !!state.access_token,
    authStatus: state => state.status,
    err: state =>state.err,
    profile: state => state.profile,
    users: state => state.users,
    user: state => state.user
    
};

const actions = {
    authRequest: ({commit, dispatch}, payload) => {
        let actionUrl = '/login';
        let remember = payload.remember ? payload.remember : false;
        let data = {
            'email':payload.email,
            'password':payload.password
        }

        if(payload.action=='register'){
            actionUrl='/register';
            data = {
                'name':payload.name,
                'email':payload.email,
                'password':payload.password,
                'password_confirmation':payload.password_confirmation
            }
        }
        if(payload.action=='password-reset'){
            actionUrl='/password/reset';
            data = {
                'token':payload.token,
                'email':payload.email,
                'password':payload.password,
                'password_confirmation':payload.password_confirmation
            }
        }

        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST_STATUS');
            
            axios.post('/api/auth'+actionUrl, data)
                .then(response => {
                    console.log(response)
                    let access_token = 'Bearer ' + response.data.access_token;
                    Cookies.set('access_token', access_token, { expires: remember ? 365 : 1 });
                    axios.defaults.headers.common['Authorization'] = access_token;
                    
                    commit('AUTH_SUCCESS', access_token);
                    dispatch('userRequest');
                    resolve(response);                    
                })
                .catch(err => {
                    //console.log(err)
                    commit('snackbar/SET_SNACKBAR',{text: err.response.data.message, visible: true, color: 'error'},{ root: true });
                    commit('AUTH_ERROR', err.response.data);
                    Cookies.remove('access_token');
                    reject(err);
                })
        });
    },

    authLogout: ({commit, dispatch}) => {
        Cookies.remove('access_token');
        return new Promise((resolve, reject) => {
            axios.get('/api/auth/logout')
                .then((resp) => {
                    commit('CLEAR_USER_PROFILE')
                    commit('AUTH_LOGOUT');
                    resolve();
                })
                .catch((err) => {
                    commit('AUTH_ERROR', err.response.data);
                    reject(err);
                });
        })
    },

    userRequest: ({commit, dispatch}) => {
        commit('AUTH_REQUEST_STATUS')
        return new Promise ((resolve, reject) => {
            axios.get('/api/user')
            .then((resp) => {
                commit('USER_SUCCESS', resp.data);
                resolve(resp.data)
            })
            .catch(errors => {
                console.log(errors)              
                // if resp is unauthorized, logout, to
                dispatch('AUTH_LOGOUT')
                commit('USER_ERROR', errors.response.data);                
                reject(errors)
            })
        })
    },

    getUsers:({commit}) => {        
        return new Promise((resolve, reject) => {
            commit('USERS_STATUS','fetching data');
            axios.get('/api/users')
            .then(response => {
                commit('USERS_STATUS', 'success');
                commit('SET_USERS', response.data);
                resolve(response.data);
            })
            .catch(err => {
                commit('USERS_STATUS', 'error');
                reject(err);
            })
        });
    },

    change: ({commit}, payload) => {
        return new Promise ((resolve, reject) => {
            axios.patch('/api/users/'+payload.id+'/change', payload)
            .then(response => {                  
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success'},{ root: true });
                resolve(response) 
            })
            .catch(errors => {               
                commit('PWD_ERR',errors.response.data); 
                commit('snackbar/SET_SNACKBAR',{text: 'Error changing password!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(errors.response.data);
            });
        });
    },
    create: ({commit,dispatch}, payload) => {
        commit('USERS_STATUS','storing data');
        return new Promise((resolve, reject) => {
            axios.post('/api/users', payload)
            .then(response => {
                commit('USERS_STATUS', 'stored');
                commit('snackbar/SET_SNACKBAR',{text: 'Username:' +response.data.email +' Password: '+ response.data.password, visible: true, color: 'success', timeout: -1},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('USERS_STATUS', 'error storing');
                commit('snackbar/SET_SNACKBAR',{text: 'Error creating user!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },
    remove: ({commit}, payload) => {
        commit('USERS_STATUS','removing data');
        return new Promise((resolve, reject) => {
            axios.delete('/api/users/'+payload.id)
            .then(response => {
                commit('USERS_STATUS', 'removed');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('USERS_STATUS', 'error removing');
                commit('snackbar/SET_SNACKBAR',{text: 'Error removing user!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },
    reset: ({commit}, payload) => {
        commit('USERS_STATUS','resetting password');
        return new Promise((resolve, reject) => {
            axios.post('/api/users/'+payload.id+'/reset', payload)
            .then((response) => {
                commit('USERS_STATUS','reset');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: -1},{ root: true });
                resolve(response.data);
            }).catch(errors => {
                commit('USERS_STATUS', 'error resetting');
                commit('snackbar/SET_SNACKBAR',{text: errors.response.data.message, visible: true, color: 'error', timeout: 5000},{ root: true });                 
                reject(err);
            });
        });
    },
    resetPassword: ({commit}, payload) => {
        commit('USERS_STATUS','sending forgot password link');
        return new Promise((resolve, reject) => {
            axios.post('/password/email', payload)
            .then((response) => {
                commit('USERS_STATUS','email sent');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: -1},{ root: true });
                resolve(response.data);
            }).catch(errors => {
                commit('USERS_STATUS', 'error sending email');
                commit('snackbar/SET_SNACKBAR',{text: errors.response.data.message, visible: true, color: 'error', timeout: 5000},{ root: true });                 
                reject(err);
            });
        });
    },
    update: ({commit,dispatch}, payload) => {
        commit('USERS_STATUS','updating data');
        return new Promise((resolve, reject) => {
            axios.post('/api/users/'+payload.id, payload)
            .then(response => {
                commit('USERS_STATUS', 'updated');
                commit('snackbar/SET_SNACKBAR',{text: response.data.message, visible: true, color: 'success', timeout: 5000},{ root: true });
                resolve(response.data);
            })
            .catch(err => {
                commit('USERS_STATUS', 'error updating');
                commit('snackbar/SET_SNACKBAR',{text: 'Error updating user!', visible: true, color: 'error', timeout: 5000},{ root: true });
                reject(err);
            })
        });
    },

};

const mutations = {
    AUTH_REQUEST_STATUS: (state) => {
        state.status = 'loading';
    },

    AUTH_SUCCESS: (state, access_token) => {
        state.status = 'user authorized';
        state.access_token = access_token;
        state.hasLoadedOnce = true;
    },
    AUTH_ERROR: (state, err) => {
        // let errors=err.errors?err.errors:{};
        // if(err.error=="invalid_credentials"){
        //     errors.invalid_credentials=['The user credentials were incorrect.'];
        // }else if(err.message != undefined){
        //     errors.invalid_credentials = [err.message];
        // }
        console.log(err);
        state.status = 'error';
        state.hasLoadedOnce = true;
    },
    AUTH_LOGOUT: (state) => {
        state.access_token = '';
    },
    USER_SUCCESS: (state, resp) => {
        state.status = 'success';
        state.profile = resp
        //Vue.set(state, 'profile', resp);
    },
    USERS_STATUS : (state, status) => {
        state.status = status 
    },
    SET_USERS: (state, users) => {
        state.users = users
    },
    CLEAR_USERS: (state) => {
        state.users = []
    },
    CLEAR_USER_PROFILE: (state) => {
        //Vue.set(state,'profile',{})
        state.profile = {}
    },
    SET_USER: (state, user) => {
        state.user = user
    },
    CLEAR_USER: (state) => {
        state.user = {}
    },
    PWD_ERR:(state, err) =>{
        let errors=err.errors;
        console.log(errors);
        state.status = 'error';
        state.err = errors;
    }
};

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations,
}