<template>
  <div class="favourites_item shadow-sm">
    <div class="favourites_item_img">
      <img src="../../assets/imgs/no-image.png" alt="no-image" />
    </div>
    <div class="favourites_item_name">
      <strong>Наименование:</strong> <span>Lorem, ipsum.</span>
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
</template>

<script>
import GButton from '../Forms/GButton.vue';

export default {
  components: {
    GButton,
  },
  name: 'FavouritesItemComplect',
  data() {
    return {
      inFavourite: false,
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
