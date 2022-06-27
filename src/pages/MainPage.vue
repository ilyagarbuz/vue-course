<template>
    <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">

      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
      />

      <section class="catalog">

        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров <button @click="loadProducts">Попробоавть ещё раз</button></div>

        <ProductsList :products="products"/>

        <BasePagination :page.sync="page" :count="countProducts" :per-page="productsPerPage" />

      </section>
    </div>
  </main>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue'
import BasePagination from '@/components/BasePagination.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import axios from 'axios'
import { API_BASE_URL } from '@/config'

export default {
  components: { ProductsList, BasePagination, ProductFilter },
  data () {
    return {
      page: 1,
      productsPerPage: 3,
      productsData: null,

      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      productsLoading: false,
      productsLoadingFailed: false
    }
  },
  computed: {
    products () {
      return this.productsData
        ? this.productsData.items.map(product => {
          return {
            ...product,
            image: product.image.file.url
          }
        })
        : []
    },
    countProducts () {
      return this.productsData ? this.productsData.pagination.total : 0
    }
  },
  methods: {
    loadProducts () {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadTimer)
      this.loadTimer = setTimeout(() => {
        axios.get(API_BASE_URL + '/api/products', {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            categoryId: this.filterCategoryId,
            colorId: this.filterColorId
          }
        })
          .then(res => { this.productsData = res.data })
          .catch(() => { this.productsLoadingFailed = true })
          .then(() => { this.productsLoading = false })
      }, 0)
    }
  },
  watch: {
    page () {
      this.loadProducts()
    },
    filterCategoryId () {
      this.loadProducts()
    },
    filterPriceFrom () {
      this.loadProducts()
    },
    filterPriceTo () {
      this.loadProducts()
    },
    filterColorId () {
      this.loadProducts()
    }
  },
  created () {
    this.loadProducts()
  }
}
</script>
