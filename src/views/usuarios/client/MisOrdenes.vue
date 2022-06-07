<template>
    <div class="container">
        <h1>Mis Ordenes</h1>
        <table class="table">
            <thead>
                <th>N° Orden</th>
                <th>Productos</th>
                <th>Fecha</th>
                <th>Total</th>
            </thead>
            <tbody>
                <tr v-for="item in ordenes" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>
                        <p v-for="prod in item.products" :key="prod.id"><img :src="prod.img" :alt="prod.name" class="imgProd"/> {{ prod.stock }} {{ prod.name }}</p>
                    </td>
                    <td>{{ item.datetime }}</td>
                    <td>{{ item.total }}</td>
                </tr>
            </tbody>
        </table>
        <router-link to="/index" class="btn btn-danger">Volver</router-link>
    </div>
</template>

<script>

export default {
    name: 'MisOrdenes',
}
</script>

<style scoped>
    .container {
        margin-top: 50px;
        text-align: center;
    }
    .imgProd {
        height: 40px;
        width: 40px;
    }
</style>