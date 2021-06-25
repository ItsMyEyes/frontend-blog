// import axios from 'axios'

import axios from "axios"

export default({
    namespaced: true,
    state: {
        token: null,
        user: null,
        auth: false,
    },
    mutations: {
        SET_TOKEN(state,token) {
            state.token = token
        },
        SET_USERS(state,user) {
            state.user = user
        },
        SET_AUTH(state,auth) {
            state.auth = auth
        },
    },
    getters: {

    },
    actions: {
        async signIn({ dispatch, commit }, creadential) {
            return new Promise ((resolve, reject) => {
                axios.post('auth',creadential).then(res => {
                    resolve(res.data)
                    dispatch('attempt',res.data.token)
                }).catch(err => {
                    reject(err.response.data)
                    localStorage.removeItem('sesSuccess')
                    commit('SET_TOKEN',null)
                    commit('SET_USERS',null)
                })  
            })
        },

        async register(_, creadential) {
            return new Promise((resolve, reject) => {
                axios.post('auth/register', creadential).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err.response.data)
                })
            })
        },

        async attempt({ commit,state }, token) {
            if (!token) {
                commit('SET_AUTH',false)
                commit('SET_TOKEN', null)
            }else {
                commit('SET_TOKEN', token)
                localStorage.setItem('sesSuccess',token)
            }
    
            if (!state.token) return;
    
            try {
                let response = await axios.get('auth/me')
                commit('SET_USERS',response.data)
                commit('SET_AUTH',true)
            } catch (e) {
                commit('SET_TOKEN',null)
                commit('SET_USERS',null)
                commit('SET_AUTH',false)
            }
        },

        async logout({commit}) {
            axios.get('auth/logout');
            commit("SET_TOKEN",null)
            commit("SET_AUTH",false)
            commit("SET_USERS",false)
        }
    },
})
