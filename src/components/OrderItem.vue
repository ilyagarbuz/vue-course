<template>
  <li class="cart__order">
    <h3>{{product.product.title}}</h3>
    <b>{{product.product.price * product.amount | numberFormat}} ₽</b>
    <span>Артикул: {{product.productId}}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  props: ['product'],
  filters: {
    numberFormat
  }
}
</script>
