<script setup>
import { formatCurrency } from '../helpers'
import { defineProps, defineEmits } from 'vue';
defineProps({
    service: {
        type: Object
    }
})

const emits = defineEmits(['delete']);

const handleDelete = (id) => {
    emits('delete', id);
};
</script>

<template>
    <tr>
        <td><img class="img-service img-fluid" :src="service.image" alt=""></td>
        <td>{{ service.name }}</td>
        <td>{{ formatCurrency(service.price) }}</td>
        <td>{{ service.description }}</td>
        <td>
            <div class="btn-group">
                <RouterLink class="btn btn-sm btn-info" :to="{ name: 'edit-service', params: { id: service.id } }">
                    <i class="bi bi-pencil-fill"></i>
                </RouterLink>
                <button class="btn btn-sm btn-danger" @click="handleDelete(service.id)">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </div>
        </td>

    </tr>
</template>

<style scoped>
.img-service {
    width: 100px;
    max-width: 100px;
    height: 100px;
    object-fit: cover;
    object-position: center;
}
</style>