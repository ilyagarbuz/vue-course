<template>
  <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар" @click="amount = minusAmount(amount)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="amount">

    <button type="button" aria-label="Добавить один товар" @click="amount = plusAmount(amount)">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { plusAmount, minusAmount } from '@/helpers/productCounter'
export default {
  props: ['productAmount'],
  methods: {
    plusAmount,
    minusAmount
  },
  computed: {
    amount: {
      get () {
        return this.productAmount
      },

      set (value) {
        this.$emit('update:product-amount', value)
      }
    }
  }
}
</script>
