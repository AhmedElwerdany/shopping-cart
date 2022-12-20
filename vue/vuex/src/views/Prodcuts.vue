<script>
import {mapState} from 'vuex'
import Product from '../components/products/Product.vue'
export default {
  name: 'products',
  computed: mapState({
    products: state => state.products.all,
  }),
  created () {
    this.$store.dispatch('products/getAllProducts')
  },
  components: {
    Product
  }
}
</script>

<template>
<div class="products">
  <div v-for="product in products" :key="product.id" class="product">
    <Product :product="product" />
  </div>
  </div>
</template>

<style>
  .products { 
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
  }
  .product {
    color: #fff;
    padding: 1.75rem;
    background: #000;
    border: 1px solid #244a2d;
    border-radius: 10px;
  }
  .buy {
    padding: 0.75rem 2rem;
    display: inline-block;
    font-size: 1rem;
    background: #156703;
    border-radius: 0.5rem;
    color: #fff;
    margin-top: 2rem;
    float: right;
    font-weight: bold;
    cursor: pointer;
    transition: 0.5s all;
  }
  .buy:hover {
    background: #157810;
  }
  .buy:disabled {
  cursor: not-allowed;
  background: #928f8f;
  border: 1px solid #928f8f;
}
</style>