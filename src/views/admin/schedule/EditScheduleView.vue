<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useScheduleStore } from '../../../stores/schedule'
import ScheduleAPI from '../../../api/ScheduleAPI'

const route = useRoute()
const router = useRouter()

const { id } = route.params

const schedule = useScheduleStore()

onMounted(async () => {
    try {
        const { data } = await ScheduleAPI.getById(id)
        schedule.setSelectedTimes(data)
    } catch (error) {
        router.push({ name: 'working-hours' })
    }
})

</script>

<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex">
                <h5 class="card-title me-2">Selecciona las horas</h5>
                <RouterLink :to="{ name: 'working-hours' }" class="btn btn-sm btn-outline-danger rounded-pill">
                    Cancelar
                </RouterLink>
            </div>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-6 col-md-4 col-lg-3 " v-for="hour in schedule.hours">
                    <button class="w-100 h4 p-3   border" @click="schedule.onTimeSelected(`${hour}:00`)"
                        :class="schedule.isTimeSelected(`${hour}:00`) ? 'bg-primary text-white' : 'bg-light text-primary'">
                        {{ `${hour}:00` }}
                    </button>
                </div>

            </div>
            <div class="row mt-3" v-if="schedule.isValidTime">
                <div class="col-12">
                    <button class="w-100 btn btn-success" @click="schedule.saveSchedule">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>
