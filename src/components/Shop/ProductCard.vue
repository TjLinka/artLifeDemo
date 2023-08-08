<template>
  <div class="product_card shadow-sm">
    <div class="product_card_img">
      <img
        src="../../assets/imgs/bud2.jpg"
        alt=""
        @click="$router.push(`/product/${prod.id}`)"
      />
    </div>
    <div class="product_card_name" @click="$router.push(`/product/${prod.id}`)">
      {{ prod.name }}
    </div>
    <div class="product_card_price">{{ prod.price }} руб.</div>
    <div class="product_card_points">Баллов: {{ prod.points }}</div>
    <div class="product_card_discription">
      {{ prod.short_desc }}
    </div>
    <div class="product_card_btns">
      <div class="product_card_add_to_favourites">
        <img
          :src="`../icons/favourites${prod.inFavor ? '' : '_no_added'}.svg`"
          alt=""
          @click="favorAction(prod.id)"
        />
      </div>
      <div>
        <g-button
          :primary="true"
          :right="true"
          :width="'30%'"
          @click="addToCart(prod)"
          v-if="!getProduct(prod.id)"
          >В коризну</g-button
        >
        <g-count v-if="getProduct(prod.id)" :count="getProduct(prod.id).count" :id="prod.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GApi from '../../assets/backApi';
import GButton from '../Forms/GButton.vue';
import GCount from '../Forms/GCount.vue';

export default {
  components: {
    GButton,
    GCount,
  },
  name: 'ProductCard',
  props: ['prod'],
  data() {
    return {};
  },
  methods: {
    randomImg() {
      return Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    },
    ...mapActions('cart', ['addToCart']),
    async favorAction(id) {
      if (this.prod.inFavor) {
        await GApi.delete(`/api/Favourites/delete/${Number(id)}`);
        this.$emit('favor', id);
        return;
      }
      await GApi.post('/api/Favourites/add', {
        item_id: id,
      });
      this.$emit('favor', id);
    },
  },
  computed: {
    ...mapGetters('cart', ['getProduct']),
  },
};
</script>

<style lang="scss" scoped>
.product_card {
  width: calc((100% - 36px) / 4);
  // border: 1px solid black;
  padding: 15px;
  background: white;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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
