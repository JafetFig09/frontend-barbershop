import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthAPI from '../api/AuthAPI'
import AppointmentApi from '../api/AppointmentApi'
export const useUserStore = defineStore('user',() =>{

    const router = useRouter()
    const user = ref({})
    const userAppointments = ref([])
    const loading = ref(true)


    onMounted( async () => {
        try {
            const { data } = await AuthAPI.auth()
            user.value = data
            await getAppointments()
        } catch (error) {
            console.log(error);
        }finally{
            loading.value = false
        }
    })

    async function getAppointments(){
        const { data } = await AppointmentApi.getAppointments()
       userAppointments.value = data;
       
       
    }

    function logout(){
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({name:'home'})
    }

    const noAppointments = computed(() => userAppointments.value.length === 0)
  
    const getUserName = computed(() => user.value?.name ? user.value?.name : '')
    return{
        user,
        getAppointments,
        userAppointments,
        loading,
        logout,
        getUserName,
        noAppointments
    }

})