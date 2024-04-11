import api from "../lib/axios";

export default{

    all(page = 1, limit = 10){
        return api.get(`/services?page=${page}&limit=${limit}`)
    },
    
    create(data){
        return api.post('/services',data)
    },

    delete(id){
        return api.delete(`/services/${id}`)
    },

    getById(id){
        return api.get(`/services/${id}`)
    },

    update(id,data){
        return api.put(`/services/${id}`, data)
    },


}