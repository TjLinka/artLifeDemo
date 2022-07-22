<template>
  <div class="favourites_item_list shadow-sm" :data-id="id">
    <div class="favourites_item_discription">
      <div class="favourites_item_discription_title">
        <span>Lorem, ipsum dolor.</span>
      </div>
      <div class="favourites_item_discription_dte">
        <span>
          {{ new Date().toLocaleDateString() }}
        </span>
      </div>
      <div class="favourites_item_discription_add_to_cart">
        <g-button :primary="true">В корзину</g-button>
      </div>
      <div class="favourites_item_discription_delete">
        <img src="../../assets/imgs/remove.png" alt="" />
      </div>
    </div>
    <div class="body_wrapper">
      <div class="body">
        <favourites-item :id="1"/>
        <favourites-item :id="2"/>
        <favourites-item :id="3"/>
        <favourites-item :id="4"/>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import GButton from '../Forms/GButton.vue';
import FavouritesItem from './FavouritesItem.vue';

export default {
  components: {
    GButton,
    FavouritesItem,
  },
  props: ['id'],
  name: 'FavouritesItemsList',
  mounted() {
    $('div')
      .find(`[data-id='${this.id}']`).find('.favourites_item_discription')
      .click(function () {
        $(this)
          .next('.body_wrapper')
          .slideToggle();
      });
  },
};
</script>

<style lang="scss" scoped>
.favourites_item_list {
  // background: white;
  padding: 15px;
  margin-bottom: 30px;
  border-radius: 5px;
  & .body_wrapper {
    display: none;
  }
  & .body {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(145, 145, 145, 0.418);
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
  }
}
.favourites_item_discription {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: white;
  cursor: pointer;
  &_title {
    font-size: 20px;
    font-weight: 500;
  }
  &_delete {
    width: 25px;
    height: 25px;
    & img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
