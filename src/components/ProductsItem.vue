<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{product.title}}
      </a>
    </h3>

    <span class="catalog__price">
      {{product.price}} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in productColors" :key="product.title + color">
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

export default {
  props: ['product'],
  data: function () {
    return {
      selectedColor: this.product.colorId[0]
    }
  },
  computed: {
    productColors () {
      return colors.filter((color) => {
        if (this.product.colorId.indexOf(color.id) >= 0) return true
        return false
      })
    }
  }
}
</script>
