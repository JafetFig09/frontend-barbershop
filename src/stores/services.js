import { ref, onMounted } from "vue";
import {defineStore } from "pinia";
import ServicesAPI from "../api/ServicesAPI";

export const useServicesStore = defineStore('services', () =>{

    const services = ref([]);
    const loading = ref(true);
   /*  paginacion */
   const page = ref(1);
   const limit = ref(4);
   const total = ref(0); // Total de servicios

   onMounted(fetchServices);

    async function fetchServices() {
       
        try {
            loading.value = true;
            const { data } = await ServicesAPI.all(page.value, limit.value);
            services.value = data.data;
            total.value = data.total;
            
           
        }catch(error){
            console.log(error);
        } finally {
            
            loading.value = false;
        }
    }

    async function deleteService(id) {
        try {
            await ServicesAPI.delete(id);
            // Eliminar el servicio de la lista local
            services.value = services.value.filter(service => service.id !== id);

            // Reducir el número total de elementos
            total.value -= 1; 

            // Si la página actual está vacía y no es la primera pagina, cambia a la página anterior
            if (services.value.length === 0 && page.value > 1) {
                setPage(page.value - 1);
                // Actualizar la lista de servicios
                fetchServices(); 
            }
            
            
        } catch (error) {
            console.error(error);
        }
    }

  
   

    function setPage(newPage) {
        page.value = newPage;
        fetchServices();
    }

    return{
        services,
        loading,
        page,
        limit,
        total,
        fetchServices,
        deleteService,
        setPage

    }
})