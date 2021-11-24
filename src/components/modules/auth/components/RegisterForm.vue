<template>
  <form class="form form--signup"  @submit.prevent="onSubmit" >
    <button 
      @click="$emit('on:close')"
      class="form__btn__close"
    >           
      <i class="fas fa-times"></i>
    </button>
    <div class="form__title__container">
      <h3>Registrarse</h3>
    </div>
    <div class="form__field">
      <input
        type="text"
        placeholder="Nombre"
        v-model="userForm.name"
        required
      />
    </div>
    <div class="form__field">
      <input
        type="text"
        placeholder="Apellido"
        v-model="userForm.surname"
        required
      />
    </div>
    <div class="form__field">
      <input
        type="email"
        placeholder="Correo"
        v-model="userForm.email"
        required
      />
    </div>
    <div class="form__field">
      <input
        type="password"
        placeholder="Contraseña"
        v-model="userForm.password"
        required
      />
    </div>
    <div class="form__field">
      <input
        type="password"
        placeholder="Confirmar contraseña"
        v-model="userForm.confirmPassword"
        required
      />
    </div>
     <div class="form__field__checkbox">
      <input
          type='checkbox'
          id="checkPrivacyPolicy"
          v-model="userForm.conditions"
          required         
      />
      <label htmlFor="checkPrivacyPolicy">Términos y condiciones</label>
    </div>
    <button
      class="form__btn__submit"
      type="submit"
    >Register
    </button>
    <div class="form__change">
      <p>¿Ya tienes cuenta? 
        <span
          @click="$emit('on:change')"
        >Ingresar
        </span>
      </p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "@/components/modules/auth/composables/useAuth";
import Swal from "sweetalert2";

export default {
  emits: ["on:close", "on:change"],
  setup() {
    const router = useRouter();
    const { createUser } = useAuth();

    const userForm = ref({
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword:"",
      conditions: false,
    });

    return {
      userForm,
      onSubmit: async () => {
        const { ok, message } = await createUser(userForm.value);
        if (!ok) {
          Swal.fire("Error", message, "error");
        } else {
          Swal.fire("Usuario creado", message, "success");
          router.push({ name: "profile" });
        }
      },
    };
  },
};
</script>

<style>
</style>