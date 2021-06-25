import store from '@/store'
import axios from 'axios'

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'user/SET_TOKEN':
            if (mutation.payload) {
                axios.defaults.headers.common['Authorization'] = `Auth ${mutation.payload}`
                localStorage.setItem('sesSuccess',mutation.payload)
            } else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.setItem('sesSuccess',null)
            }
            break;
    
        default:
            break;
    }
})