<template>
    <div>
        <div v-if="users.userLogged.rol == 1">
            <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand>
                <img src="https://i.imgur.com/eLUSUFJ.png" alt="logo" class="logo">
            </b-navbar-brand>
                <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <template #button-content>
                    <em>{{ users.userLogged.name }}</em>
                    </template>
                    <b-dropdown-item>
                    <router-link :to="{ name: 'MisOrdenes', params: { id: users.userLogged.id }}">
                        <span>
                            Mis Ordenes
                        </span>
                    </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar>
        </div>
        <div v-if="users.userLogged.rol == 99">
            <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">
                <img src="https://i.imgur.com/eLUSUFJ.png" alt="logo" class="logo">
            </b-navbar-brand>
                <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <template #button-content>
                    <em>{{ users.userLogged.name }}</em>
                    </template>
                    <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex';

export default {
    name: "Navbar",
    computed: {
            ...mapState(["users", ["userLogged"]]),
            ...mapGetters(["getUserLogged"]),
        },
    methods: {
        logout() {
            localStorage.removeItem('user');
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>

.logo{
    height: 50px;
    margin-left: 20px;
}

a {
    text-decoration: none;
}

span {
    color: #000
}

</style>