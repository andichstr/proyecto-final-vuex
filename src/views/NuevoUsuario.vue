<template>
    <div class="container">
        <h1>Nuevo Usuario</h1>
        <form class="form" action="">
            <div class="row">
                <div class="col-3">
                    <label for="username">Usuario: </label>
                </div>
                <div class="col-9">
                    <input type="text" id="username" placeholder="Tu Usuario" class="form-control" @keyup="validateUsername()" v-model="user.username"/>
                </div>
            </div>
            <div class="row" v-if='validUsername != ""'>
                <p class="errorForm">{{ validUsername }}</p>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="nombre">Nombre y Apellido: </label>
                </div>
                <div class="col-9">
                    <input type="text" id="nombre" placeholder="Tu nombre y apellido" class="form-control" @keyup="validateNombre($event)" v-model="user.name"/>
                </div>
            </div>
            <div class="row" v-if='validNombre != ""'>
                <p class="errorForm">{{ validNombre }}</p>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="email">Mail: </label>
                </div>
                <div class="col-9">
                    <input type="text" id="email" placeholder="Tu email" class="form-control" @keyup="validateEmail()" v-model="user.email"/>
                </div>
            </div>
            <div class="row" v-if='validMail != ""'>
                <p class="errorForm">{{ validMail }}</p>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="edad">Edad: </label>
                </div>
                <div class="col-9">
                    <input type="number" id="edad" placeholder="Tu edad" class="form-control" @keyup="validateEdad()" @change="validateEdad()" v-model="user.edad"/>
                </div>
            </div>
            <div class="row" v-if='validEdad != ""'>
                <p class="errorForm">{{ validEdad }}</p>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="password">Contraseña: </label>
                </div>
                <div class="col-9">
                    <input type="password" id="password" placeholder="Tu contraseña" class="form-control" @keyup="validatePassword()" v-model="user.password"/>
                </div>
            </div>
            <div class="row" v-if='validPassword != ""'>
                <p class="errorForm">{{ validPassword }}</p>
            </div>
            <div class="row">
                <input type="button" class="btn btn-agregar" value="Agregar" @click="agregarUsuario"/>
            </div>
        </form>
        <div class="btnVolverDiv">
            <router-link to="/"><button class="btn btn-danger">Volver</button></router-link>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import { mapState, mapGetters, mapActions } from 'vuex';
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

    .container {
        text-align: center;
    }
    input {
        width: 100%;
    }

    .col-3 {
        text-align: right;
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

    .btn-agregar {
        background-color: #0d6efd;
        border-color: #0d6efd;
        color: white;
        margin-top: 5px;
    }

    .btnVolverDiv {
        text-align: center;
        margin-top: 5px;
    }
</style>