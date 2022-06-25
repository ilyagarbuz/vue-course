<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="product.product.image" width="120" height="120" srcset="img/phone-square-3@2x.jpg 2x" :alt="product.product.title">
    </div>
    <h3 class="product__title">
      {{product.product.title}}
    </h3>
    <span class="product__code">
      Артикул: {{product.product.id}}
    </span>

      <CartCounter :product-amount.sync="amount"/>

    <b class="product__price">
      {{product.amount * product.product.price | numberFormat}} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(product.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import { mapMutations } from 'vuex'
import { plusAmount, minusAmount } from '@/helpers/productCounter'
import CartCounter from './CartCounter.vue'

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
        this.$store.commit(
          'updateCartProductAmount',
          { productId: this.product.productId, amount: value }
        )
      }
    }
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteProduct' }),
    plusAmount,
    minusAmount
  }
}
</script>
