<template>
    <div id="app">
        <router-link to="/" class="btn btn-danger derecha" @click="logOff()" v-if="this.$route.path != '/' && this.$route.path != '/register'">Log off</router-link>
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: "App",
    }
    
</script>

<style scoped>
    .derecha{
        position: absolute;
        left: 0;
        top: 0;
    }
</style>