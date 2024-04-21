import { ref, computed, onMounted, inject } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import ScheduleAPI from '../api/ScheduleAPI'

export const useScheduleStore = defineStore('schedule', () => {


    const scheduleId = ref('')
    const hours = ref([])
    const times = ref([])
    const timesView = ref([])

    const toast = inject('toast')
    const router = useRouter()

    onMounted(() => {
        //fetch times database
        fetchTimes()

        //hours
        const startHour = 1
        const endHour = 24
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour)
        }

    })

    async function fetchTimes() {
        try {

            const { data } = await ScheduleAPI.all();

            timesView.value = data;



        } catch (error) {
            console.log(error);
        }
    }

    function setSelectedTimes(param) {

        times.value = param.times
        scheduleId.value = param.id

    }

    function onTimeSelected(param) {
        if (times.value.some(selectedTime => selectedTime === param)) {

            times.value = times.value.filter(selectedTime => selectedTime !== param)



        } else {

            if (times.value.length === 8) {
                toast.open({
                    message: 'Máximo 8 horas',
                    type: 'error'
                })
                return
            }


            times.value.push(param)

        }

    }

    async function saveSchedule() {

        //ordenar menor a mayor
        const timeOrder = times.value.sort(function (a, b) {
            // Extraemos solo la hora de cada cadena
            const horaA = parseInt(a.split(':')[0]);
            const horaB = parseInt(b.split(':')[0]);

            return horaA - horaB;
        })

        //objeto a guardar
        const timeSave = {
            times: timeOrder
        };

        try {

            const { data } = await ScheduleAPI.update(scheduleId.value, timeSave)

            toast.open({
                message: data.message,
                type: 'success'
            })

        } catch (error) {
            console.log(error);
        }

        clearSchedule()
        fetchTimes()
        router.push({ name: 'working-hours' })

    }

    function clearSchedule() {
        scheduleId.value = ''
    }

    const isTimeSelected = computed(() => {

        return (param) => times.value.some(item => item === param)

    })

    const isValidTime = computed(() => {
        return times.value.length
    })

    return {
        hours,
        times,
        timesView,
        isValidTime,
        setSelectedTimes,
        onTimeSelected,
        isTimeSelected,
        saveSchedule
    }
})
