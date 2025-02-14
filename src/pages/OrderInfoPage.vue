<template>
  <BaseLoader v-if="orderInfoLoading"/>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{name: 'cart'}" class="breadcrumbs__link">
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
        Заказ оформлен <span>№ {{orderInfo.id}}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{orderInfo.name}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{orderInfo.address}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{orderInfo.phone}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{orderInfo.email}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem v-for="product in orderBasket" :product="product" :key="product.id"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>{{orderInfo.totalPrice | numberFormat}} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import numberFormat from '@/helpers/numberFormat'
import OrderItem from '@/components/OrderItem.vue'
import BaseLoader from '@/ui/BaseLoader.vue'

export default {
  data () {
    return {
      orderInfoLoading: false
    }
  },
  filters: {
    numberFormat
  },
  components: { OrderItem, BaseLoader },
  computed: {
    ...mapGetters({ orderInfo: 'orderInfoDetails' }),
    orderBasket () {
      return this.orderInfo.basket.items.map(item => {
        return {
          ...item,
          amount: item.quantity,
          productId: item.product.id
        }
      })
    }
  },
  watch: {
    '$route.params.id': {
      handler () {
        if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) return

        this.orderInfoLoading = true
        this.$store.dispatch('loadOrderInfo', this.$route.params.id)
          .catch(() => { this.$router.push({ name: 'notFound' }) })
          .finally(() => { this.orderInfoLoading = false })
      },
      immediate: true
    }
  }
}
</script>
