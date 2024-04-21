import api from "../lib/axios";

export default {

    all() {
        return api.get('/schedule')
    },
    getById(id) {
        return api.get(`/schedule/${id}`)
    },

    update(id, data) {
        const token = localStorage.getItem('AUTH_TOKEN')
        return api.put(`/schedule/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    },


}