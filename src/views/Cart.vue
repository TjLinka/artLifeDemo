<template>
  <div class="container">
    <!-- <h1>Корзина</h1> -->
    <div class="cart_wrapper" v-if="cart.length">
      <!-- КОРЗИНА -->
      <div class="cart">
        <cart-item v-for="prod in cart" :key="prod.id" :prod="prod" />
      </div>
      <div class="cart_info_wrapper">
        <div class="cart_info shadow-sm">
          <h4 class="text-center">Корзина</h4>
          <hr />
          <div class="cart_info_total_price">
            <strong>Стоимость товаров: </strong> <span>{{ cartProdSum }} руб.</span>
          </div>
          <div class="cart_info_prod_count">
            <strong>Всего единиц товара: </strong> <span>{{ cartProdAllCount }}</span>
          </div>
          <div class="cart_info_total_points">
            <strong>Сумма баллов: </strong> <span>{{ cartProdPoints }}</span>
          </div>
          <div class="cart_info_total_goods">
            <strong>Всего наименований: </strong> <span>{{ cartProdCount }}</span>
          </div>
          <hr />
          <g-button @click="saveProdInFavor">Сохранить товары в Избранных</g-button>
          <g-button :danger="true" @click="clearCart">Очистить корзину</g-button>
        </div>
        <div class="pay_block shadow-sm">
          <h4 class="text-center">Оплата</h4>
          <hr />
          <div class="mb-3">
            <g-input :id="'comm'" :placeholder="'Комментарий'" :type="'text'" v-model="comm" />
          </div>
          <div class="mb-3">
            <g-button :primary="true">Оплатить с персонального счёта</g-button>
          </div>
          <div>
            <g-button :primary="true">Зарезервировать без оплаты</g-button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty_cart">
      <h2>Корзина пуста</h2>
      <GButton :primary="true" style="width: 50%;" @click="$router.push('/shop')">Перейти в Магазин</GButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import GApi from '../assets/backApi';
import CartItem from '../components/Cart/CartItem.vue';
import GButton from '../components/Forms/GButton.vue';
import GInput from '../components/Forms/GInput.vue';

export default {
  components: {
    CartItem,
    GInput,
    GButton,
  },
  name: 'Cart',
  data() {
    return {
      comm: '',
    };
  },
  methods: {
    ...mapActions('cart', ['clearCart']),
    async saveProdInFavor() {
      await Promise.all(this.cart.map((prod) => GApi.post('/api/Favourites/add', { item_id: prod.id })));
    },
  },
  computed: {
    ...mapState('cart', ['cart']),
    ...mapGetters('cart', ['cartProdCount', 'cartProdSum', 'cartProdAllCount', 'cartProdPoints']),
  },
};
</script>

<style lang="scss" scoped>
.cart_wrapper {
  display: flex;
  width: 100%;
  gap: 40px;
  .cart {
    flex-grow: 4;
  }
  .cart_info_wrapper {
    min-width: 450px;
    flex-grow: 2;
    align-self: start;
    .cart_info {
      padding: 20px;
      background: white;
      & > div:not(:last-of-type) {
        margin-bottom: 20px;
      }
    }
  }
  .pay_block {
    margin-top: 20px;
    padding: 20px;
    background: white;
  }
}
.cart {
  max-height: 800px;
  overflow-y: scroll;
  padding-right: 15px;
  margin-bottom: 20px;
}
.empty_cart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
