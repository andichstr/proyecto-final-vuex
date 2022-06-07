<template>
    <div>
        <div class="grillaProducto">
            <img
                :alt="producto.name"
                :src="producto.img"
                class="imgGrilla"
            />
            <h4>{{ producto.name }}</h4>
            <div>Disponibles: {{ producto.stock }}</div>
            <div>$ {{ producto.price }}</div>
            <input type="number" v-model="contador" @keyup="checkContador()"/>
            <input type="button" :disabled="!botonProductoHabilitado" class="botonAgregarCarrito" @click="agregarProductoCarrito()" :value="valorBotonProducto"/>
            <router-link :to="{ name: 'Producto', params: { id: producto.id }}">
            <input type="button" class="botonVerDetalle" value="Ver detalle"/>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    data() {
        return {
            contador: 0,
            valorBotonProducto: "Agregar",
            botonProductoHabilitado: false,
        }
    },
    name: 'CartaProducto',
    props:{
        producto: {
            type: Object,
            required: true
        },
    },
    computed: {
        ...mapState(['products']),
        ...mapGetters(['getProducts']),
        ...mapState(['cart']),
        ...mapGetters(['getCart'])
    },
    methods: {
        ...mapActions('products', ['getProductsFromAPI', 'setActualProduct']),
        ...mapActions('cart', ['addProductToCart']),
        checkContador() {
            if (this.contador > this.producto.stock){
                this.contador = this.producto.stock;
            } else if (this.contador < 0) {
                this.contador = 0;
            }
            this.checkStock();
        },
        checkStock() {
            if (this.producto.stock == 0){
                this.botonProductoHabilitado = false;
                this.valorBotonProducto = "Sin stock";
            } else if (this.producto.stock != 0 && this.contador == 0) {
                this.botonProductoHabilitado = false;
                this.valorBotonProducto = "Agregar";
            } else {
                this.botonProductoHabilitado = true;
                this.valorBotonProducto = "Agregar";
            }
        },
        agregarProductoCarrito(){
            let miProducto = {...this.producto};
            miProducto.stock = this.contador;
            this.addProductToCart(miProducto);
        }
    },
    mounted() {
        this.setActualProduct(this.producto);
    },
}
</script>

<style scoped>

.grillaProducto{
    position: relative;
    width: 300px;
    max-height: 380px;
    box-shadow: 0 0 10px rgba(45, 75, 100, 0.7);
    background-color: rgba(149, 184, 214, 0.7);
    color: black;
    padding: 5px;
    margin: auto;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    z-index: 1;
}

.favorito {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 40px;
}

.imgGrilla {
    max-width: 100%;
    height: 150px;
}

.grillaProducto:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.7);
}

.botonAgregarCarrito {
    background-color: #01d9ffd7;
    width: 130px;
    border-radius: 10px;
    margin-top: 10px;
    font-size: 1.1em;
    padding: 5px 0;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
}

.botonAgregarCarrito:hover {
    background-color: #0aa19ad0;
}
.botonVerDetalle {
    background-color: burlywood;
    width: 130px;
    border-radius: 10px;
    margin-top: 10px;
    font-size: 1.1em;
    padding: 5px 0;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
}

.botonVerDetalle:hover {
    background-color: rgb(109, 88, 61);
}

</style>