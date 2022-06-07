<template>
    <div class="container">
        <form action="">
            <div class="row">
                <div class="col-3">
                    <label for="nombre">Nombre:</label>
                </div>
                <div class="col-9">
                    <input type="text" id="nombre" class="form-control" placeholder="Nombre del producto" v-model="producto.name"/>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="imagen">Imagen:</label>
                </div>
                <div class="col-9">
                    <input type="text" id="imagen" class="form-control" placeholder="Url de la imagen" v-model="producto.img"/>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="desc">Descripción:</label>
                </div>
                <div class="col-9">
                    <textarea id="desc" class="form-control" placeholder="Descripción del producto" v-model="producto.desc"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="precio">Precio:</label>
                </div>
                <div class="col-9">
                    <input type="number" class="form-control" id="precio" v-model="producto.price"/>
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <label for="stock">Stock:</label>
                </div>
                <div class="col-9">
                    <input type="number" class="form-control" id="stock" v-model="producto.stock"/>
                </div>
            </div>
            <div class="divBotones">
                <input type="button" class="btn btn-primary btnGuardar" @click="guardarProducto()" value="Guardar producto">
                <router-link to="/admin" class="btn btn-warning btnVolver">Volver</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'


export default {
    data() {
        return {
            producto: {
                name: "",
                img: "",
                desc: "",
                price: 0,
                stock: 0,
            },
        }
    },
    methods: {
        ...mapActions('products', ['getProductsFromAPI', 'editProduct', 'deleteProduct', 'addProductToAPI']),
        guardarProducto() {
            const result = this.addProductToAPI(this.producto);
            if (result) {
                console.log("Producto agregado exitosamente");
                this.clearForm();
            }
        },
        clearForm() {
            this.producto.name = "";
            this.producto.img = "";
            this.producto.desc = "";
            this.producto.price = 0;
            this.producto.stock = 0;
        },
    },
    computed: {
        ...mapState(['products']),
        ...mapGetters(['getProducts']),
    },
}
</script>

<style scoped>
    input {
        width: 70%;
    }
    textarea {
        width: 70%;
    }
    .btnGuardar {
        width: 50%;
    }
    .btnVolver {
        width: 20%;
        margin-left: 15px;
    }
    .container {
        margin-top: 45px;
    }
    .divBotones {
        text-align: center;
        margin-top: 10px;
    }
    .col-3 {
        text-align: right;
    }
    .col-9 {
        text-align: left;
    }
    div {
        margin-top: 1px;
    }
</style>