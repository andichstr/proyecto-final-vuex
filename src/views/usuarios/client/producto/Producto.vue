<template>
    <div class="container">
        <div>
            <Carrito :productos="this.carrito" @eliminar-producto-carrito="eliminarProductoEnCarrito" @create-order="createOrder"/>
        </div>
        <div class="container">
            <img :alt="producto.name" :src="producto.img" class="imgProducto"/>
                <h1>{{ producto.name }}</h1>
                <h4>{{ producto.desc }}</h4>
                <div>Disponibles: {{ producto.stock }}</div>
                <div>$ {{ producto.price }}</div>
                <input type="number" v-model="contador" @keyup="checkContador()"/>
                <input type="button" :disabled="botonProductoDeshabilitado" class="botonCambiarCarrito" @click="cambiarCarrito()" :value="valorBotonProducto"/>
        </div>
            <router-link to="/index">
                <input type="button" class="btn btn-danger" value="Volver"/>
            </router-link>
    </div>
</template>

<script>
import Carrito from '@/components/Carrito.vue';

export default {
    name: 'Producto',
    components: { Carrito },
}

</script>

<style scoped>
    .container {
        margin-top: 50px;
        text-align: center;
    }
    .btn-danger {
        margin-top: 5px;
    }
    .imgProducto {
        max-height: 250px;
    }
</style>