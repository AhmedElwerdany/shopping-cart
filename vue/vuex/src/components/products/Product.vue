<template>
  <h2>{{ product.title }}</h2>
  <div>
    price: {{ product.price }}<br />
    inventory: {{ qty }}
  </div>
  <button
    class="buy"
    :disabled="qty === 0"
    @click="decreamentQty"
  >
    Buy
  </button>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions("cart", ["addProductToCart"]),
    decreamentQty: function () {
        if (this.qty > 0) {
            this.qty = --this.qty
            this.addProductToCart(this.$props.product)
        }
    }
  },
  props: {
    product: {
      type: Object,
    },
  },
  data: (vm) => ({
    qty: vm.product.inventory
  })
};
</script>