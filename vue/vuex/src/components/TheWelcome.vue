<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'products',
  computed: mapState({
    products: state => state.products.all,
  }),
  methods: {
    ...mapActions('cart', [
      'addProductToCart'
    ])
  },
  created () {
    this.$store.dispatch('products/getAllProducts')
  }
}
</script>

<template>
  <div v-for="product in products" :key="product.id">
    <h2>{{product.title}}</h2>
    <div>
      price: {{product.price}}<br />
      inventory: {{product.inventory}}
    </div>
    <button @click="addProductToCart(product)">buy</button>
  </div>
</template>
