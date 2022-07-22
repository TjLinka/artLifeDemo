<template>
  <div class="product_card shadow-sm">
    <div class="product_card_img">
      <img src="../../assets/imgs/no-image.png" alt=""  @click="$router.push('/product/1')"/>
    </div>
    <div class="product_card_name" @click="$router.push('/product/1')">Lorem, ipsum dolor.</div>
    <div class="product_card_price">1000 руб.</div>
    <div class="product_card_points">Баллов: 15</div>
    <div class="product_card_discription">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi reiciendis ipsum quis
      quibusdam repudiandae repellat.
    </div>
    <div class="product_card_btns">
      <div class="product_card_add_to_favourites">
        <img
          :src="`../icons/favourites${inFavourite ? '' : '_no_added'}.svg`"
          alt=""
          @click="inFavourite = !inFavourite"
        />
      </div>
      <g-button :primary="true" :right="true" :width="'30%'">В коризну</g-button>
    </div>
  </div>
</template>

<script>
import GButton from '../Forms/GButton.vue';

export default {
  components: {
    GButton,
  },
  data() {
    return {
      inFavourite: false,
    };
  },
  name: 'ProductCard',
};
</script>

<style lang="scss" scoped>
.product_card {
  width: calc((100% - 36px) / 4);
  // border: 1px solid black;
  padding: 15px;
  background: white;
  &_btns {
    display: flex;
    align-items: center;
    margin-top: 10px;
    justify-content: space-between;
  }
  &_img {
    display: flex;
    align-items: center;
    justify-content: center;
    & img {
      width: 70%;
      height: 100%;
      cursor: pointer;
    }
  }
  &_name {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    color: var(--main-green);
  }
  &_add_to_cart {
    margin-top: 10px;
  }
  &_add_to_favourites {
    width: 30px;
    height: 30px;
    margin-right: 30px;
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
