<template>
  <div class="container product_page">
    <div class="row">
      <div class="col">
        <h4 class="product_name mt-3">Lorem, ipsum dolor.</h4>
      </div>
    </div>
    <div class="top_section">
      <div class="product_gallery col-4">
        <img src="../assets/imgs/no-image.png" alt="" />
      </div>
      <div class="product_info col-6">
        <div class="product_info_articul"><strong>Артикул:</strong><span>12345</span></div>
        <div class="product_info_short_discription">
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita, saepe dolorum omnis eligendi soluta ipsum.
        </div>
        <div class="product_info_price"><strong>Цена:</strong> <span>10000 руб.</span></div>
        <div class="product_info_points"><strong>Баллов:</strong> <span>20</span></div>
        <div class="product_info_in_stock">
          <strong>В наличии:</strong> <img src="../assets/imgs/check_icon.svg" alt="" />
        </div>
        <div class="product_info_add_to_cart">
          <g-button v-if="!inCart" :primary="true" :width="'20%'" @click="inCart = !inCart">В корзину</g-button>
          <counter v-if="inCart"/>
        </div>
        <div class="product_info_add_to_favourites">
          <img
            :src="`../icons/favourites${inFavourite ? '' : '_no_added'}.svg`"
            alt=""
            @click="inFavourite = !inFavourite"
          />
        </div>
      </div>
    </div>
    <hr class="mt-5 mb-5">
    <div class="discription">
      <h4>Описание</h4>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod neque aperiam saepe? Ab qui
        voluptas aliquam hic voluptate incidunt vitae, facilis reprehenderit dicta eaque,
        accusantium tempora amet! Laudantium, ducimus unde veritatis beatae assumenda molestias ad
        natus tempore harum accusantium eaque fugiat sapiente delectus, maiores corrupti odio iusto.
        Vitae laboriosam illo hic eligendi? Esse consequuntur magnam amet qui. Expedita non maiores
        possimus tempore perferendis nostrum nam adipisci, eaque doloribus eligendi consequatur! Rem
        esse quod tempora! Modi et praesentium ut! Error delectus reprehenderit impedit beatae. Illo
        alias ex facere? Ad nulla optio temporibus doloremque tenetur, expedita ea odit amet atque
        dolore laborum.
      </p>
    </div>
  </div>
</template>

<script>
import GButton from '../components/Forms/GButton.vue';
import Counter from '../components/Shop/Counter.vue';

export default {
  components: {
    Counter,
    GButton,
  },
  name: 'ProductPage',
  data() {
    return {
      inFavourite: false,
      inCart: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.product_name {
}
.top_section {
  display: flex;
  margin-top: 30px;
}
.product_info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > div {
    margin-bottom: 20px;
  }
}
.product_info_add_to_favourites {
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
.discription{
  // margin-top: 70px;
}
</style>
