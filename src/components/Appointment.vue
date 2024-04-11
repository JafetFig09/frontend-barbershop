<script setup>
  import { displayDate } from '../helpers/date';
  import { formatCurrency } from '../helpers';
  defineProps({
    appointment:{
      type:Object
    }
  })
</script>

<template>
  <div class="col-12">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="fw-bold">
          Fecha: <span class="fw-normal">{{displayDate(appointment.date) }}</span>
          hora: <span class="fw-normal">{{ appointment.time }} Horas</span>
        </h5>
        <p class="fw-bold">Nombre Cliente: <span class="fw-normal">{{ appointment.user.name }}</span> Correo: <span class="fw-normal">{{ appointment.user.email }}</span></p>

        <p class="fw-bold">Servicios Solicitados en la cita</p>

        <div v-for="service in appointment.services">
          <p class="mb-0 fw-semibold">{{ service.name }}</p>
          <p class="mb-0 text-primary fw-semibold fs-3">{{ formatCurrency(service.price) }}</p>
        </div>
        <div class="d-flex justify-content-end">
          <p class="fs-5 text-right fw-bold">
            Total a pagar: <span class="text-primary">{{ formatCurrency( appointment.total  ) }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


