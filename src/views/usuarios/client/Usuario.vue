<template>
<div>
    <div class="divMisOrdenes">
        <router-link :to="{ name: 'MisOrdenes', params: { id: users.userLogged.id }}" class="btn btnMisOrdenes">Mis ordenes</router-link>
    </div>
    <div class="usuarios">
        <h1>Bienvenido/a {{ users.userLogged.name }}</h1>
        <Productos/>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Productos from '../../../components/Productos.vue';

export default {
    name: 'Usuario',
    components: { Productos },
    computed: {
        ...mapState(["users", ["userLogged", "orders"]]),
        ...mapState(["products", ["products"]]),
        ...mapGetters(["getUserLogged", "getOrders"]),
        ...mapGetters(["getProducts"]),
    },
    mounted() {
        const userAlreadyLogged = JSON.parse(localStorage.getItem('user'));
        if (userAlreadyLogged != null) {
            this.setUserLogged(userAlreadyLogged);
        } else {
            this.$router.push("/");
        }
    },
    methods: {
        ...mapActions("users", ["setUserLogged"]),
        ...mapActions("products", ["getProductsFromAPI"]),
    }
}
</script>

<style>
    .usuarios {
        margin-top: 50px;
        text-align: center;
    }
    .divMisOrdenes {
        text-align: center;
        top: 0;
    }
    .btnMisOrdenes {
        background-color: chocolate;
        font-weight: bold;
    }
</style>