<template>
  <div class="container">
        <table class="table" v-if="(products.products.length != 0)">
            <thead>
                <th>#</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Editar</th>
                <th>Borrar</th>
            </thead>
            <tbody>
                <tr v-for="(product) in products.products" :key="product.id">
                    <td>{{ product.id }}</td>
                    <td><img :src="product.img" :alt="product.name" class="imgProd"></td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ product.stock }}</td>
                    <td><input type="button" class="btn btn-warning" @click="editarProducto(product.id)" value="Editar"/></td>
                    <td><input type="button" class="btn btn-danger" @click="borrarProducto(product.id)" value="Borrar"/></td>
                </tr>
            </tbody>
        </table>
        <router-link to="/nuevoProducto" class="btn btn-primary">Agregar nuevo producto</router-link>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
    methods: {
        ...mapActions('products', ['getProductsFromAPI', 'editProduct', 'deleteProduct']),
        editarProducto(id) {
            this.$router.push('editarProducto/' + id);
        }
    },
    computed: {
        ...mapState(['products']),
        ...mapGetters(['getProducts']),
    },
    mounted(){
        this.getProductsFromAPI();
    }
}
</script>

<style scoped>
    .container{
        padding-top: 80px;
    }
    .imgProd {
        height: 100px;
    }
</style>