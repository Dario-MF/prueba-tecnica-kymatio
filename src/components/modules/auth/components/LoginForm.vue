<template>
 
  <form class="form"  @submit.prevent="onSubmit" >
    <button 
      @click="$emit('on:close')"
      class="form__btn__close"
    >           
      <i class="fas fa-times"></i>
    </button>
    <div class="form__title__container">
      <h3>Ingresar</h3>
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
    <p class='form__forgotPassword'>¿Olvidaste la contraseña?</p>
    <button
      class="form__btn__submit"
      type="submit"
    >Login
    </button>
    <div class="form__change">
      <p>¿No tienes cuenta? 
        <span
          @click="$emit('on:change')"
        >Registrarse
        </span>
      </p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "@/composables/useAuth";
import Swal from "sweetalert2";

export default {
  emits: ["on:close", "on:change"],
  setup() {
    const router = useRouter();
    const { loginUser } = useAuth();

    const userForm = ref({
      email: "",
      password: "",
    });

    return {
      userForm,
      onSubmit: async () => {
        const { ok, message } = await loginUser(userForm.value);

        if (!ok) {
          Swal.fire("Error", message, "error");
        } else {
          Swal.fire("Bienvenido", message, "success");
          router.push({ name: "profile" });
        }
      },
    };
  },
};
</script>

<style lang="scss">
.form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &__title__container h3 {
    margin-bottom: 3rem;
    font-size: $font-size-XL;
    color: $color-fourth;
  }
  &__forgotPassword {
    cursor: pointer;
    font-size: .9rem;
    text-align: right;
    position: relative;
    top: -1rem;
    &:hover {
      color: $color-fourth;
    }
  }
  &__field {
    width: 100%;
    height: 3rem;
    margin-bottom: 20px;
  }
}

.form__field input{
  width: 100%;
  outline: none;
  padding: .7rem 1rem;
  border-radius: 10px;
  border: 1px solid transparent;
  font-size: $font-size-M;
  transition: all 0.3s ease;
  background-color: $color-first;
  &:focus{
    border-color: $color-fourth;
    background-color: $color-first;
  }
  &::placeholder {
    color: rgb(177, 175, 175);
    transition: all 0.3s ease;
  }
  &:focus::placeholder{
    color: rgba(177, 175, 175, 0.5);
  }
}

.form__change{
    margin-top: 30px;
    & span{
        cursor: pointer;
        color:  $color-accent;
        &:hover{
            text-decoration: underline;
        }
    } 
}

.form__btn__submit {
    @include btn;
    color: $color-text-ligth;
    cursor: pointer;
    background: -webkit-linear-gradient(left, $color-fourth, $color-accent);
    width: 100%;
    margin-top: 1em;
    &:hover {
      filter:brightness(1.2);
    }
}

.form__btn__close {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  border: none;
  background-color: transparent;
  font-size: 2rem;
  cursor: pointer;
  &:hover {
    color: $color-fourth;
  }
}

.form__field--checkbox {
  width: 100%;
  height: 2rem;
  & input {
    margin: 0 1rem;
  }
  &__conditionsLink {
    color: $color-fourth;
    padding: .1rem .4rem;
    &:hover {
      background-color: $color-fourth;
      color: $color-text-ligth;
    }
  }
}

@include mq(l){
  .form{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }

  .form__field input {
    font-size: 1rem;
  }
  
  .form--signup .form__field:nth-child(4){
    width: 48%;
  }
  .form--signup .form__field:nth-child(5){
    width: 48%;
  }
  .form__btn__submit {
    margin-top: 0;
  }
}
</style>