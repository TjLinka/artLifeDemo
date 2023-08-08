<template>
  <div class="favourites_item_wrapper shadow-sm">
    <div class="favourites_item">
      <div class="favourites_item_img">
        <img src="../../assets/imgs/no-image.png" alt="no-image" />
      </div>
      <div class="favourites_item_name">
        <strong>Наименование:</strong> <router-link target="_blank" :to="`/product/${prod.id}`"><span> {{ prod.name}} </span></router-link>
      </div>
      <div class="favourites_item_price"><strong>Цена:</strong> <span>{{prod.price}} руб.</span></div>
      <div class="favourites_item_points"><strong>Баллов:</strong> <span>{{prod.points}}</span></div>
      <div class="favourites_item_add_to_cart_btn">
        <g-button :primary="true" @click="addToCart(prod)">В корзину</g-button>
      </div>
      <div class="favourites_item_delete_btn" @click="removeFromFavor(prod.id)">
        <img src="../../assets/imgs/remove.png" alt="" />
      </div>
    </div>
    <transition name="slide" mode="out-in">
      <div class="favourites_item_complect" v-if="isComplectOpen">
        <favourites-item-complect />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import GButton from '../Forms/GButton.vue';
import FavouritesItemComplect from './FavouritesItemComplect.vue';

export default {
  components: {
    GButton,
    FavouritesItemComplect,
  },
  name: 'FavouritesItem',
  props: ['prod'],
  data() {
    return {
      inFavourite: false,
      isComplectOpen: false,
    };
  },
  mounted() {},
  methods: {
    ...mapActions('cart', ['addToCart']),
    removeFromFavor(id) {
      this.$emit('delete', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.favourites_item_wrapper {
  margin-bottom: 20px;
}
.favourites_item {
  padding: 15px;
  display: grid;
  grid-template-columns: 120px repeat(3, 1fr ) 200px 50px;
  grid-gap: 20px;
  align-items: center;
  justify-content: space-between;
  // margin-bottom: 20px;
  border-radius: 5px;
  background: white;
  &_img {
    width: 115px;
    height: 100px;
    & img {
      width: 100%;
      height: 100%;
    }
  }
  &_delete_btn {
    width: 25px;
    height: 25px;
    & img {
      width: 100%;
      height: 100%;
      cursor: pointer;
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
}
.favourites_item_complect {
  height: 100%;
}
</style>
