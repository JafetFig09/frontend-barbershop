<script setup>
import { defineProps } from 'vue';


defineProps({
    isCollapsed: Boolean
});

</script>

<template>
    <aside id="sidebar" :class="['js-sidebar', { 'collapsed': isCollapsed }]">
        <!-- Content For Sidebar -->
        <div class="h-100">
            <div class="sidebar-logo">
                <RouterLink :to="{ name: 'admin' }" class="text"><i class="fa-solid fa-shop"></i> BarberShop
                </RouterLink>
            </div>
            <ul class="sidebar-nav">
                <li class="sidebar-header">
                    Panel Admin
                </li>
                <li class="sidebar-item">
                    <RouterLink class="sidebar-link" :to="{ name: 'services' }">
                        <i class="bi bi-scissors"></i> Servicios
                    </RouterLink>
                </li>

                <li class="sidebar-item">
                    <RouterLink :to="{ name: 'appointments' }" class="sidebar-link">
                        Citas
                    </RouterLink>
                </li>

                <li class="sidebar-item">
                    <RouterLink :to="{ name: 'working-hours' }" class="sidebar-link">
                        <i class="bi bi-watch"></i> Horario
                    </RouterLink>
                </li>
            </ul>
        </div>
    </aside>
</template>