<template>
  <div class="favourites_item_wrapper shadow-sm" :data-id="id">
    <div class="favourites_item">
      <div class="favourites_item_img">
        <img src="../../assets/imgs/no-image.png" alt="no-image" />
      </div>
      <div class="favourites_item_name">
        <strong>Наименование:</strong> <span>Lorem, ipsum.</span><br />
        <span class="show_complect" @click="isComplectOpen = !isComplectOpen">Просмотреть</span>
      </div>
      <div class="favourites_item_price"><strong>Цена:</strong> <span>1000 руб.</span></div>
      <div class="favourites_item_points"><strong>Баллов:</strong> <span>15.4</span></div>
      <div class="favourites_item_add_to_cart_btn">
        <g-button :primary="true">В корзину</g-button>
      </div>
      <div class="favourites_item_delete_btn">
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
// import $ from 'jquery';
import GButton from '../Forms/GButton.vue';
import FavouritesItemComplect from './FavouritesItemComplect.vue';

export default {
  components: {
    GButton,
    FavouritesItemComplect,
  },
  name: 'FavouritesItem',
  props: ['id'],
  data() {
    return {
      inFavourite: false,
      isComplectOpen: false,
    };
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.favourites_item_wrapper {
  margin-bottom: 20px;
}
.favourites_item {
  padding: 15px;
  display: flex;
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
