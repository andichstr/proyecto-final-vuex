<template>
    <div>
        <div class="carrito" v-if="!desplegado" @click="desplegarCarrito()">
            {{ cantidadTotal }}
        </div>
        <div class="carritoDesplegado" v-else>
            <img src="https://i.imgur.com/JyKCGKd.png" alt="Cerrar" class="cerrar" @click="desplegarCarrito()">
            <h2>Tu carrito</h2>
            <div v-if="carrito.length != 0">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="tituloTabla col-2" scope="col">Cantidad</th>
                            <th class="tituloTabla col-4" scope="col">Descripción</th>
                            <th class="tituloTabla col-4" scope="col">Precio</th>
                            <th class="tituloTabla col-2" scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item) in carrito" :key="item.id">
                            <td class="col-2">{{ item.stock }}</td>
                            <td class="col-4">{{ item.name }}</td>
                            <td class="col-4">$ {{ item.price * item.stock }}</td>
                            <td class="col-2"><input type="button" class="btn btn-danger" value="Eliminar" @click="eliminarProductoCarrito(item)"></td>
                        </tr>
                    </tbody>
                </table>
                <h4>Total: $ {{ precioTotal }}</h4>
                <div class="finalizarCompraDiv">
                    <button class="finalizarCompraButton" @click="createOrder(precioTotal)">Finalizar Compra</button>
                </div>
            </div>
            <div v-else>
                <h4>Tu carrito esta vacío!</h4>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
    data() {
        return {
            desplegado: false,
        }
    },
    methods: {
        ...mapActions('products', ['getProductsFromAPI', 'updateStockProduct']),
        ...mapActions('cart', ['deleteCartProduct', 'createOrderToAPI', 'updateStockAPI', 'restartCart', 'setACart']),
        desplegarCarrito() {
            this.desplegado = !this.desplegado;
        },
        eliminarProductoCarrito(prod) {
            this.updateStockProduct(prod);
            this.deleteCartProduct(prod.id);
        },
        createOrder(precioTotal){
            let miCarrito = JSON.parse(JSON.stringify(this.carrito));
            console.log(miCarrito);
            this.createOrderToAPI(precioTotal);
            miCarrito.forEach(element => {
                this.updateStockAPI(element);
            });
            this.restartCart();
        }
    },
    computed: {
        ...mapState('cart', ['carrito']),
        ...mapState('products', ['products']),
        ...mapGetters('cart', ['getCarrito']),
        ...mapGetters('products', ['getProducts']),
        cantidadTotal() {
            let total = 0;
            this.carrito.forEach(element => {
                total += (parseInt(element.stock));
            });
            return total;
        },
        precioTotal() {
            let precioTotal = 0;
            this.carrito.forEach(element => {
                precioTotal = precioTotal + (element.price * element.stock);
            });
            return precioTotal;
        },
    },
    mounted() {
        let carro = JSON.parse(localStorage.getItem('cart'));
        if (carro != undefined) {
            this.setACart(carro)
            .then(() => {
                carro.forEach(element => {
                    console.log(element);
                    this.products.forEach(prod => {
                        console.log(prod);
                        if (element.id == prod.id) {
                            prod.stock -= element.stock;
                        }
                    })
                })
            })
        }
    }
}
</script>

<style scoped>

h2 {
    text-decoration: underline;
}

.carrito {
    position: fixed;
    top: 0;
    right: 0;
    padding-right: 6px;
    background-color: #008ea7d7;
    color: black;
    font-size: 1.2em;
    font-weight: bold;
    width: 40px;
    height: 40px;
    border-radius: 0 0 0 40px;
    text-align: right;
    z-index: 2;
}

.carrito:hover{
    cursor: pointer;
}

.carritoDesplegado {
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    z-index: 3;
    background-color: #008ea7d7;
    color: black;
    font-weight: bold;
    border-radius: 10px;
}

.finalizarCompraDiv {
    text-align: center;
}

.finalizarCompraButton {
    background-color: #01d9ffd7;
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
    font-size: 0.9em;
    padding: 5px 0;
    border: 1px solid rgba(0, 0, 0, 0.5);
    cursor: pointer;
}

.finalizarCompraButton:hover {
    background-color: #0aa19ad0;
}

.cerrar{
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
}

.cerrar:hover{
    cursor: pointer;
}

.productoCarrito{
    display: flex;
}

.restarButton{
    background-color: red;
    text-align: right;
    align-content: center;
    font-weight: bold;
}

.restarButton:hover{
    background-color: rgb(136, 0, 0);
}

</style>