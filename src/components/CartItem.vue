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

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click="amount = minusAmount(amount)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" disabled v-model.number="amount">

      <button type="button" aria-label="Добавить один товар" @click="amount = plusAmount(amount)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

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

export default {
  filters: { numberFormat },
  props: ['product'],
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
