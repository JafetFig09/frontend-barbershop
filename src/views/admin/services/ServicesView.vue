<script setup>
    import {computed} from "vue";
    import ServiceItem from '../../../components/ServiceItem.vue'
    import {useServicesStore} from '../../../stores/services'
    
    

    const store = useServicesStore()
  
   const totalPages = computed(() => Math.ceil(store.total / store.limit));

   /* Disminuye el número de página en uno si no estás en la primera página. */
    const prevPage = () =>{
        if (store.page > 1) {
            store.setPage(store.page - 1);
        }
    }
    
   /* Aumenta el número de página en uno si no estás en la última página. */
    const  nextPage = () => {

        if (store.page < totalPages.value) {
            store.setPage(store.page + 1);
        }
    }

   /* Establece la página actual a un número específico. */
    const gotoPage = (page) => {
        store.setPage(page);
    }

    /* Eliminar servicio */
    const deleteService = (id) =>{
        store.deleteService(id);
    }

   
    
    
</script>

<template>
    <section class="h1 mb-5">
       Servicios
       <div class="btn-group">
            <RouterLink :to="{name: 'add-service'}" class="btn btn-sm btn-outline-success rounded-pill">
                <i class="fa-solid fa-plus"></i> Agregar
            </RouterLink>
       </div>
    </section>
    <div class="row justify-content-end">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: store.page <= 1 }">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="prevPage">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>

                <li class="page-item" :class="{ active: store.page === page }"  v-for="page in totalPages" :key="page">
                    <a class="page-link" href="#" @click.prevent="gotoPage(page)">{{ page }}</a>
                </li>

                <li class="page-item" :class="{ disabled: store.page >= totalPages }">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="nextPage">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <!-- loading content -->
                    <div v-if="store.loading" class="d-flex justify-content-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                    <div v-else class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Imagen</th>
                                    <th scope="col">Servicio</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Acciones</th>

                                </tr>
                            </thead>
                            <tbody>
                             
                                <ServiceItem
                                    v-for="service in store.services"
                                    :key="service.id"
                                    :service="service"
                                    @delete="deleteService"
                                />

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
   
</template>