<template>
    <ul class="catalog__list">
      <ProductsItem v-for="product in products" :product="product" :key="product.id"/>
    </ul>
</template>

<script>
import ProductsItem from './ProductsItem.vue'

export default {
  props: ['products'],
  components: { ProductsItem }
}
</script>
