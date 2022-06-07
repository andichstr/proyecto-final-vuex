<template>
    <div class="container">
        <h2>Nuevo Usuario</h2>
        <form class="form" action="">
            <div class="floating-content">
                <input type="text" id="username" placeholder=" " class="floating-input" @keyup="validateUsername()" v-model="user.username"/>
                <label for="username" class="floating-label">Usuario: </label>
            </div>
            <div class="row" v-if='validUsername != ""'>
                <p class="errorForm">{{ validUsername }}</p>
            </div>
            <div class="floating-content">
                <input type="text" id="nombre" placeholder=" " class="floating-input" @keyup="validateNombre($event)" v-model="user.name"/>
                <label for="nombre" class="floating-label">Nombre y Apellido: </label>
            </div>
            <div class="row" v-if='validNombre != ""'>
                <p class="errorForm">{{ validNombre }}</p>
            </div>
            <div class="floating-content">
                <input type="text" id="email" placeholder=" " class="floating-input" @keyup="validateEmail()" v-model="user.email"/>
                <label for="email" class="floating-label">Mail: </label>
            </div>
            <div class="row" v-if='validMail != ""'>
                <p class="errorForm">{{ validMail }}</p>
            </div>
            <div class="floating-content">
                <input type="number" id="edad" class="floating-input" @keyup="validateEdad()" @change="validateEdad()" v-model="user.edad"/>
                <label for="edad" class="floating-label">Edad: </label>
            </div>
            <div class="row" v-if='validEdad != ""'>
                <p class="errorForm">{{ validEdad }}</p>
            </div>
            <div class="floating-content">
                <input type="password" id="password" placeholder=" " class="floating-input" @keyup="validatePassword()" v-model="user.password"/>
                <label for="password" class="floating-label">Contraseña: </label>
            </div>
            <div class="row" v-if='validPassword != ""'>
                <p class="errorForm">{{ validPassword }}</p>
            </div>
            <div class="row divLogin">
                <button class="btn-login" @click="agregarUsuario">
                <span>Agregar</span>
                </button>
            </div>
        </form>
        <div class="row divVolver">
            <router-link to="/">
                <button class="btn-volver">
                    <span>Volver</span>
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import { mapState, mapGetters } from 'vuex';
import validations from '../mixins/validationsMixin';

export default {
    mixins:  [validations],
    methods: {
        agregarUsuario() {
            if (this.checkNewUserForm()){
                store.dispatch('users/addUser', this.user);
                this.resetForm();
            } else {
                alert("Por favor, corrija los errores del formulario y vuelva a intentarlo");
            }
        },
    },
    computed: {
        ...mapState(["users", "userLogged", "orders"]),
        ...mapGetters(["getUsers", "getUserLogged", "getOrders"]),
    }
}
</script>

<style scoped>

    @import '../assets/css/forms.scss';
    @import '../assets/css/buttons.scss';
    .container {
        text-align: center;
        width: 80%;
    }

    .form {
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .errorForm {
        color: red;
        font-size: small;
        text-align: center;
    }

</style>