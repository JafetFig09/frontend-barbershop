<script setup>
    import { useUserStore } from '../../stores/user'
    import AdminSidebar from '../../components/AdminSidebar.vue'
    import { ref } from 'vue';

    const isCollapsed = ref(false);
    const user = useUserStore()

    // Toggle del sidebar
    function toggleSidebar() {
        isCollapsed.value = !isCollapsed.value;
    }
</script>
<template>
    <div class="wrapper">
       <AdminSidebar :isCollapsed="isCollapsed"/>
        <div class="main">
            <nav class="navbar navbar-expand px-3 border-bottom bg-primary-subtle">
                <button @click="toggleSidebar()" class="btn" >
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="navbar-collapse navbar">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a href="#" data-bs-toggle="dropdown" class="nav-icon pe-md-0 text-black">
                               <span> Hola: {{  user.getUserName }}</span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                                <button
                                    class="dropdown-item"
                                    @click="user.logout"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <main class="content px-3 py-2">
                <div class="container-fluid">
                    <RouterView />
                </div>
            </main>
        </div>
    </div>
</template>
