const axios = require('axios');
const apiURL = process.env.VUE_APP_API_URL;

export default {
    namespaced: true,
    state: {
        carrito: [],
    },
    getters: {
        getCarrito(state) {
            return state.carrito
        },
    },
    mutations: {
        setCart(state, data) {
            state.carrito = data;
            localStorage.setItem('cart', JSON.stringify(state.carrito));
        },
        addProductToCart(state, data) {
            state.carrito.push(data);
            localStorage.setItem('cart', JSON.stringify(state.carrito));
        },
        deleteCartProduct(state, i) {
            state.carrito.splice(i,1);
            localStorage.setItem('cart', JSON.stringify(state.carrito));
        },
        addAmmount(state, data) {
            state.carrito[data.i].stock += data.ammount;
            localStorage.setItem('cart', JSON.stringify(state.carrito));
        }
    },
    actions: {
        setACart( { commit }, cart ) {
            commit('setCart', cart);
        },
        addProductToCart({ commit }, product) {
            commit('addProductToCart', product);
        },
        deleteCartProduct( { commit, state }, id ) {
            for (i = 0; i > state.carrito.length; i++) {
                if (state.carrito[i].id == id) {
                    commit('deleteCartProduct', i);
                };
            };
        },
        addAmmount( { commit, state }, data ) {
            for (i = 0; i > state.carrito.length; i++) {
                if (state.carrito[i].id == data.id) {
                    commit('addAmmount', { 'i': i, 'ammount': data.ammount });
                };
            };
        },
        async createOrderToAPI(data) {
            await axios.push(`${apiURL}/orders`, data)
            .then(response => {
                return response;
            })
            .catch(error => {
                console.error(error);
            })
        },
        async updateStockAPI(data) {
            await axios.get(`${apiURL}/products/` + data.id)
            .then (response => {
                let product = response.data;
                product.stock -= data.stock;
                axios.put(`${apiURL}/products/` + product.id, product)
                .then(resp => {
                    return resp;
                })
                .catch(err => {
                    console.error(err);
                })
            })
            .catch(error => {
                console.error(error);
            })
        },
        restartCart({ commit }) {
            commit('setCart', []);
        }
    }
}