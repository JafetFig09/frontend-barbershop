<script setup>
    import Appointment from '../../../components/Appointment.vue';
    import { useUserStore } from '../../../stores/user'

    const user = useUserStore()

</script>

<template>
    <div v-if="user.loading" class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <div v-else>
        <p v-if="user.noAppointments" class="h4 text-center">No tienes próximas citas</p>
        <div v-else>
           <div class="row row-appointments">
                <Appointment
                    v-for="appointment in user.userAppointments"
                    :key="appointment.id"
                    :appointment="appointment"
                />
           </div>
        </div>
    </div>
</template>

<style scoped>
   .row-appointments{
    row-gap: 20px;
   }
</style>