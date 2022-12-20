import { getProducts } from '../../api/shop';

const state = () => ({
    all: []
})

const getters = {}

const actions = {
    getAllProducts: async ({state, commit}) => {
         const data = await getProducts()
         commit('setAllProducts', {items: data})
    },
    decrementProductInventoryAction: ({state, commit}, payload) => {
        const {products} = payload
        commit('decrementProductInventory', {products})
    }
}

const mutations = {
    setAllProducts (state, payload) {
        state.all = payload.items
    },
    decrementProductInventory (state, payload) {
        const cartItems = payload.products
        state.all = state.all.map(product => {
            const cartItem = cartItems.find(cartItem => cartItem.id === product.id)
            if(cartItem) {
                return ({
                    ...product,
                    inventory: product.inventory - cartItem.qty
                })
            }else {
                return product
            }
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}