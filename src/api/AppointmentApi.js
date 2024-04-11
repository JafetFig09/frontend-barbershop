import api from "../lib/axios";

export default{

    getAppointments(){
        const token = localStorage.getItem('AUTH_TOKEN')
        return api.get(`/users/appointments`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    },
    
  

}