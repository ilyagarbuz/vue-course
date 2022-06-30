<template>
  <BaseLoader v-if="loading"/>
  <router-link v-else class="header__cart" :to="{name: 'cart',}" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{$store.state.cartProducts.length}}</span>
  </router-link>
</template>

<script>
import BaseLoader from '@/ui/BaseLoader.vue'
export default {
  props: ['loading'],
  components: { BaseLoader }
}
</script>
