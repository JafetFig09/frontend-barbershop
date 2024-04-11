<script setup>
  import { inject } from 'vue'
  import { useRouter } from 'vue-router'
  import AuthAPI from '../api/AuthAPI'

  const toast = inject('toast')
  const router = useRouter()

  const handleSubmit = async (formData) =>{
   
    try {
      const { data:{token} } = await AuthAPI.login(formData)
      localStorage.setItem('AUTH_TOKEN',token)
      router.push({name: 'admin'})
    } catch (error) {
      toast.open({
        message:error.response.data.message,
        type:'error'
      })
      
    }
  }
</script>

<template>
  <main class="min-vh-100 d-flex align-items-center bg-login">
    <section class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="card p-4 border-barber">
            <div class="card-body">
              <h5 class="text-center text-uppercase card-title mb-4"><i class="fa-solid fa-user-large"></i> Login</h5>
              <FormKit 
                id="loginForm" 
                type="form" 
                :actions="false"
                incomplete-message="No se pudo enviar, Revisa las notificaciones" 
                @submit="handleSubmit"
              >
          
              <FormKit 
                  type="email" 
                  label="Email" 
                  name="email" 
                  placeholder="Email de usuario" 
                  validation="required|email"
                  :validation-messages="{
                      required: 'EL email es obligatorio',
                      email: 'Email no valido'

                  }" 
              />
              <FormKit 
                  type="password" 
                  label="Password" 
                  name="password" 
                  placeholder="Password de Usuario"
                  validation="required" :validation-messages="{
                      required: 'EL password es obligatorio',
                    

                  }" 
              />
          
              <FormKit type="submit">Iniciar Sesión</FormKit>
            </FormKit>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
