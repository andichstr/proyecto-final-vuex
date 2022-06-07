const axios = require('axios');
const apiURL = process.env.VUE_APP_API_URL;

export default {
    namespaced: true,
    state: {
        products: [],
        actualProduct: null,
    },
    getters: {
        getProducts(state) {
            return state.products
        },
        getActualProduct(state) {
            return state.actualProduct
        },
    },
    mutations: {
        setProducts(state, data) {
            state.products = data;
        },
        setActualProduct(state, data) {
            state.actualProduct = data;
        },
        setProduct(state, data){
            state.products[data.i] = data.product;
        },
        deleteProduct(state, i){
            state.products.splice(i,1)
        },
        addProduct(state, data) {
            state.products.push(data);
        }
    },
    actions: {
        async getProductsFromAPI({ commit }){
            let result = null;
            result = await axios.get(`${apiURL}/products`)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null){
                commit('setProducts', result);
            }
        },
        async addProductToAPI({ commit }, data) {
            let result = null;
            result = await axios.post(`${apiURL}/products`, data)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                commit('addProduct', data);
            }
        },
        async editProductToAPI({ commit, state }, product){
            let result = null;
            result = await axios.put(`${apiURL}/products/${product.id}`, product)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                for (let i = 0; i < state.products.length; i++) {
                    if (state.products[i].id == product.id) {
                        const data = {
                            'i': i,
                            'product': product 
                        };
                        commit('setProduct', data);
                    }
                }
            }
            
        },
        async deleteProduct({ commit }, id) {
            let result = null;
            result = await axios.delete(process.env.VUE_APP_API_URL + '/products/' + id)
            .then(response => {
                let result = response.data;
                return result;
            })
            .catch(error => {
                console.error(error);
            });
            if (result != null) {
                commit('deleteProduct', id);
            }
        },
        setActualProduct({ commit }, data) {
            commit('setActualProduct', data);
        }
    }
}