<template>
<div>
    <div class="usuarios">
        <h1>Bienvenido/a {{ users.userLogged.name }}</h1>
        <div class="divMisOrdenes">
        <router-link :to="{ name: 'MisOrdenes', params: { id: users.userLogged.id }}">
            <button class="btn-ordenes ordenes">
                <span>
                    Mis ordenes
                </span>
            </button>
        </router-link>
    </div>
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

    @import '../../../assets/css/buttons.scss';
    .usuarios {
        margin-top: 50px;
        text-align: center;
    }
    .divMisOrdenes {
        position: relative;
        overflow: hidden;
        justify-content: center;
        vertical-align: center;
        margin-bottom: 30px;
}
</style>