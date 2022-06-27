<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="product.product.image" width="120" height="120" :alt="product.product.title">
    </div>
    <h3 class="product__title">
      {{product.product.title}}
    </h3>
    <span class="product__code">
      Артикул: {{product.product.id}}
    </span>

    <CartCounter :product-amount.sync="amount" />

    <b class="product__price">
      {{product.amount * product.product.price | numberFormat}} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(product.product.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import { mapActions } from 'vuex'
import { plusAmount, minusAmount } from '@/helpers/productCounter'
import CartCounter from '@/components/CartCounter.vue'

export default {
  filters: { numberFormat },
  props: ['product'],
  components: {
    CartCounter
  },
  computed: {
    amount: {
      get () {
        return this.product.amount
      },

      set (value) {
        this.$store.dispatch(
          'updateCartProductAmount',
          { productId: this.product.productId, amount: value }
        )
      }
    }
  },
  methods: {
    ...mapActions({ deleteProduct: 'deleteProduct' }),
    plusAmount,
    minusAmount
  }
}
</script>
