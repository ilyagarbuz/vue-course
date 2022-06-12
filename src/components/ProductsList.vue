<template>
    <ul class="catalog__list">
      <ProductsItem v-for="(product, index) in products" :product="product" :key="index"/>
    </ul>
</template>

<script>
import ProductsItem from './ProductsItem.vue'

export default {
  props: ['products'],
  components: { ProductsItem }
}
</script>
