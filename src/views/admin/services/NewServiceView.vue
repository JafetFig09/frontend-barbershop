<script setup>
import { inject } from 'vue';
import { reset } from '@formkit/vue'
import ServicesAPI from '../../../api/ServicesAPI';
import { useRouter } from 'vue-router'
import { useServicesStore } from '../../../stores/services'

const toast = inject('toast')
const router = useRouter()
const store = useServicesStore()

const handleSubmit = async ({ name, description, price,mainService, image }) => {
    // Crear un objeto FormData
    const formData = new FormData();

     // Convertir mainService de string a boolean
     const mainServiceBoolean = mainService === 'true';

    // Agregar los datos del formulario al FormData
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('mainService', mainServiceBoolean);

    // Si hay una imagen seleccionada, agregarla al FormData
    if (image && image.length > 0) {
        formData.append('image', image[0].file);
    }

    try {
        // Enviar la solicitud al servidor utilizando ServicesAPI.create
        const { data } = await ServicesAPI.create(formData);
        toast.open({
            message:data.message,
            type:'success'
        })
        
        
        // Reiniciar el formulario después de enviar la solicitud con éxito
        reset('serviceForm');

        // Después de agregar un nuevo servicio, volvemos a cargar la lista de servicios
        store.fetchServices();
        
        //redirigir a la ruta de servicios
        router.push({ name: 'services' })
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <div class="row">
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header">
                    <div class="h2">
                        Agregar Servicio
                        <RouterLink :to="{ name: 'services' }" class="btn btn-sm btn-outline-danger rounded-pill">
                            Cancelar
                        </RouterLink>
                    </div>

                </div>
                <div class="card-body">
                    <FormKit
                        id="serviceForm" 
                        type="form"
                        :actions="false"
                        incomplete-message="No se pudo enviar, Revisa las notificaciones" 
                        @submit="handleSubmit" 
                        >

                        <FormKit 
                            type="text" 
                            label="Nombre" 
                            name="name" 
                            placeholder="Nombre servicio"
                            validation="required" 
                            :validation-messages="{
                                required: 'Campo obligatorio'
                            }" 
                        />
                        <FormKit 
                            type="textarea" 
                            label="Descripcion" 
                            name="description"
                            placeholder="Descripcion servicio" 
                            validation="required" 
                            :validation-messages="{
                                required: 'Campo obligatorio'
                            }" 
                        />
                        <FormKit 
                            type="number" 
                            label="Precio" 
                            name="price" 
                            placeholder="Precio servicio"
                            validation="required" 
                            :validation-messages="{
                                required: 'Campo obligatorio'
                            }" 
                          
                              
                        />
                       
                        <FormKit
                            type="select"
                            name="mainService"
                            label="Marcar como destacado"
                            :options="[
                                { label: 'No destacar', value: 'false' },
                                { label: 'Destacar', value: 'true' },
                            ]"
                          
                        />
                        <FormKit 
                            type="file" 
                            accept=".jpg,.jpeg,.png" 
                            multiple="true" 
                            label="Imagen" 
                            name="image"
                            validation="required" 
                            :validation-messages="{
                                required: 'Campo obligatorio'
                            }" 
                        />

                        <FormKit type="submit">Crear Servicio</FormKit>
                    </FormKit>
                </div>
            </div>
        </div>
    </div>
</template>


