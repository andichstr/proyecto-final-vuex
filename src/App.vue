<template>
    <div id="app">
        <div class="divLogOff">
            <router-link to="/" @click="logOff()" v-if="this.$route.path != '/' && this.$route.path != '/register'">
            <button class="logOff">
                <span>Log Off</span>
            </button>
            </router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: "App",
    }
    
</script>

<style scoped>

    .divLogOff {
    position: relative;
    overflow: hidden;
    justify-content: center;
    vertical-align: center;
    }
    .logOff span{
    font-weight: bold;
    z-index: 2;
}
    .logOff {
    height: 40px;
    width: 80px;
    border: none;
    color: #000;
    background: #b80303;
    transition: .3s ease-in-out all;
    font-weight: bold;
    z-index: 2;
    }
    .logOff::after {
        content: "";
        width: 1px;
        height: 1px;
        background: none;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        transition: .3s ease-in-out all;
        border-radius: 4000px;
        transform-origin: center;
    }


    .logOff:hover {
        background-color: rgb(20, 20, 20);
        color: #FFF;
    }
</style>