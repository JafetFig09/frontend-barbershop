<script setup>
    import { defineProps } from 'vue';

   
    defineProps({
        isCollapsed: Boolean 
    });

</script>

<template>
    <aside id="sidebar" :class="['js-sidebar', { 'collapsed':  isCollapsed }]">
        <!-- Content For Sidebar -->
        <div class="h-100">
            <div class="sidebar-logo">
                <span class="text"><i class="fa-solid fa-shop"></i> BarberShop</span>
            </div>
            <ul class="sidebar-nav">
                <li class="sidebar-header">
                    Panel Admin
                </li>
                <li class="sidebar-item">
                    <RouterLink
                        class="sidebar-link"
                        :to="{ name: 'services' }" 
                    >
                        <i class="fa-solid fa-scissors"></i> Servicios
                    </RouterLink>
                </li>
               
                <li class="sidebar-item">
                    <RouterLink
                        :to="{name:'appointments'}"
                        class="sidebar-link"
                    >
                       Citas
                    </RouterLink>
                </li>
            </ul>
        </div>
    </aside>
</template>