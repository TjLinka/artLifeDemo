<template>
  <div class="container">
    <!-- <h1>Корзина</h1> -->
    <div class="cart_wrapper">
      <!-- КОРЗИНА -->
      <div class="cart">
        <cart-item :id="1"/>
        <cart-item :id="2"/>
        <cart-item :id="3"/>
        <cart-item :id="4"/>
        <cart-item :id="5"/>
        <cart-item :id="6"/>
        <cart-item :id="7"/>
      </div>
      <div class="cart_info_wrapper">
        <div class="cart_info shadow-sm">
          <h4 class="text-center">Корзина</h4>
          <hr />
          <div class="cart_info_total_price">
            <strong>Стоимость товаров: </strong> <span>10000 руб.</span>
          </div>
          <div class="cart_info_prod_count">
            <strong>Всего единиц товара: </strong> <span>10</span>
          </div>
          <div class="cart_info_total_points"><strong>Сумма баллов: </strong> <span>100</span></div>
          <div class="cart_info_total_goods">
            <strong>Всего наименований: </strong> <span>6</span>
          </div>
          <hr />
          <g-button>Сохранить список</g-button>
          <g-button :danger="true">Очистить корзину</g-button>
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
    <div class="row">
      <div class="col">
      </div>
    </div>
    <div class="row mt-5">
      <div class="col"></div>
      <div class="col">
        <g-grouped-button> </g-grouped-button>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/Cart/CartItem.vue';
import GButton from '../components/Forms/GButton.vue';
import GGroupedButton from '../components/Forms/GGroupedButton.vue';
import GInput from '../components/Forms/GInput.vue';

export default {
  components: {
    CartItem,
    GInput,
    GGroupedButton,
    GButton,
  },
  name: 'Cart',
  data() {
    return {
      comm: '',
    };
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
    flex-grow: 1;
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
</style>
