<template>
  <div class="container">
        <form class="form" action="">
            <div class="row">
                <div class="col-3">
                    <label for="username">Usuario: </label>
                </div>
                <div class="col-9">
                    <input type="text" id="username" placeholder="Tu usuario" class="form-control" v-model="userForm.username"/>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="password">Contraseña: </label>
                </div>
                <div class="col-9">
                    <input type="password" id="password" placeholder="Tu contraseña" class="form-control" v-model="userForm.password"/>
                </div>
            </div>
            <div class="row">
                <input type="button" class="btn btn-primary" value="Login" @click="Login"/>
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
                console.log(result.user);
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

    .container{
        width: 50%;
        padding-top: 200px;
    }
    .centrado {
        text-align: center;
    }
</style>