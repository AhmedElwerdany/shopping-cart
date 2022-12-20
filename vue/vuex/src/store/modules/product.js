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
}

const mutations = {
    setAllProducts (state, payload) {
        state.all = payload.items
    },
    // decrementProductInventory (state, payload) {
    //     console.log('HIIII')
    //     const cartItems = payload.products
    //     console.log(cartItems)
    //     state.all = state.all.map(product => {
    //         const {qty} = cartItems.find(cartItem => cartItem.id === product.id )
    //         console.log('qty', qty)
    //         console.log( {
    //             ...product,
    //             inventory: product.inventory - qty
    //         })
    //         return ({
    //             ...product,
    //             inventory: product.inventory - qty
    //         })
    //     })
    //     console.log('state.all', state.all)
    // }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}