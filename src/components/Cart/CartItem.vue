<template>
  <div class="cart_item_wrapper">
    <div class="cart_item">
      <div class="cart_item_img">
        <img src="../../assets/imgs/no-image.png" alt="" />
      </div>
      <div class="cart_item_articul">Артикул: <span>12345</span></div>
      <div class="cart_item_name">
        <router-link :to="`product/${prod.id}`" target="_blank">
          {{ prod.name }}
        </router-link>
      </div>
      <div class="cart_item_price">
        {{ prod.price }} руб.
      </div>
      <div class="cart_item_points">
        Баллов: {{ prod.points }}
      </div>
      <g-count :count="prod.count" :id="prod.id"/>
      <div class="cart_item_total_prods_price">
        {{ prod.price }} руб.
      </div>
      <!-- <div class="cart_item_total_points">
        {{ prod.totalPoints}}
      </div> -->
      <div class="cart_item_add_to_favourites">
        <img
          :src="`../icons/favourites${inFavourite ? '' : '_no_added'}.svg`"
          alt=""
          @click="inFavourite = !inFavourite"
        />
      </div>
      <div class="cart_item_delete">
        <img src="../../assets/imgs/remove.png" alt="" @click="removeFromCart(prod.id)"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import GCount from '../Forms/GCount.vue';

export default {
  components: { GCount },
  name: 'CartItem',
  props: ['prod'],
  comments: {
    GCount,
  },
  data() {
    return {
      isComplect: true,
      isComplectOpen: false,
      inFavourite: false,
    };
  },
  mounted() {
  },
  methods: {
    ...mapActions('cart', ['removeFromCart']),
  },
};
</script>

<style lang="scss" scoped>
.cart_item {
  // display: flex;
  display: grid;
  grid-template-columns: repeat(7, 1fr) 50px 50px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 20px;
  background: white;
  border-radius: 7px;
  &_wrapper {
    margin-bottom: 20px;
  }
  &_img {
    width: 115px;
    height: 100px;
    & img {
      width: 100%;
      height: 100%;
    }
  }
  &_add_to_favourites {
    width: 30px;
    height: 30px;
    & img {
      height: 100%;
      width: 100%;
      cursor: pointer;
      &:active {
        transform: scale(0.85);
      }
    }
  }
  &_delete {
    width: 25px;
    height: 25px;
    & img {
      width: 100%;
      height: 100%;
      cursor: pointer;
      &:active {
        transform: scale(0.85);
      }
    }
  }
  &.deleted {
    &::after {
      content: '';
      width: 93%;
      height: 2px;
      background-color: lightgray;
      position: absolute;
    }
  }
}
.cart_item_complect {
  display: none;
}
</style>
