<script setup>
import { inject } from 'vue'
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { reset } from '@formkit/vue'
import ServicesAPI from '../../../api/ServicesAPI';
import { useServicesStore } from '../../../stores/services'

const toast = inject('toast')
const router = useRouter()
const route = useRoute()

const { id } = route.params

const formState = ref({
    name: '',
    description: '',
    price: null,
    mainService: '',
    image: null
});

const store = useServicesStore()

const handleSubmit = async ({ name, description, price, mainService, image }) => {

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
        const { data } = await ServicesAPI.update(id, formData);
        toast.open({
            message: data.message,
            type: 'success'
        })
        // Reiniciar el formulario después de enviar la solicitud con éxito
        reset('serviceForm');

        // Después de editar, volvemos a cargar la lista de servicios
        store.fetchServices();

        //redirigir a la ruta de servicios
        router.push({ name: 'services' })
    } catch (error) {
        console.error(error);
    }
}



onMounted(async () => {

    try {
        //pasar el id
        const { data } = await ServicesAPI.getById(id)

        formState.value = {
            name: data.name,
            description: data.description,
            price: data.price,
            mainService: data.mainService ? 'true' : 'false',
            image: data.image

        };

    } catch (error) {
        router.push({ name: 'services' })
    }
})

</script>

<template>
    <div class="row">
        <div class="col-12">
            <div class="card shadow-sm">
                <div class="card-header">
                    <div class="h2">
                        Editar Servicio
                        <RouterLink :to="{ name: 'services' }" class="btn btn-sm btn-outline-danger rounded-pill">
                            Cancelar
                        </RouterLink>
                    </div>

                </div>
                <div class="card-body">
                    <FormKit id="serviceForm" type="form" :actions="false"
                        incomplete-message="No se pudo enviar, Revisa las notificaciones" @submit="handleSubmit">

                        <FormKit type="text" label="Nombre" name="name" placeholder="Nombre servicio"
                            validation="required" :validation-messages="{
                                required: 'Campo obligatorio'
                            }" v-model="formState.name" />
                        <FormKit type="textarea" label="Descripcion" name="description"
                            placeholder="Descripcion servicio" validation="required" :validation-messages="{
                                required: 'Campo obligatorio'
                            }" v-model="formState.description" />
                        <FormKit type="number" label="Precio" name="price" placeholder="Precio servicio"
                            validation="required" :validation-messages="{
                                required: 'Campo obligatorio'
                            }" v-model="formState.price" disabled="true" />
                        <FormKit type="select" name="mainService" label="Marcar como destacado" :options="[
                            { label: 'No destacado', value: 'false' },
                            { label: 'Destacado', value: 'true' },
                        ]" v-model="formState.mainService" />
                        <!-- Mostrar la imagen actual -->
                        <div v-if="formState.image">
                            <h5>Imagen Actual</h5>
                            <img :src="formState.image" alt="Imagen actual" class="img-edit">
                        </div>

                        <!-- Input para seleccionar nueva imagen -->
                        <FormKit type="file" accept=".jpg,.jpeg,.png" multiple="true" label="Nueva imagen"
                            name="image" />

                        <FormKit type="submit">Actualizar servicio</FormKit>
                    </FormKit>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
.img-edit {
    max-width: 200px;
    object-fit: cover;
}
</style>
