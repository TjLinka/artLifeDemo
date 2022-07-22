<template>
  <div class="cart_item_wrapper" :data-id="id">
    <div class="cart_item">
      <div class="cart_item_img">
        <img src="../../assets/imgs/no-image.png" alt="" />
      </div>
      <div class="cart_item_articul">Артикул: <span>12345</span></div>
      <div class="cart_item_name">
        Lorem, ipsum dolor. <br />
        <span v-if="isComplect" class="show_complect" @click="isComplectOpen = !isComplectOpen">
          {{ isComplectOpen ? 'Свернуть' : 'Просмотреть' }}
        </span>
      </div>
      <div class="cart_item_price">
        4000 руб.
      </div>
      <div class="cart_item_points">
        15
      </div>
      <div class="cart_item_count">
        5
      </div>
      <div class="cart_item_total_prods_price">
        20000 руб.
      </div>
      <div class="cart_item_total_points">
        75
      </div>
      <div class="cart_item_add_to_favourites">
        <img
          :src="`../icons/favourites${inFavourite ? '' : '_no_added'}.svg`"
          alt=""
          @click="inFavourite = !inFavourite"
        />
      </div>
      <div class="cart_item_delete">
        <img src="../../assets/imgs/remove.png" alt="" @click="isDeleted = !isDeleted" />
      </div>
    </div>
    <div class="cart_item_complect">
      <div class="cart_item">
        <div class="cart_item_img">
          <img src="../../assets/imgs/no-image.png" alt="" />
        </div>
        <div class="cart_item_articul">Артикул: <span>12345</span></div>
        <div class="cart_item_name">
          Lorem, ipsum dolor.
        </div>
        <div class="cart_item_price">
          4000 руб.
        </div>
        <div class="cart_item_points">
          15
        </div>
        <div class="cart_item_count">
          5
        </div>
        <div class="cart_item_total_prods_price">
          20000 руб.
        </div>
        <div class="cart_item_total_points">
          75
        </div>
        <div class="cart_item_add_to_favourites">
          <img
            :src="`../icons/favourites${inFavourite ? '' : '_no_added'}.svg`"
            alt=""
            @click="inFavourite = !inFavourite"
          />
        </div>
        <div class="cart_item_delete">
          <img src="../../assets/imgs/remove.png" alt="" @click="isDeleted = !isDeleted" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'CartItem',
  props: ['id'],
  data() {
    return {
      isComplect: true,
      isComplectOpen: false,
      inFavourite: false,
      isDeleted: false,
    };
  },
  mounted() {
    $('div')
      .find(`[data-id='${this.id}']`)
      .find('.show_complect')
      .click(function () {
        console.log(
          $(this)
            .parent()
            .parent(),
        );
        $(this)
          .parent()
          .parent()
          .parent()
          .find('.cart_item_complect')
          .slideToggle();
      });
  },
};
</script>

<style lang="scss" scoped>
.cart_item {
  display: flex;
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
