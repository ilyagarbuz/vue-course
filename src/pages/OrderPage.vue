<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText :title="'ФИО'" v-model="formData.name" :error="formError.name" :placeholder="'Введите ваше полное имя'"/>

            <BaseFormText :title="'Адрес доставки'" v-model="formData.address" :error="formError.address" :placeholder="'Введите ваш адрес'"/>

            <BaseFormText :title="'Телефон'" v-model="formData.phone" :error="formError.phone" :placeholder="'Введите ваш телефон'" :type="'tel'"/>

            <BaseFormText :title="'Email'" v-model="formData.email" :error="formError.email" :placeholder="'Введи ваш Email'" :type="'email'"/>

            <BaseFormTexterea :title="'Комментарий к заказу'" v-model="formData.comment" :error="formError.comments" :placeholder="'Ваши пожелания'" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem v-for="product in products" :product="product" :key="product.productId"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{products.length}}</b> товара на сумму <b>{{totalPrice | numberFormat}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit" :disabled="orderAdding" style="display: flex; align-items: center; justify-content: center;">
            <BaseLoader v-if="orderAdding"/>
            <span v-else>Оформить заказ</span>
          </button>
        </div>
        <div v-show="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{formErrorMessage}}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import numberFormat from '@/helpers/numberFormat'
import BaseFormText from '@/components/BaseFormText.vue'
import BaseFormTexterea from '@/components/BaseFormTexterea.vue'
import OrderItem from '@/components/OrderItem.vue'
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import BaseLoader from '../ui/BaseLoader.vue'
export default {
  data () {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      orderAdding: false
    }
  },
  filters: {
    numberFormat
  },
  components: { BaseFormText, BaseFormTexterea, OrderItem, BaseLoader },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' })
  },
  methods: {
    order () {
      this.formError = {}
      this.formMessage = ''
      this.orderAdding = true

      axios.post(API_BASE_URL + '/api/orders',
        { ...this.formData },
        {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
        .then((res) => {
          this.$store.commit('resetCart')
          this.$store.commit('updateOrderInfo', res.data)
          this.$router.push({ name: 'orderInfo', params: { id: res.data.id } })
        })
        .catch(res => {
          this.formError = res.response.data.error.request || {}
          this.formErrorMessage = res.response.data.error.message
        })
        .finally(() => { this.orderAdding = false })
    }
  }
}
</script>
