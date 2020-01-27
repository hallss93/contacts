import axios from 'axios'

const api = axios.create({
    baseURL: '/',
    timeout: 60000
})

api.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
)

api.interceptors.request.use(
    (config) => {
        const param = config
        if (param.method === 'put') {
            param.method = 'post'
        }
        return param
    },
    error => Promise.reject(error)
)

export default api
