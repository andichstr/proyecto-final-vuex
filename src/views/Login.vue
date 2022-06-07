<template>
  <div class="container">
      <h2>Inicio de Sesión</h2>
        <form class="form" action="">
            <div class="floating-content">
                <input type="text" id="username" placeholder=" " class="floating-input" v-model="userForm.username"/>
                <label class="floating-label" for="username">Usuario: </label>
            </div>
            <div class="floating-content">
                <input type="password" id="password" placeholder=" " class="floating-input" v-model="userForm.password"/>
                <label class="floating-label" for="password">Contraseña: </label>
            </div>
            <div class="row divLogin">
                <button type="button" class="btn-login" @click="Login">
                    <span>Login</span>
                </button>
            </div>
            <div class="row centrado">
                <router-link to="/register">¿No estas registrado? ¡Registrate haciendo click aquí!</router-link>
            </div>
        </form>
    </div>
</template>

<script>

import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name: 'Login',
    data(){
        return {
            userForm: {
                username: "",
                password: "",
            },
            msgError: "",
        }
    },
    mounted(){
        this.getUsersFromAPI();
        localStorage.removeItem('user');
    },
    methods: {
        ...mapActions("users", ["getUsersFromAPI", "setUserLogged"]),

        tryToLog(users) {
            for (const element of users){
                if (element.username == this.userForm.username){
                    if(element.password == this.userForm.password){
                        var result = {'isValid': true, 'user': element};
                        return result;
                    } else {
                        result = {'isValid': false, 'err': -1}
                    }
                } else {
                    result = {'isValid': false, 'err': -2}
                }
            }
            return result;
        },

        Login(){
            let result = this.tryToLog(this.users.users);
            if (result.isValid){
                this.setUserLogged(result.user);
                delete result.user.password;
                localStorage.setItem('user', JSON.stringify(result.user));
                if(result.user.rol == 99) {
                    this.$router.push('/admin');
                } else {
                    this.$router.push('/index');
                }
            } else if (result.err === -1) {
                this.msgError = "La contraseña no coincide con el usuario ingresado.";
                console.log(this.msgError);
            } else if (result.err === -2) {
                this.msgError = "El usuario ingresado no se encuentra registrado.";
                console.log(this.msgError);
            }
        },
    },
    computed: {
        ...mapState(["users", ["users", "userLogged", "orders"]]),
        ...mapGetters(["getUsers", "getUserLogged"]),
    }
}

</script>

<style scoped>
    @import '../assets/css/forms.scss';
    @import '../assets/css/buttons.scss';
    .container{
        width: 50%;
        padding-top: 200px;
        text-align: center;
    }
    .centrado {
        text-align: center;
    }
</style>