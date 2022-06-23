<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}" >
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>

    <span class="catalog__price">
      {{product.price | numberFormat}} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in productColors" :key="product.title + color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color.id" v-model="selectedColor">
          <span class="colors__value" :style="{'background-color': color.color,}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import colors from '@/data/colors'
import gotoPage from '@/helpers/gotoPage'
import numberFormat from '@/helpers/numberFormat'

export default {
  props: ['product'],
  data: function () {
    return {
      selectedColor: this.product.colorId[0]
    }
  },
  filters: {
    numberFormat
  },
  computed: {
    productColors () {
      return colors.filter((color) => {
        if (this.product.colorId.indexOf(color.id) >= 0) return true
        return false
      })
    }
  },
  methods: {
    gotoPage
  }
}
</script>
