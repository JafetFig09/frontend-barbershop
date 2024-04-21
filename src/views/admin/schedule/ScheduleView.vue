<script setup>
import { useScheduleStore } from '../../../stores/schedule'

const store = useScheduleStore()


</script>

<template>

    <div class="card mt-5">

        <div class="card-body">
            <div v-for="times in store.timesView" :key="times">
                <div class="row mb-2">
                    <div class="col-6">
                        <RouterLink :to="{ name: 'edit-hours', params: { id: times.id } }"
                            class="btn btn-sm btn-info me-2">
                            <i class="fa-solid fa-pen-to-square"></i> Editar Horas
                        </RouterLink>
                    </div>
                    <div class="col-5">
                        <div class="item">
                            <div class="item__square bg-success-subtle me-2"></div>
                            Hora de trabajo
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div v-for="n in 24" :key="n" class="col-6 col-md-3 d-flex justify-content-center border"
                        :class="times.times.includes(`${n}:00`) ? 'bg-success-subtle border-primary' : ''">
                        {{ `${n}:00` }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.item {
    display: flex;
    column-gap: 5px;
}

.item__square {
    width: 20px;
    height: 20px;
}
</style>
