import { notify } from '@kyvg/vue3-notification';

import { buyProducts } from '../../api/shop';

const state = () => ({
  items: [],
  checkoutStatus: null,
});

const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, qty }) => {
      const product = rootState.products.all.find(
        (product) => product.id === id
      );
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        qty,
      };
    });
  },
  cartTotalPrice: (state, getters, rootState) => {
    return getters.cartProducts.reduce((p, c) => {
      return c.price * c.qty + p;
    }, 0);
  },
  // getCheckoutStatus:  (state, getters, rootState) => {
  //     if (state.checkoutStatus?.status === null) {
  //         return null
  //     }else if (state.checkoutStatus.status === true) {
  //         return 'checkout done 💚'
  //     }else {
  //         return 'checkout faild 🔴'
  //     }
  // }
};

const actions = {
  async checkout({ commit, state, dispatch}, products) {
    const savedCartItems = [...state.items];
    commit("setCheckoutStatus", { status: null });
    commit("setCartItems", { items: [] });

    try {
      await buyProducts(products);
      commit("setCheckoutStatus", { status: true });
      dispatch('products/decrementProductInventoryAction', {products}, {root: true})
      notify({
        group: "main",
        title: "checkout",
        text: "your order was confirmed",
      });
      // commit('products/decrementProductInventory', {products}, {root: true})
    } catch (err) {
        console.log({err})
      notify({
        group: "main",
        title: "checkout",
        text: "something happened, please try again later",
        type: "error",
      });
      commit("setCheckoutStatus", { status: false });
      commit("setCartItems", { items: savedCartItems });
    }
  },
  addProductToCart({ state, commit }, product) {
    commit("setCheckoutStatus", { status: null });
    notify({
      group: "main",
      title: product.title,
      text: "product added successfully",
    });
    if (product.inventory > 0) {
      const cartItem = state.items.find((items) => items.id === product.id);
      if (cartItem) {
        commit("incrementItemQuantity", cartItem);
      } else {
        commit("pushProductToCart", product);
      }
    }
  },
};

const mutations = {
  setCheckoutStatus(state, payload) {
    state.checkoutStatus = payload.status;
  },
  setCartItems(state, payload) {
    state.items = payload.items;
  },
  incrementItemQuantity(state, payload) {
    const cartItem = state.items.find((item) => item.id === payload.id);
    cartItem.qty++;
  },
  pushProductToCart(state, payload) {
    state.items.push({ id: payload.id, qty: 1 });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
