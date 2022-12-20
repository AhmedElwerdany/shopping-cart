<template>
  <div class="about">
    
    <ul>
      <li class="cart-item" v-for="cartItem in cartProducts" :key="cartItem.id">
        <h2>{{cartItem.title}}</h2>
        <p>Quantity :  {{cartItem.qty}} </p> 
        </li>
    </ul>
    
    <div
    class="empty-cart-title"
     v-show="cartProducts.length === 0"
    >
      Your Cart is Empty
    </div>
    <div class="total" v-show="cartProducts.length > 0">
      total price : {{cartTotalPrice}}$
    </div>
    
    <button v-show="cartProducts.length > 0" @click="checkout(cartProducts)" class="checkout-btn" :disabled="cartProducts.length === 0">Checkout</button>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'cart',
  computed : {
    ...mapGetters('cart', ['cartProducts', 'cartTotalPrice'])
  },
  methods: {
    ...mapActions('cart', ['checkout'])
  }
}
</script>
<style>
ul {
  list-style-type: none;
  padding:0;
}
.cart-item {
  display: flex;
  border-bottom: 1px solid #889;  
  padding:1rem 0;
  justify-content: space-between;
  align-items: center;
}

.cart-item:last-child {
  border-bottom: none;  
}
.cart-item p {
  color: #fff;
  font-style: italic;
  font-weight: bold;
}
.total,.empty-cart-title {
  text-align: center;
  color: #fff;
  text-transform: capitalize;
  font-size: 2.5rem;
  margin-top: 2rem;
}

.checkout-btn {
  padding:1.25rem 2.50rem;
  font-size: 1.5rem;
  border: 1px solid green;
  margin: 1rem auto;
  display: block;
  cursor: pointer;
  background: green;
  color: #fff;
  transition: 0.3s all;
}
.checkout-btn:hover {
  background: transparent;
}
.checkout-btn:disabled {
  cursor: not-allowed;
  background: #928f8f;
  border: 1px solid #928f8f;
}
</style>
